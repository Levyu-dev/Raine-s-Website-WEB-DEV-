(() => {
    const sidebar = document.querySelector(".sidebar");
    const mobileToggle = document.querySelector(".mobile-menu-toggle");
    const collapseToggle = document.querySelector(".sidebar-collapse-toggle");
    const backdrop = document.querySelector(".sidebar-backdrop");

    if (!sidebar || !mobileToggle || !collapseToggle || !backdrop) {
        throw new Error("Shared navigation markup is incomplete.");
    }

    const mobileViewport = window.matchMedia("(max-width: 900px)");

    function setDrawerOpen(open, restoreFocus) {
        document.body.classList.toggle("sidebar-open", open);
        sidebar.inert = !open;
        sidebar.setAttribute("aria-hidden", String(!open));
        mobileToggle.setAttribute("aria-expanded", String(open));
        mobileToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
        backdrop.hidden = !open;

        if (open) {
            const firstLink = sidebar.querySelector(".sidebar-site-nav a");
            if (firstLink) {
                firstLink.focus();
            }
        } else if (restoreFocus) {
            mobileToggle.focus();
        }
    }

    function syncViewport() {
        if (mobileViewport.matches) {
            document.body.classList.remove("sidebar-collapsed");
            if (sidebar.contains(document.activeElement)) {
                mobileToggle.focus();
            }
            setDrawerOpen(false, false);
            sidebar.inert = true;
            sidebar.setAttribute("aria-hidden", "true");
            collapseToggle.setAttribute("aria-expanded", "true");
            collapseToggle.setAttribute("aria-label", "Collapse sidebar");
        } else {
            document.body.classList.remove("sidebar-open");
            backdrop.hidden = true;
            sidebar.inert = false;
            sidebar.setAttribute("aria-hidden", "false");
            mobileToggle.setAttribute("aria-expanded", "false");
            mobileToggle.setAttribute("aria-label", "Open menu");
        }
    }

    mobileToggle.addEventListener("click", () => {
        setDrawerOpen(!document.body.classList.contains("sidebar-open"), true);
    });

    backdrop.addEventListener("click", () => setDrawerOpen(false, true));

    sidebar.querySelector(".sidebar-site-nav").addEventListener("click", event => {
        if (event.target.closest("a")) {
            setDrawerOpen(false, true);
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && document.body.classList.contains("sidebar-open")) {
            setDrawerOpen(false, true);
        }
    });

    collapseToggle.addEventListener("click", () => {
        const collapsed = document.body.classList.toggle("sidebar-collapsed");
        collapseToggle.setAttribute("aria-expanded", String(!collapsed));
        collapseToggle.setAttribute("aria-label", collapsed ? "Expand sidebar" : "Collapse sidebar");
        collapseToggle.title = collapsed ? "Expand sidebar" : "Collapse sidebar";
    });

    syncViewport();
    mobileViewport.addEventListener("change", syncViewport);

    const categoryLinks = Array.from(document.querySelectorAll(".category-nav a"));
    if (categoryLinks.length > 0) {
        function setActiveCategory(activeId) {
            categoryLinks.forEach(link => {
                if (link.hash.slice(1) === activeId) {
                    link.setAttribute("aria-current", "location");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        }

        categoryLinks.forEach(link => {
            link.addEventListener("click", () => setActiveCategory(link.hash.slice(1)));
        });

        const initialCategory = categoryLinks.find(link => link.hash === window.location.hash);
        if (initialCategory) {
            setActiveCategory(initialCategory.hash.slice(1));
        }

        if ("IntersectionObserver" in window) {
            const categoryObserver = new IntersectionObserver(entries => {
                const visibleCategories = entries
                    .filter(entry => entry.isIntersecting)
                    .sort((first, second) => first.boundingClientRect.top - second.boundingClientRect.top);

                if (visibleCategories.length > 0) {
                    setActiveCategory(visibleCategories[0].target.id);
                }
            }, {
                rootMargin: "-132px 0px -60% 0px",
                threshold: 0
            });

            categoryLinks.forEach(link => {
                const category = document.getElementById(link.hash.slice(1));
                if (category) {
                    categoryObserver.observe(category);
                }
            });
        }
    }
})();

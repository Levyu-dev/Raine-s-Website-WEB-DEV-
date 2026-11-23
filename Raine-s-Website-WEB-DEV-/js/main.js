// ===== Shared helpers (every page script can use these) =====
function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch (error) {
    return fallback;
  }
}

function writeStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // storage blocked: the page still works, it just won't remember
  }
}

(function () {

  // ===== 1. Shared popup for sidebar info =====
  const infoDialog = document.createElement('dialog');
  infoDialog.className = 'info-dialog';
  infoDialog.innerHTML =
    '<button type="button" class="info-close" aria-label="Close">&times;</button>' +
    '<h2></h2><div class="info-body"></div>';
  document.body.appendChild(infoDialog);

  const infoTitle = infoDialog.querySelector('h2');
  const infoBody = infoDialog.querySelector('.info-body');

  function openInfo(title, lines, emptyText) {
    infoTitle.textContent = title;
    infoBody.innerHTML = '';
    if (lines.length === 0) {
      lines = [emptyText || 'Nothing to show yet.'];
    }
    lines.forEach(function (text) {
      const p = document.createElement('p');
      p.textContent = text;
      infoBody.appendChild(p);
    });
    infoDialog.showModal();
  }

  infoDialog.querySelector('.info-close').addEventListener('click', function () {
    infoDialog.close();
  });
  infoDialog.addEventListener('click', function (event) {
    if (event.target === infoDialog) {
      infoDialog.close();
    }
  });

  // ===== 2. Sidebar buttons: only keep the ones that really work =====
  const sidebarActions = {
    'Favorites': function () {
      openInfo('Your favorites', readStorage('raineFavorites', []),
        'No favorites yet. Tap a heart on the Products page.');
    },
    'My Orders': function () {
      const order = readStorage('raineLastOrder', null);
      if (!order) {
        openInfo('Last order summary', [], 'You have not placed a demo order yet.');
        return;
      }
      const lines = order.items.map(function (item) {
        return item.qty + ' x ' + item.name + ' - \u20B1' + (item.price * item.qty);
      });
      lines.push('Total: \u20B1' + order.total);
      lines.push('(Demo only: this order was not sent to the bakery.)');
      openInfo('Last order summary', lines);
    },
    'Our Branches': function () {
      openInfo('Our branches', [
        'Infante St., Molo, Iloilo City',
        'Gate 4 CPU Lopez Jaena St. Brgy. San Isidro, Jaro, Iloilo City'
      ]);
    },
    'Help & Support': function () {
      openInfo('Help & Support', [
        'Phone: +63 960 863 6821',
        'Facebook: Raine\'s Cakes and Pastries',
        'Or send us a message on the Contact Us page.'
      ]);
    }
  };

  document.querySelectorAll('.sidebar button').forEach(function (button) {
    const icon = button.querySelector('.sidebar-icon');
    const label = button.textContent.replace(icon ? icon.textContent : '', '').trim();
    const action = sidebarActions[label];

    if (action) {
      button.addEventListener('click', action);
    } else {
      button.remove(); // no real feature behind it, so remove it
    }
  });

  // remove sidebar sections that ended up empty
  document.querySelectorAll('.sidebar-section').forEach(function (section) {
    if (!section.querySelector('button')) {
      section.remove();
    }
  });

  // ===== 3. Collapsible sidebar =====
  const topBar = document.querySelector('.top-container');
  const sidebar = document.querySelector('.sidebar');

  if (topBar && sidebar) {
    const toggleBtn = document.createElement('button');
    toggleBtn.type = 'button';
    toggleBtn.className = 'sidebar-toggle';
    toggleBtn.textContent = '\u2630';
    toggleBtn.setAttribute('aria-label', 'Show or hide side menu');
    topBar.prepend(toggleBtn);

    function setCollapsed(collapsed) {
      document.body.classList.toggle('sidebar-collapsed', collapsed);
      toggleBtn.setAttribute('aria-expanded', String(!collapsed));
      writeStorage('sidebarCollapsed', collapsed);
    }

    // remember the last choice; on phones start hidden
    const saved = readStorage('sidebarCollapsed', null);
    setCollapsed(saved === null ? window.innerWidth <= 650 : saved);

    toggleBtn.addEventListener('click', function () {
      setCollapsed(!document.body.classList.contains('sidebar-collapsed'));
    });
  }

})();
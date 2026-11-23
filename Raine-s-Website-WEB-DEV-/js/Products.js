(function () {

  const PESO = '\u20B1';

  // ===== A. "view more / view less" =====
  document.querySelectorAll('.more-products').forEach(function (button) {
    button.addEventListener('click', function () {
      const category = button.closest('.product-category');
      const isOpen = category.classList.toggle('expanded');
      button.innerHTML = isOpen
        ? 'view less <span aria-hidden="true">&larr;</span>'
        : 'view more <span aria-hidden="true">&rarr;</span>';
    });
  });

  // ===== B. Sticky category navigation (built from the page) =====
  const menuContent = document.querySelector('.menu-content');
  const categories = document.querySelectorAll('.product-category');

  if (menuContent && categories.length > 0) {
    const categoryNav = document.createElement('nav');
    categoryNav.className = 'category-nav';
    categoryNav.setAttribute('aria-label', 'Product categories');

    categories.forEach(function (category) {
      const link = document.createElement('a');
      link.href = '#';
      link.textContent = category.querySelector('h3').textContent;
      link.addEventListener('click', function (event) {
        event.preventDefault();
        category.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      categoryNav.appendChild(link);
    });

    menuContent.prepend(categoryNav);
  }

  // ===== C. Shopping cart =====
  let cart = readStorage('raineCart', []);
  const orderBtn = document.querySelector('.order-now-cta');

  const cartDialog = document.createElement('dialog');
  cartDialog.className = 'cart-dialog';
  cartDialog.innerHTML =
    '<button type="button" class="cart-close" aria-label="Close cart">&times;</button>' +
    '<h2>Your order</h2>' +
    '<div class="cart-list"></div>' +
    '<p class="cart-total"></p>' +
    '<p class="cart-message" role="status"></p>' +
    '<div class="cart-actions">' +
    '<button type="button" class="cart-clear">Clear</button>' +
    '<button type="button" class="cart-checkout">Place order (demo)</button>' +
    '</div>';
  document.body.appendChild(cartDialog);

  const cartList = cartDialog.querySelector('.cart-list');
  const cartTotal = cartDialog.querySelector('.cart-total');
  const cartMessage = cartDialog.querySelector('.cart-message');

  function getTotal() {
    return cart.reduce(function (sum, item) {
      return sum + item.price * item.qty;
    }, 0);
  }

  function saveCart() {
    writeStorage('raineCart', cart);
  }

  function updateOrderButton() {
    if (!orderBtn) return;
    const count = cart.reduce(function (sum, item) { return sum + item.qty; }, 0);
    orderBtn.textContent = count > 0 ? 'order now! (' + count + ')' : 'order now!';
  }

  function changeQty(index, amount) {
    cart[index].qty += amount;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
    renderCart();
  }

  function makeRoundButton(text, label, onClick) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = text;
    btn.setAttribute('aria-label', label);
    btn.addEventListener('click', onClick);
    return btn;
  }

  function renderCart() {
    cartList.innerHTML = '';

    if (cart.length === 0) {
      const empty = document.createElement('p');
      empty.textContent = 'Your cart is empty. Tap "+ Add" on a product.';
      cartList.appendChild(empty);
    }

    cart.forEach(function (item, index) {
      const row = document.createElement('div');
      row.className = 'cart-row';

      const label = document.createElement('span');
      label.textContent = item.name + ' - ' + PESO + (item.price * item.qty);

      const qty = document.createElement('span');
      qty.textContent = item.qty;

      row.appendChild(label);
      row.appendChild(makeRoundButton('-', 'Remove one ' + item.name, function () { changeQty(index, -1); }));
      row.appendChild(qty);
      row.appendChild(makeRoundButton('+', 'Add one ' + item.name, function () { changeQty(index, 1); }));
      cartList.appendChild(row);
    });

    cartTotal.textContent = 'Total: ' + PESO + getTotal();
    updateOrderButton();
  }

  function addToCart(name, price) {
    const existing = cart.find(function (item) { return item.name === name; });
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name: name, price: price, qty: 1 });
    }
    saveCart();
    cartMessage.textContent = '';
    updateOrderButton();
  }

  if (orderBtn) {
    orderBtn.addEventListener('click', function () {
      renderCart();
      cartDialog.showModal();
    });
  }

  cartDialog.querySelector('.cart-close').addEventListener('click', function () {
    cartDialog.close();
  });
  cartDialog.addEventListener('click', function (event) {
    if (event.target === cartDialog) {
      cartDialog.close();
    }
  });

  cartDialog.querySelector('.cart-clear').addEventListener('click', function () {
    cart = [];
    saveCart();
    cartMessage.textContent = '';
    renderCart();
  });

  cartDialog.querySelector('.cart-checkout').addEventListener('click', function () {
    if (cart.length === 0) {
      cartMessage.textContent = 'Please add at least one item first.';
      return;
    }
    writeStorage('raineLastOrder', { items: cart, total: getTotal() });
    cart = [];
    saveCart();
    renderCart();
    cartMessage.textContent = 'Demo only: your order was NOT sent. To order, call +63 960 863 6821 or message us on Facebook.';
  });

  // ===== D. Heart + "+ Add" button on every product card =====
  const favorites = readStorage('raineFavorites', []);

  document.querySelectorAll('.product-card').forEach(function (card) {
    const name = card.querySelector('h4').textContent.trim();
    const priceEl = card.querySelector('p');
    const price = parseInt(priceEl.textContent.replace(/\D/g, ''), 10);

    // heart
    const likeBtn = document.createElement('button');
    likeBtn.className = 'like-btn';
    likeBtn.type = 'button';
    likeBtn.textContent = favorites.indexOf(name) !== -1 ? '\u2665' : '\u2661';
    likeBtn.setAttribute('aria-label', 'Favorite ' + name);

    likeBtn.addEventListener('click', function () {
      const index = favorites.indexOf(name);
      if (index === -1) {
        favorites.push(name);
        likeBtn.textContent = '\u2665';
      } else {
        favorites.splice(index, 1);
        likeBtn.textContent = '\u2661';
      }
      writeStorage('raineFavorites', favorites);
    });
    card.appendChild(likeBtn);

    // price + add button in one row
    if (!isNaN(price)) {
      const row = document.createElement('div');
      row.className = 'price-row';
      card.insertBefore(row, priceEl);
      row.appendChild(priceEl);

      const addBtn = document.createElement('button');
      addBtn.type = 'button';
      addBtn.className = 'add-btn';
      addBtn.textContent = '+ Add';
      addBtn.setAttribute('aria-label', 'Add ' + name + ' to order');
      addBtn.addEventListener('click', function () {
        addToCart(name, price);
      });
      row.appendChild(addBtn);
    }
  });

  // ===== E. Floating "order now" button =====
  const orderAnchor = document.querySelector('.order-now-anchor');
  if (orderAnchor && orderBtn && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (entries) {
      orderBtn.classList.toggle('is-floating', !entries[0].isIntersecting);
    }).observe(orderAnchor);
  }

  updateOrderButton();

})();
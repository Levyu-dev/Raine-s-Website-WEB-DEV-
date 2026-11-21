// ===== PART A: "view more" buttons =====
const moreButtons = document.querySelectorAll('.more-products');

moreButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    const category = button.closest('.product-category');
    const isOpen = category.classList.toggle('expanded');

    button.innerHTML = isOpen
      ? 'view less <span aria-hidden="true">←</span>'
      : 'view more <span aria-hidden="true">→</span>';
  });
});

// ===== PART B: heart buttons on every card =====
const cards = document.querySelectorAll('.product-card');

cards.forEach(function (card) {
  const name = card.querySelector('h4').textContent;

  const likeBtn = document.createElement('button');
  likeBtn.className = 'like-btn';
  likeBtn.type = 'button';
  likeBtn.textContent = '♡';
  likeBtn.setAttribute('aria-label', 'Like ' + name);

  likeBtn.addEventListener('click', function () {
    if (likeBtn.textContent === '♡') {
      likeBtn.textContent = '♥';
    } else {
      likeBtn.textContent = '♡';
    }
  });

  card.appendChild(likeBtn);
});
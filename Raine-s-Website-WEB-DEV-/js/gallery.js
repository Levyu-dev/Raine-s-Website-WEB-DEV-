// ===== Grab the popup (dialog) and the parts inside it =====
const modal = document.querySelector('.gallery-modal');
const modalImg = modal.querySelector('img');
const modalUser = document.getElementById('modal-username');
const modalLikes = modal.querySelector('.gallery-modal-likes');

// ===== Loop through each customer photo card =====
const customerCards = document.querySelectorAll('.customer-card');

customerCards.forEach(function (card) {
  const photo = card.querySelector('img');
  const infoTexts = card.querySelectorAll('.customer-card-info p');
  const usernameEl = infoTexts[0];
  const likesEl = infoTexts[1];
  const likeBtn = card.querySelector('.customer-card-info button');

  // --- Click photo: open the popup ---
  photo.addEventListener('click', function () {
    modalImg.src = photo.src;
    modalUser.textContent = usernameEl.textContent;
    modalLikes.textContent = likesEl.textContent;
    modal.showModal();
  });

  // --- Click heart: add or remove a like ---
  let likes = parseInt(likesEl.textContent);
  let liked = false;

  likeBtn.addEventListener('click', function () {
    liked = !liked;
    likes = liked ? likes + 1 : likes - 1;
    likesEl.textContent = likes + ' likes';
    likeBtn.textContent = liked ? '♥' : '♡';
  });
});

// ===== Close the popup =====
modal.querySelector('.gallery-modal-close').addEventListener('click', function () {
  modal.close();
});

// Clicking the dark area outside the popup also closes it
modal.addEventListener('click', function (event) {
  if (event.target === modal) {
    modal.close();
  }
});
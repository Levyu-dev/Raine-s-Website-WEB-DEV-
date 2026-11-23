(function () {

  const modal = document.querySelector('.gallery-modal');
  if (!modal) return;

  const modalImg = modal.querySelector('img');
  const modalUser = document.getElementById('modal-username');
  const modalLikes = modal.querySelector('.gallery-modal-likes');

  function likesText(n) {
    return n + (n === 1 ? ' like' : ' likes');
  }

  // ===== Make one customer card interactive (popup + like) =====
  function setupCard(card) {
    const photo = card.querySelector('img');
    const infoTexts = card.querySelectorAll('.customer-card-info p');
    const usernameEl = infoTexts[0];
    const likesEl = infoTexts[1];
    const likeBtn = card.querySelector('.customer-card-info button');

    let likes = parseInt(likesEl.textContent, 10) || 0;
    let liked = false;

    photo.addEventListener('click', function () {
      modalImg.src = photo.src;
      modalImg.alt = photo.alt;
      modalUser.textContent = usernameEl.textContent;
      modalLikes.textContent = likesEl.textContent;
      modal.showModal();
    });

    likeBtn.addEventListener('click', function () {
      liked = !liked;
      likes = liked ? likes + 1 : likes - 1;
      likesEl.textContent = likesText(likes);
      likeBtn.textContent = liked ? '\u2665' : '\u2661';
    });
  }

  document.querySelectorAll('.customer-card').forEach(setupCard);

  // ===== Close the popup =====
  modal.querySelector('.gallery-modal-close').addEventListener('click', function () {
    modal.close();
  });
  modal.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.close();
    }
  });

  // ===== Share your photo (local preview only) =====
  const shareBtn = document.querySelector('.share-moment button');
  const customerGrid = document.querySelector('.customer-gallery .gallery-grid');

  function createCard(src) {
    const card = document.createElement('article');
    card.className = 'customer-card';

    const img = document.createElement('img');
    img.src = src;
    img.alt = 'Photo you shared at Raine\'s';

    const info = document.createElement('div');
    info.className = 'customer-card-info';

    const user = document.createElement('p');
    user.textContent = '@you';
    const likes = document.createElement('p');
    likes.textContent = '0 likes';

    const heart = document.createElement('button');
    heart.type = 'button';
    heart.textContent = '\u2661';
    heart.setAttribute('aria-label', 'Like your photo');

    info.appendChild(user);
    info.appendChild(likes);
    info.appendChild(heart);
    card.appendChild(img);
    card.appendChild(info);
    return card;
  }

  if (shareBtn && customerGrid) {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.hidden = true;

    const status = document.createElement('p');
    status.className = 'share-status';
    status.setAttribute('role', 'status');

    shareBtn.after(fileInput, status);

    shareBtn.addEventListener('click', function () {
      fileInput.click();
    });

    fileInput.addEventListener('change', function () {
      const file = fileInput.files[0];
      if (!file) return;

      if (!file.type.startsWith('image/')) {
        status.textContent = 'Please choose an image file (JPG, PNG, etc.).';
        fileInput.value = '';
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        status.textContent = 'That photo is too large. Please choose one under 5 MB.';
        fileInput.value = '';
        return;
      }

      const card = createCard(URL.createObjectURL(file));
      customerGrid.prepend(card);
      setupCard(card);
      status.textContent = 'Preview only: your photo is shown on this page but not uploaded or saved, and it disappears when you refresh.';
      fileInput.value = '';
    });
  }

})();
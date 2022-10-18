function mediaFactory(data) {
  const {id, photographerId, title, image, video, likes, date, price} = data;

  // Return an array with all current photographer artwork
  function getUserArtworkDOM() {
    const card = document.createElement('figure');
    card.classList.add('card-artwork');

    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add('media-wrapper');

    let media = null;
    if (typeof image !== 'undefined') {
      media = document.createElement('img');
      media.src = `assets/images/${photographerId}/${image}`;
      media.alt = `Photographie "${title}"`;
      media.setAttribute('loading', 'lazy');
    } else if (typeof video !== 'undefined') {
      media = document.createElement('video');
      media.width = 350;
      media.height = 300;
      const mediaSource = document.createElement('source');
      // media.id = 'video-' + id;
      mediaSource.src = `assets/images/${photographerId}/${video}`;
      mediaSource.type = 'video/mp4';
      media.appendChild(mediaSource);
      media.innerHTML += 'Your browser does not support the video tag.';
    }
    media.setAttribute('aria-label', 'Cliquez sur cette image pour l\'agrandir');
    media.setAttribute('data-media-id', id);
    media.addEventListener('click', handleMediaClick);

    mediaWrapper.appendChild(media);

    const titleWrapper = document.createElement('figcaption');
    titleWrapper.classList.add('title-wrapper');
  
    const _title = document.createElement('p');
    _title.classList.add('title');
    _title.innerText = title;

    const likeCounterWrapper = document.createElement('div');
    likeCounterWrapper.classList.add('like-counter-wrapper');

    const counter = document.createElement('div');
    counter.classList.add('counter');
    counter.id = 'counter_' + id;
    counter.innerText = likes;

    const counterButton = document.createElement('button');
    counterButton.classList.add('like-button');
    counterButton.setAttribute('aria-label', 'likes');
    counterButton.setAttribute('aria-selected', 'false');
    counterButton.setAttribute('aria-controls', 'counter_' + id);
    counterButton.innerHTML = `<i class="fa-regular fa-heart"></i><i class="fa-solid fa-heart"></i>`;
    counterButton.addEventListener('click', handleLike);

    likeCounterWrapper.appendChild(counter);
    likeCounterWrapper.appendChild(counterButton);
    titleWrapper.appendChild(_title);
    titleWrapper.appendChild(likeCounterWrapper);

    card.appendChild(mediaWrapper);
    card.appendChild(titleWrapper);

    return card;
  }

  function handleLike(evt) {
    evt.preventDefault();
    const isSelected = evt.target.parentNode.getAttribute('aria-selected');
    if (typeof isSelected === 'undefined') {
      return;
    }
    updateMediaLike(isSelected === 'true', evt.target.parentNode)
  }

  /**
   * Update media like counter
   * 
   * @param {Boolean} isSelected 'Like' status before click
   * @param {Node} target The clicked button element
   */
  function updateMediaLike(isSelected, target) {
    const counterId = target.getAttribute('aria-controls');
    const counter = document.getElementById(counterId);
    let sum = parseInt(counter.innerText);

    if (!isSelected) {
      counter.innerText = sum + 1;
      target.setAttribute('aria-selected', 'true');
    } else {
      counter.innerText = sum - 1;
      target.setAttribute('aria-selected', 'false');
    }
    updateTotalLikes(isSelected);
  }

  /**
   * Update total likes counter
   * 
   * @param {Boolean} isSelected 'Like' status before click
   */
  function updateTotalLikes(isSelected) {
    const counter = document.querySelector('.photographer-infos .counter');
    let sum = parseInt(counter.innerText);
    if (!isSelected) {
      counter.innerText = sum + 1;
    } else {
      counter.innerText = sum - 1;
    }
  }

  return {
    getUserArtworkDOM
  }
}
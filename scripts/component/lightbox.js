const lightbox = document.querySelector('.lightbox');
let currentMediaId;

/**
 * Get media data by ID
 * 
 * @param {String} id Media ID
 * @returns {Object} Media object
 */
function getMedia(id) {
  return mediaList.filter(media => media.id === parseInt(id));
}

/**
 * Delete all given nodes from DOM
 * 
 * @param {Array} nodeArray Array of nodes
 */
function removeElement(nodeArray) {
  nodeArray.forEach(node => {
    node.parentNode.removeChild(node);
  });
}

function openLightbox() {
  document.body.setAttribute('aria-hidden', 'true');
  document.body.setAttribute('data-lightbox-open', 'true');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  document.body.setAttribute('aria-hidden', 'false');
  document.body.setAttribute('data-lightbox-open', 'false');
  lightbox.setAttribute('aria-hidden', 'true');
}

/**
 * Get index of current media in media list array
 * 
 * @returns {Number}
 */
function getCurrentMediaIndex() {
  const currentMediaIndex = currentUserMediaList.findIndex(media => {
    if (media.id === parseInt(currentMediaId)) {
      return true;
    }
  });
  return currentMediaIndex;
}

/**
 * Set next media as current media
 */
function setMediaNext() {
  const currentMediaIndex = getCurrentMediaIndex();
  let nextIndex = currentMediaIndex + 1;

  // Loop to first element if the current element is the last of the array.
  if (currentMediaIndex === currentUserMediaList.length - 1) {
    nextIndex = 0;
  }

  const newMediaData = currentUserMediaList.at(nextIndex);
  updateLightboxMedia(newMediaData.id);
}

/**
 * Set previous media as current media
 */
function setMediaPrev() {
  const currentMediaIndex = getCurrentMediaIndex();
  let nextIndex = currentMediaIndex - 1;

  // Loop to last element if the current element is the first of the array.
  if (currentMediaIndex === 0) {
    nextIndex = currentUserMediaList.length - 1;
  }

  const newMediaData = currentUserMediaList.at(nextIndex);
  updateLightboxMedia(newMediaData.id);
}

/**
 * Display given media in the lightbox modal
 * 
 * @param {String} id   Media ID
 */
function updateLightboxMedia(id) {
  const lightboxMedia = lightbox.querySelector('.media');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const currentMediaData = getMedia(id);
  let media;

  // Remove existing media in lightbox
  lightboxMedia.getElementsByTagName('img').length > 0 && removeElement(Array.from(lightboxMedia.getElementsByTagName('img')));
  lightboxMedia.getElementsByTagName('video').length > 0 && removeElement(Array.from(lightboxMedia.getElementsByTagName('video')));

  currentMediaId = currentMediaData[0].id;
  lightboxMedia.setAttribute('data-media-id', currentMediaId);

  if (typeof currentMediaData[0].image !== 'undefined') {
    media = `<img src="assets/images/${currentMediaData[0].photographerId}/${currentMediaData[0].image}" alt="${currentMediaData[0].title}" loading="lazy" />`;
  } else if (typeof currentMediaData[0].video !== 'undefined') {
    media = `
      <video width="800" height="600" controls>
        <source src="assets/images/${currentMediaData[0].photographerId}/${currentMediaData[0].video}" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    `;
  }

  lightboxTitle.innerText = currentMediaData[0].title;
  lightboxMedia.insertAdjacentHTML('afterbegin', media);
}

/**
 * Initialize lightbox modal and buttons action
 * 
 * @param {Event} evt   Media click event
 */
function handleMediaClick(evt) {
  const mediaId = evt.target.getAttribute('data-media-id');
  
  openLightbox();
  updateLightboxMedia(mediaId);
  lightbox.querySelector('.close-btn').addEventListener('click', closeLightbox);
  lightbox.querySelector('.lightbox-navigation.next').addEventListener('click', setMediaNext);
  lightbox.querySelector('.lightbox-navigation.prev').addEventListener('click', setMediaPrev);
}
let sortButton;
let sortDropDown;
let sortOptions;
let photographers;
let mediaList;
let currentUserId;
let currentUserData;
let currentUserMediaList;

async function setDataSource() {
  try {
    const data = await fetch('../../data/photographers.json')
      .then(response => response.json());

    photographers = data.photographers;
    mediaList = data.media;
  } catch(error) {
    console.error(error);
  }
}

/**
 * Get user data by ID
 * 
 * @param {Number} id  The user ID
 * @returns {Object} The user data object
 */
async function getUserById(id) {
  return photographers.filter(user => user.id === parseInt(id));
}

/**
 * Get user's media list.
 * 
 * @param {Number} id The user ID
 * @returns {Object} List of media
 */
function getUserMedia(id) {
  return mediaList.filter(media => media.photographerId === parseInt(id));
}

/**
 * Populate page with user's informations (banner and modal)
 */
async function displayUserData() {
  const headerData = document.querySelector('.photograph-header__data');
  const headerImage = document.querySelector('.photograph-header__image');
  const modalTitle = document.getElementById('modal-title');
  const photographerModel = photographerFactory(currentUserData[0]);

  headerData.appendChild(photographerModel.getBannerData());
  headerImage.appendChild(photographerModel.getUserImage());
  modalTitle.innerHTML += `<span>${photographerModel.name}</span>`;
}

/**
 * Display given media list
 * 
 * @param {Object} list Media list
 */
function displayArtwork(list) {
  const artworkSection = document.querySelector('.artworks');
  artworkSection.innerHTML = '';

  list.forEach((artwork) => {
    const mediaModel = mediaFactory(artwork);
    const userArtworkDOM = mediaModel.getUserArtworkDOM();
    artworkSection.appendChild(userArtworkDOM);
  });
}

// Update label of sorting button
function updateSortButtonLabel(activeOption) {
  sortButton.innerText = activeOption.innerText;
}

/**
 * Get active sorting option's name
 * 
 * @returns {String} Option ID
 */
function getActiveSortingOption() {
  for (let option of sortOptions) {
    if (option.getAttribute('aria-selected') === 'true') {
      return option;
    }
  }
}

/**
 * Populate aside elements
 */
async function displayAside() {
  const counter = document.querySelector('.photographer-infos .counter');
  const price = document.querySelector('.photographer-infos .price');
  const artworkList = getUserMedia(currentUserId);
  let sum = null;

  artworkList.forEach((media) => { sum += media.likes });

  counter.innerText = sum;
  price.innerText = currentUserData[0].price + '€ / jour';
}

function openSortingDropDown() {
  sortButton.setAttribute('aria-expanded', 'true');
}

function closeSortingDropDown() {
  sortButton.setAttribute('aria-expanded', 'false');
}

/**
 * Sort artwork list according to the selected sorting option.
 * Sort by popularity by default.
 * 
 * @param {String} option Sorting ID
 */
function sortArtwork(option) {
  const artworkList = getUserMedia(currentUserId);
  switch(option) {
    case 'listboxSort-1': // Popularity
    default:
      artworkList.sort((a, b) => b.likes - a.likes);
      break;
    case 'listboxSort-2': // Date
      artworkList.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateB - dateA;
      });
      break;
    case 'listboxSort-3': // Title
      artworkList.sort((a, b) => a.title.localeCompare(b.title));
      break;
  }
  currentUserMediaList = artworkList;
  displayArtwork(artworkList);
}

/**
 * Set active option's aria value + button label + dropdown "aria-activedescendant" attribute
 * 
 * @param {String} option 
 */
function setActiveOption(option) {
  updateSortButtonLabel(option);
  sortDropDown.setAttribute('aria-activedescendant', option.id);
  option.setAttribute('aria-selected', 'true');
  closeSortingDropDown();
}

/**
 * Set all sorting options to "false"
 */
function resetActiveOptions() {
  for (let option of sortOptions) {
    option.setAttribute('aria-selected', 'false');
  }
}

/**
 * Init sorting dropdown
 */
function sorting() {
  sortButton = document.getElementById('listboxSortButton');
  sortDropDown = document.getElementById('listboxSort');
  sortOptions = sortDropDown.children;
  const activeOption = getActiveSortingOption();

  // Set default label to the sorting button
  updateSortButtonLabel(activeOption);

  // Add a listener to the sorting button
  sortButton.addEventListener('click', openSortingDropDown);

  // Close dropdown when we click outside it
  window.addEventListener('click', closeSortingDropDown);

  // Do not close dropdown if we click inside it
  document.querySelector('.sorting-dropdown').addEventListener('click', function (oEvt){
    oEvt.stopPropagation();
  });

  // Add a listener to each option and change related values
  for (let option of sortOptions) {
    option.addEventListener('click', function(oEvt) {
      resetActiveOptions();
      setActiveOption(oEvt.target);
      sortArtwork(oEvt.target.id);
    });
  }
}

/**
 * Initialize modale
 */
function initModal() {
  const modalCta = document.querySelector('.contact_button');
  const closeModalCta = document.querySelector('.modal .close-btn');

  modalCta.addEventListener('click', displayModal);
  closeModalCta.addEventListener('click', closeModal);
}

function userNotFound() {
  const main = document.getElementById('main');

  main.innerHTML = `<div class="user-not-found">
    <h1 class="--color-primary style-h1">Utilisateur non trouvé</h1>
    <p>Désolé, l'utilisateur que vous cherchez n'a pas été trouvé. <br><a href="/" class="btn">Retour à l'accueil</a></p>
  </div>`
}

async function init() {
  const urlParams = (new URL(document.location)).searchParams;
  currentUserId = urlParams.get('id');

  if (typeof currentUserId === 'undefined') {
    return;
  }

  sorting();
  await setDataSource();
  currentUserData = await getUserById(currentUserId);

  if (!currentUserData.length) {
    userNotFound();
    return;
  }

  await displayUserData().then(initModal);
  await sortArtwork();
  await displayAside();
}

init();

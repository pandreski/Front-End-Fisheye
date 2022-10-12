let sortButton;
let sortDropDown;
let sortOptions;

async function getPhotographerById(id) {
  const data = await fetch('../../data/photographers.json')
    .then(response => response.json());

  return data.photographers.filter(elem => elem.id.toString() === id);
}

async function getMediaListById(id) {
  const data = await fetch('../../data/photographers.json')
    .then(response => response.json());

  return data.media.filter(elem => elem.photographerId.toString() === id);
}

async function displayHeader(data) {
  const headerData = document.querySelector('.photograph-header__data');
  const headerImage = document.querySelector('.photograph-header__image');
  const photographerModel = photographerFactory(data[0]);

  headerData.appendChild(photographerModel.getBannerData());
  headerImage.appendChild(photographerModel.getBannerImage());
}

async function displayArtwork(data, artworkList) {
  const artworkSection = document.querySelector('.artworks');

  artworkList.forEach((artwork) => {
    const photographerModel = photographerFactory(data);
    const userArtworkDOM = photographerModel.getUserArtworkDOM(artwork);
    console.log(userArtworkDOM);
    artworkSection.appendChild(userArtworkDOM);
  });
}

function updateSortButtonLabel(activeOption) {
  sortButton.innerText = activeOption.innerText;
}

// Get active sorting option element
function getActiveSortingOption() {
  for (let option of sortOptions) {
    if (option.getAttribute('aria-selected') === 'true') {
      return option;
    }
  }
}

function openSortingDropDown() {
  sortButton.setAttribute('aria-expanded', 'true');
}

function closeSortingDropDown() {
  sortButton.setAttribute('aria-expanded', 'false');
}

// Set active option's aria value + button label + dropdown "aria-activedescendant" attribute
function setActiveOption(option) {
  updateSortButtonLabel(option);
  sortDropDown.setAttribute('aria-activedescendant', option.id);
  option.setAttribute('aria-selected', 'true');
  closeSortingDropDown();
}

// Set all sorting options to "false"
function resetActiveOptions() {
  for (let option of sortOptions) {
    option.setAttribute('aria-selected', 'false');
  }
}

// Init sorting dropdown
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
    });
  }
}

async function init() {
  const urlParams = (new URL(document.location)).searchParams;
  const paramId = urlParams.get('id');

  if (typeof paramId === 'undefined') {
    return;
  }

  const photographerData = await getPhotographerById(paramId);
  const photographerArtwork = await getMediaListById(paramId);

  await displayHeader(photographerData);
  await displayArtwork(photographerData, photographerArtwork);
}

init();
sorting();

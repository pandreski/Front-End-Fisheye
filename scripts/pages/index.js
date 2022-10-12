// import UserCard from '../templates/UserCard'

async function getPhotographers() {
  const data = await fetch('../../data/photographers.json')
    .then(response => response.json());

  return {
    photographers: data.photographers
  }
}

async function displayData(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    console.log(photographerModel);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // get photographers data
  const {photographers} = await getPhotographers();
  await displayData(photographers);
}

init();
async function getPhotographers() {
  try {
    const data = await fetch('../../data/photographers.json')
      .then(response => response.json());

    return {
      photographers: data.photographers
    }
  } catch(error) {
    console.error(error);
  }
}

async function displayUsersList(photographers) {
  const photographersSection = document.querySelector(".photographer_section");

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  const {photographers} = await getPhotographers();
  await displayUsersList(photographers);
}

init();
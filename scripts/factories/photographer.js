function photographerFactory(data) {
  const {id, name, portrait, city, country, tagline, price} = data;
  const picture = `assets/photographers/${portrait}`;

  // Construct photographer's card with api data
  function getUserCardDOM() {
    const card = document.createElement('article');
    card.classList.add('card-photographer');
  
    const anchor = document.createElement('a');
    anchor.href = './photographer.html?id=' + id;
    anchor.setAttribute('aria-label', 'Voir les oeuvres de ' + name);
  
    const image = getUserImage();

    const title = document.createElement('h2');
    title.classList.add('style-h2', '--color-tertiary');
    title.innerText = name;
  
    const location = document.createElement('p');
    location.classList.add('location', '--color-primary');
    location.innerText = city + ', ' + country;

    const slogan = document.createElement('p');
    slogan.classList.add('legend');
    slogan.innerText = tagline;

    const rate = document.createElement('p');
    rate.classList.add('rate');
    rate.innerText = price + '€/jour';

    anchor.appendChild(image);
    anchor.appendChild(title);
    anchor.appendChild(location);
    anchor.appendChild(slogan);
    anchor.appendChild(rate);
    card.appendChild(anchor);
  
    return card;  
  }

  // Construct photographer's banner for detail page
  function getBannerData() {
    const wrapper = document.createElement('div');

    const title = document.createElement('h1');
    title.classList.add('style-h1', '--color-tertiary');
    title.textContent = name;

    const location = document.createElement('p');
    location.classList.add('location', '--color-primary', 'style-h3');
    location.textContent = city + ", " + country;

    const legend = document.createElement('p');
    legend.classList.add('legend');
    legend.textContent = tagline;

    wrapper.appendChild(title);
    wrapper.appendChild(location);
    wrapper.appendChild(legend);

    return wrapper;
  }

  // Construct photographer's profile image
  function getUserImage() {
    const img = document.createElement('img');
    img.classList.add('profile_picture');
    img.src = picture;
    img.alt = "Photo de profile de " + name;
    img.setAttribute("loading", "lazy");

    return img;
  }

  return {
    getUserCardDOM,
    getBannerData,
    getUserImage,
    name
  }
}
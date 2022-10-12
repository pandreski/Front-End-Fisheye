function photographerFactory(data) {
  const {id, name, portrait, city, country, tagline} = data;
  const picture = `assets/photographers/${portrait}`;

  // Construct photographer's card with api data
  function getUserCardDOM() {
    const card = document.createElement('article');
    card.classList.add('card-photographer');
  
    const anchor = document.createElement('a');
    anchor.href = './photographer.html?id=' + data.id;
    anchor.setAttribute('aria-label', 'Voir les oeuvres de ' + data.name);
  
    const image = document.createElement('img');
    image.src = data.picture;
    image.alt = 'Photo de profil de ' + data.name;
    image.classList.add('profile_picture');
    image.setAttribute('loading', 'lazy');
  
    const title = document.createElement('h2');
    title.classList.add('style-h2', '--color-tertiary');
    title.innerText = data.name;
  
    const location = document.createElement('p');
    location.classList.add('location', '--color-primary');
    location.innerText = data.city + ', ' + data.country;
  
    anchor.appendChild(image);
    anchor.appendChild(title);
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
  function getBannerImage() {
    const img = document.createElement('img');
    img.classList.add('profile_picture');
    img.src = picture;
    img.alt = "Photo de profile de " + name;
    img.setAttribute("loading", "lazy");

    return img;
  }

  // Return an array with all current photographer artwork
  function getUserArtworkDOM(artwork) {
    const card = document.createElement('div');
    card.classList.add('card-artwork');

    const mediaWrapper = document.createElement('div');
    mediaWrapper.classList.add('media-wrapper');

    let media = null;
    if (typeof artwork.image !== 'undefined') {
      media = document.createElement('img');
      media.src = `assets/images/${data[0].name}/${artwork.image}`;
      media.alt = artwork.title;
    } else if (typeof artwork.video !== 'undefined') {
      media = document.createElement('video');
      media.width = 350;
      media.height = 300;
      const mediaSource = document.createElement('source');
      media.id = 'video-' + artwork.id;
      mediaSource.src = `assets/images/${data[0].name}/${artwork.video}`;
      mediaSource.type = 'video/mp4';
      media.appendChild(mediaSource);
      media.innerHTML += 'Your browser does not support the video tag.';
    }

    mediaWrapper.appendChild(media);

    const titleWrapper = document.createElement('div');
    titleWrapper.classList.add('title-wrapper');
  
    const title = document.createElement('p');
    title.classList.add('title');
    title.innerText = artwork.title;

    const likeCounterWrapper = document.createElement('div');
    likeCounterWrapper.classList.add('like-counter-wrapper');

    const counter = document.createElement('div');
    counter.classList.add('counter');
    counter.innerText = artwork.likes;

    const counterButton = document.createElement('button');
    counterButton.classList.add('like-button');
    counterButton.setAttribute('aria-label', 'likes');
    counterButton.setAttribute('aria-selected', 'false');
    counterButton.innerHTML = `<i class="fa-solid fa-heart"></i>`;

    likeCounterWrapper.appendChild(counter);
    likeCounterWrapper.appendChild(counterButton);
    titleWrapper.appendChild(title);
    titleWrapper.appendChild(likeCounterWrapper);

    card.appendChild(mediaWrapper);
    card.appendChild(titleWrapper);

    return card;
  }

  return {
    getUserCardDOM,
    getBannerData,
    getBannerImage,
    getUserArtworkDOM
  }
}
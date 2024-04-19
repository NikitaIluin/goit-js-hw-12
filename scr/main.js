import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import axios from 'axios';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImages } from './js/pixabay-api.js';
import { createMarkup } from './js/render-functions.js';

import { perPage } from './js/pixabay-api.js';

let page;
let userSearch;
let totalPages;

const lightbox = new SimpleLightbox('.card a', {
  captionsData: 'alt',
});

const form = document.querySelector('.form');
const container = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

async function onFormSubmit(event) {
  event.preventDefault();
  page = 1;

  loadMoreBtn.style.display = 'none';
  container.innerHTML = '';
  loader.style.display = 'flex';
  
  userSearch = event.target.elements.input.value.trim();
  
  try {
    const response = await getImages(userSearch, page);

  if (userSearch.length === 0) {
       iziToast.show({
      message: 'Please, fill in the "Search" params',
      backgroundColor: '#ef4040',
      messageColor: '#fff',
      position: 'bottomCenter',
       });
      loader.style.display = 'none';
        return;
  }

    loader.style.display = 'none';

    if (response.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        backgroundColor: ' #ffa000',
        messageColor: '#fff',
        position: 'bottomCenter',
      });
      form.reset();
      return;
    }

    container.insertAdjacentHTML('beforeend', createMarkup(response.hits));
    loadMoreBtn.style.display = 'flex';

    const card = document.querySelector('.card');
    const cardHeight = card.getBoundingClientRect().height;

    lightbox.refresh();
  } catch (error) {
    iziToast.show({
      message: `${error}`,
      backgroundColor: ' #ffa000',
      messageColor: '#fff',
      position: 'bottomCenter',
    });
  }
  form.reset();
}

async function onLoadMoreBtnClick() {
  page += 1;
  loadMoreBtn.style.display = 'none';
  loader.style.display = 'flex';

  try {
    const moreImages = await getImages(userSearch, page);
    container.insertAdjacentHTML('beforeend', createMarkup(moreImages.hits));

    const card = document.querySelector('.card');
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy(0, cardHeight * 2);

    loader.style.display = 'none';
    loadMoreBtn.style.display = 'flex';
    lightbox.refresh();
    totalPages = Math.ceil(moreImages.totalHits / perPage);

    if (page >= totalPages) {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        backgroundColor: ' #ffa000',
        messageColor: '#fff',
        position: 'bottomCenter',
      });
    }
  } catch (error) {
    iziToast.show({
      message: `${error}`,
      backgroundColor: ' #ffa000',
      messageColor: '#fff',
      position: 'bottomCenter',
    });
  }
}
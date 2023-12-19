import { fetchSearch } from './pixabay-api';
const gallery = document.querySelector('.gallery');
const searchform = document.querySelector('.search-form');
const loadMoreBtn = document.querySelector('.load-more');
let page;
loadMoreBtn.style.display = 'none';

function createElementHtml(element) {
  return ` <div class="photo-card">
    <img src="${element.webformatURL}" alt="${element.tags}" loading="lazy" />
    <div class="info">
      <p class="info-item">
        <b>Likes ${element.likes}</b>
      </p>
      <p class="info-item">
        <b>Views ${element.views}</b>
      </p>
      <p class="info-item">
        <b>Comments ${element.comments}</b>
      </p>
      <p class="info-item">
        <b>Downloads ${element.downloads}</b>
      </p>
    </div>
  </div>
  `;
}

function onSubmit(event) {
  event.preventDefault();
  console.log(searchform.searchQuery.value);
  page = 1;
  fetchSearch(searchform.searchQuery.value, page++).then(data => {
    if (data.hits.length === 0) {
      gallery.innerHTML =
        '<p>Sorry, there are no images matching your search query. Please try again.</p>';
      return;
    }
    gallery.innerHTML = data.hits.map(createElementHtml).join('');
    loadMoreBtn.style.display = 'block';
  });
}

searchform.addEventListener('submit', onSubmit);
function loadMore() {
  loadMoreBtn.style.display = 'none';
  fetchSearch(searchform.searchQuery.value, page++).then(data => {
    if (data.hits.length === 0) {
      gallery.insertAdjacentHTML(
        'beforeend',
        "<p>We're sorry, but you've reached the end of search results.</p>"
      );
      return;
    }
    gallery.insertAdjacentHTML(
      'beforeend',
      data.hits.map(createElementHtml).join('')
    );

    loadMoreBtn.style.display = 'block';
  });
}
loadMoreBtn.addEventListener('click', loadMore);

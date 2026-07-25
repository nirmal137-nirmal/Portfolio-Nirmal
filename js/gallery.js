// Gallery filtering, modal popup, and previous/next navigation.

const galleryItems = document.querySelectorAll('.gallery-item');
const filterButtons = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('gallery-modal');
const modalImg = document.getElementById('modal-image');
const closeModal = document.getElementById('modal-close');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');

let currentImages = [];
let currentIndex = 0;

function setGalleryLayout(category) {
  galleryItems.forEach((item) => {
    const matches = category === 'all' || item.dataset.category === category;
    item.style.display = matches ? 'block' : 'none';
  });
}

function bindFilters() {
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((btn) => btn.classList.remove('active'));
      button.classList.add('active');
      setGalleryLayout(button.dataset.filter);
    });
  });
}

function openModal(index) {
  currentImages = Array.from(galleryItems).filter((item) => item.style.display !== 'none');
  if (!currentImages.length) return;

  currentIndex = index;
  const selected = currentImages[currentIndex];
  if (!selected) return;

  modalImg.src = selected.querySelector('img').src;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}

function closeGalleryModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

function bindGalleryClicks() {
  galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openModal(index));
  });

  closeModal.addEventListener('click', closeGalleryModal);
  prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    modalImg.src = currentImages[currentIndex].querySelector('img').src;
  });
  nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % currentImages.length;
    modalImg.src = currentImages[currentIndex].querySelector('img').src;
  });

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeGalleryModal();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  if (galleryItems.length) {
    bindFilters();
    bindGalleryClicks();
    setGalleryLayout('all');
  }
});

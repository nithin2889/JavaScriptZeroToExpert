'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeModalBtn = document.querySelector('.close-modal');
const showModalBtns = document.querySelectorAll('.show-modal');

const openModal = () => {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

showModalBtns.forEach(showModalBtn =>
  showModalBtn.addEventListener('click', () => openModal())
);

closeModalBtn.addEventListener('click', () => closeModal());
overlay.addEventListener('click', () => closeModal());

/**
 * Keyboard events are a global event and we listen to it on the whole document.
 * No matter where the event happens it is going to be listened.
 *
 * When we press any key on the keyboard an event is generated and JavaScript
 * will generate an object containing all the information about the event itself
 * which can be used in the event handler function.
 */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});

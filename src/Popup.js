export default class Popup {

  constructor(element) {
    this.element = element;
    const closeButton = this.element.querySelector('img');
    closeButton.addEventListener('click', () => {
      this.close();
    });
  }

    open = () => {
      this.element.classList.add('popup_is-opened');
    }
    close = () => {
      this.element.classList.remove('popup_is-opened');
    }
  }
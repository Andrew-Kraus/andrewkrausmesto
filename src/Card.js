export default class Card {

  constructor(name, link) {
    this.name = name;
    this.link = link;
  }

  create() {

    const card = document.createElement('div');
    card.classList.add('place-card');

    const cardImage = document.createElement('div');
    cardImage.classList.add('place-card__image');
    cardImage.style.backgroundImage = `url(${this.link})`;


    const cardDelete = document.createElement('button');
    cardDelete.classList.add('place-card__delete-icon');


    const cardDescription = document.createElement('div');
    cardDescription.classList.add('place-card__description');

    const cardName = document.createElement('h3');
    cardName.textContent = this.name;
    cardName.classList.add('place-card__name');

    const cardLike = document.createElement('button');
    cardLike.classList.add('place-card__like-icon');


    card.appendChild(cardImage);
    cardImage.appendChild(cardDelete);
    card.appendChild(cardDescription);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(cardLike);

    this.cardElement = card;
    this.placeCardLikeIcon = card.querySelector('.place-card__like-icon');
    this.placeCardDeleteIcon = card.querySelector('.place-card__delete-icon');
    this.setEventListeners();
    return card;
  } 

  like(event) {
    event.target.classList.toggle('place-card__like-icon_liked');
  }


  remove = () => {
    this.cardElement.remove();
    this.placeCardLikeIcon.removeEventListener('click', this.like);
    this.placeCardDeleteIcon.removeEventListener('click', this.remove);
  }

  setEventListeners() {
    this.placeCardLikeIcon.addEventListener('click', this.like);
    this.placeCardDeleteIcon.addEventListener('click', this.remove);
  }

}

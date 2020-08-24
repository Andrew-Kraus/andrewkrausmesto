export default class CardList {

  constructor(container, cards) {
    this.container = container;
    this.cards = cards;
  }


  addCard(cardElement) {
   this.container.appendChild(cardElement);
  }

  render() {
    this.cards.forEach(card=>this.addCard(card));
  }
}

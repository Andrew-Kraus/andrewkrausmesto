import Api from './Api.js';
import Card from './Card.js'
import CardList from './CardList.js'
import Popup from './Popup.js'
import FormValidator from './FormValidator.js'
import UserInfo from './UserInfo.js'
import './index.css' 
(function () {
  // Переменные //
  const myBtn = document.querySelector(".user-info__button");
  const mypopup = document.querySelector(".popup");
  const popupForm = document.querySelector(".popup__form");
  const form = document.forms.new;
  const formedit = document.forms.second;
  const popupEditForm = document.querySelector(".popup-edit");
  const editButton = document.querySelector(".user-info__profile-button");
  const popupEditButton = document.querySelector(".popup__edit-button");
  const popupImage = document.querySelector(".popup-image");
  const nameProfile = document.querySelector(".user-info__name");
  const aboutProfile = document.querySelector(".user-info__job");
  const profileNameEdit = formedit.elements.nameedit;
  const profileAboutEdit = formedit.elements.about;
  const placesList = document.querySelector(".places-list");
  const addCardPopup = new Popup(mypopup);
  const addProfilePopup = new Popup(popupEditForm);
  const addImgPopup = new Popup(popupImage);
  const profileEditFormValidator = new FormValidator(formedit);
  const addCardFormValidator = new FormValidator(form);
  const userInfo = new UserInfo(
    nameProfile,
    aboutProfile,
    profileNameEdit,
    profileAboutEdit
  );
  const api = new Api(
    "https://nomoreparties.co/cohort12",
    "22cbc1cb-f17c-465b-abdb-d51017f1e5cf"
  );

  const largeImage = document.querySelector(".large-image");

  placesList.addEventListener("click", function (event) {
    if (event.target.classList.contains("place-card__image")) {
      addImgPopup.open();
      largeImage.style.backgroundImage = event.target.style.backgroundImage;
    }
  });

  // Функции //


  api
    .getCards()
    .then((data) => {
      const cards = data.map((item) => {
        const card = new Card(item.name, item.link);
        return card.create();
      });
      const cardList = new CardList(placesList, cards);
      cardList.render();
    })
    .catch((err) => console.log(err));

  api
    .getUser()
    .then((res) => {
      userInfo.updateUserInfo(res.name, res.about);
    })
    .catch((err) => console.log(err));

  function addNewCard(event) {
    event.preventDefault();
    const form = event.target;
    const cardList = new CardList(placesList);
    cardList.addCard(
      new Card(form.elements.name.value, form.elements.link.value).create()
    );
    form.reset();
    addCardPopup.close();
  }

  function resetForm(someForm, classs) {
    const inputs = [...someForm.querySelectorAll("input")];
    inputs.forEach(function (input) {
      const error = input.nextElementSibling;
      input.setCustomValidity("");
      error.innerText = "";
    });
    classs.setSubmitButtonState(true);
  }

  // Слушатели //
  myBtn.addEventListener("click", function () {
    addCardPopup.open();
    resetForm(form, addCardFormValidator);
    addCardFormValidator.setEventListeners();
  });

  popupForm.addEventListener("submit", addNewCard);

  editButton.addEventListener("click", function () {
    userInfo.setUserInfo();
    addProfilePopup.open();
    resetForm(formedit, profileEditFormValidator);
    profileEditFormValidator.setEventListeners();
  });

  popupEditButton.addEventListener("click", function (event) {
    event.preventDefault();
    api.changeProfile(profileNameEdit, profileAboutEdit).then((data) => {
      userInfo.updateUserInfo(data.name, data.about);
      addProfilePopup.close();
    })
    .catch((err) => console.log(err));
  });
})();


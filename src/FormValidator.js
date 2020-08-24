export default class FormValidator {
    constructor(formV) {
      this.formV = formV;
      this.setEventListeners = this.setEventListeners.bind(this);
    }

    checkInputValidity(inputElement, errorMessageElement) {
      if (inputElement.value.length === 0) {
        errorMessageElement.textContent = 'Это обязательное поле';
        return false;
      } else if (inputElement.value.length < 2 || inputElement.value.length > 30) {
        errorMessageElement.textContent = 'Должно быть от 2 до 30 символов';
        return false;
      } else {
        errorMessageElement.textContent = '';
        return true;
      }
    }

    setSubmitButtonState(valid) {
      const button = this.formV.querySelector('button');
      if (!valid) {
        button.setAttribute('disabled', true);
        button.classList.add('popup__edit-button-disabled');
      }
      if (valid) {
        button.removeAttribute('disabled', true);
        button.classList.remove('popup__edit-button-disabled');
    }
  }

  

    setEventListeners() {
      const inputs = [...this.formV.querySelectorAll('input')];
      const button = this.formV.querySelector('button[type="submit"]');
      this.formV.addEventListener('input', (event)=>{
        const inputForValidation = event.target;
        const error = event.target.nextElementSibling;
        this.checkInputValidity(inputForValidation, error);
        if (inputs.every((input) => input.validity.valid)) {
          this.setSubmitButtonState(true);
        } else {
          this.setSubmitButtonState(false);
        }
    });
    }
  }
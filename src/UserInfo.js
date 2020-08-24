export default class UserInfo {
    constructor (elementName, elementAbout, elementNameEdit, elementAboutEdit) {
      this.elementName = elementName;
      this.elementAbout = elementAbout;
      this.elementNameEdit = elementNameEdit;
      this.elementAboutEdit = elementAboutEdit;
    }
  
    setUserInfo() {
      this.elementNameEdit.value = this.elementName.textContent;
      this.elementAboutEdit.value = this.elementAbout.textContent;
    }

    updateUserInfo(elementNameEdit, elementAboutEdit) {
      this.elementName.textContent = elementNameEdit;
      this.elementAbout.textContent = elementAboutEdit;
    }
  }


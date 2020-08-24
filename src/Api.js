export default class Api {
  constructor(baseUrl, key) {
    this.baseUrl = baseUrl;
    this.key = key;
  }

  getCards() {
    return (
      fetch(`${this.baseUrl}/cards`, {
        method: "GET",
        headers: {
          authorization: this.key,
        },
      })

        .then((res) => {
          if (!res.ok) {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
          return res.json();
        })
        
    );
  }

  getUser() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this.key,
      },
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        }
        return res.json();
      })

      .catch((err) => console.log(err));
  }

  changeProfile(elementNameEdit, elementAboutEdit) {
    event.preventDefault();
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: "22cbc1cb-f17c-465b-abdb-d51017f1e5cf",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: elementNameEdit.value,
        about: elementAboutEdit.value,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          return Promise.reject(`Ошибка: ${res.status}`);
        } else if (res.ok === true) {
          return res.json();
        }
      })
      .catch((err) => console.log(err));
  }
}


class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  returnResultStatus(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(
      `Что-то пошло не так: ${res.status} : ${res.statusText}`,
    );
  }

  getUserInfo() {
    return fetch(this._baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(this.returnResultStatus);
  }

  setUserInfo(data) {
    return fetch(this._baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this.returnResultStatus);
  }

  getInitialCards() {
    return fetch(this._baseUrl + '/cards', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(this.returnResultStatus);
  }

  addCard({ name, link }) {
    return fetch(this._baseUrl + '/cards', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then(this.returnResultStatus);
  }

  deleteCard(cardId) {
    console.log(cardId);
    return fetch(this._baseUrl + `/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(this.returnResultStatus);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    }).then(this.returnResultStatus);
  }

  setAvatar(data) {
    return fetch(this._baseUrl + '/users/me/avatar', {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this.returnResultStatus);
  }
}

const api = new Api({
  //baseUrl: "https://mesto.nomoreparties.co/v1/cohort-63",
  //baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.valeriia.nomoredomains.work'
});

export default api;
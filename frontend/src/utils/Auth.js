class Auth {
    constructor({baseAuthUrl, headers }) {
        this.baseAuthUrl = baseAuthUrl;
        this.headers = headers
    };

    register(registerData) {
        return fetch(`${this.baseAuthUrl}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(registerData),
            })

        .then(this._checkError);
    }

    authorize(data) {
        return fetch(`${this.baseAuthUrl}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify(data),
            })

        .then(this._checkError);
    }

    checkToken(token) {
        return fetch(`${this.baseAuthUrl}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
        .then(this._checkError);
    }

    _checkError(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
    }
}

const auth = new Auth({
    //baseAuthUrl: 'http://localhost:3000',
   baseAuthUrl : "https://api.valeriia.nomoredomains.work",
    headers: {'Content-Type': 'application/json'}
});

export default auth 

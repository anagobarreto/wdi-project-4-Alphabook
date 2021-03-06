class Auth {
  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  static getToken() {
    return localStorage.getItem('token');
  }

  static fetch(url, options) {
    return window.fetch(url, {
      ...options,
      body: options.body && JSON.stringify(options.body),
      headers: {
        Authorization: `bearer ${Auth.getToken()}`,
        'Content-Type': 'application/json',
      }
    }).then(res => res.json());
  }
}

export default Auth;

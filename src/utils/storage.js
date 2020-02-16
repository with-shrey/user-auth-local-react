const AUTH_USER_EMAIL = 'AUTH_USER_EMAIL';

const Storage = {
  saveJSON(key, json) {
    localStorage.setItem(key, JSON.stringify(json));
  },
  getStoredJSON(key) {
    return JSON.parse(localStorage.getItem(key))
  },

  addUser(user) {
    const isUserFound = !!localStorage.getItem(user.email);
    if (isUserFound) {
      return false;
    }
    this.saveJSON(user.email, user);
    return true;
  },
  getAuthUser() {
    const userEmail = localStorage.getItem(AUTH_USER_EMAIL);
    return this.getStoredJSON(userEmail);
  },
  loginUser(email, password) {
    const user = this.getStoredJSON(email);
    if (!user) {
      return false;
    }
    if (user.password !== password) {
      return false;
    }
    localStorage.setItem(AUTH_USER_EMAIL, email);
    return true;
  },
  clearAuthUser(history) {
    localStorage.removeItem(AUTH_USER_EMAIL);
    // eslint-disable-next-line no-restricted-globals
    // location.reload();
    history.push('/auth/login')
  },
  updateUser(updatedUser, history) {
    const userEmail = localStorage.getItem(AUTH_USER_EMAIL);
    if (!userEmail) {
      return false;
    }
    localStorage.setItem(AUTH_USER_EMAIL, updatedUser.email);
    localStorage.removeItem(userEmail);
    this.saveJSON(updatedUser.email, updatedUser);
    history.goBack();
    return true;
  }
};

export default Storage;


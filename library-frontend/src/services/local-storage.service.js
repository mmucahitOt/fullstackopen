const localStorageService = {
  getUser: () => {
    return localStorage.getItem("user");
  },
  setUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  removeUser: () => {
    localStorage.removeItem("user");
  },
  getToken: () => {
    const user = localStorageService.getUser();
    if (!user) {
      return null;
    } else {
      return JSON.parse(user).token;
    }
  },
};

export default localStorageService;

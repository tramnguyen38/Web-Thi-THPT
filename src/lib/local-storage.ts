export const authStorageConstants = {
  access_token: "access_token",
  refresh_token: "refresh_token",
};

const isBrowser = typeof window !== "undefined";

export const setLocalStorage = (name: string, value: any) => {
  if (isBrowser) {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

export const getLocalStorage = (name: string) => {
  if (isBrowser) {
    const item = localStorage.getItem(name);
    return item ? JSON.parse(item) : null;
  }
  return null;
};

export const removeLocalStorage = (name: string) => {
  if (isBrowser) {
    localStorage.removeItem(name);
  }
};

export const AuthStorage = {
  setAccessToken: (access_token: string) => {
    if (access_token && isBrowser) {
      localStorage.setItem(authStorageConstants.access_token, access_token);
    }
  },

  setRefreshToken: (refresh_token: string) => {
    if (refresh_token && isBrowser) {
      localStorage.setItem(authStorageConstants.refresh_token, refresh_token);
    }
  },

  getAccessToken: () => {
    if (isBrowser) {
      return localStorage.getItem(authStorageConstants.access_token);
    }
    return null;
  },

  getRefreshToken: () => {
    if (isBrowser) {
      return localStorage.getItem(authStorageConstants.refresh_token);
    }
    return null;
  },

  clearToken: () => {
    if (isBrowser) {
      localStorage.removeItem(authStorageConstants.access_token);
      localStorage.removeItem(authStorageConstants.refresh_token);
    }
  },
};

export const sortByRank = (items) => {
  return items.sort((a, b) => b.likes - a.likes);
};

export const parseStorageData = (key) => {
  const data = window.localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const persistData = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};

export const clearStorageData = (key) => {
  window.localStorage.removeItem(key);
};

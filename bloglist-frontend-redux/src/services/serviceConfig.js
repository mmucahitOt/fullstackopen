const BASE_URL = 'http://localhost:3001';

const generateURL = (api, path) => {
  if (!api) {
    return BASE_URL;
  }
  if (!path) {
    return BASE_URL + '/' + api;
  }
  if (api && path) {
    return BASE_URL + '/' + api + '/' + path;
  }

  return BASE_URL;
};

export default generateURL;

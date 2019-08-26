const url = "https://jsonplaceholder.typicode.com";

function _error(err, str) {
  if (!str) return alert(err);
  return alert(`${str}\n${err}`);
}

function _request(key) {
  return fetch(url + key)
    .then(response => response.json())
    .catch(err => _error(err, `Error in _requst(${key})`));
}

function loadContent() {
  let posts = [];
  let authors = [];
  let comments = [];

  return _request("/posts")
    .then(json => {
      posts = json;
      return _request("/users");
    })
    .then(json => {
      authors = json;
      return _request("/comments");
    })
    .then(json => {
      comments = json;
      return { authors, comments, posts };
    })
    .catch(err => _error(err, "Error in loadContent()"));
}

export { loadContent };

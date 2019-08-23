const url = "https://jsonplaceholder.typicode.com";

function _error(err, str) {
  if (!str) return alert(err);
  return alert(`${str}\n${err}`);
}

function _getPostsArr() {
  return fetch(url + "/posts")
    .then(response => response.json())
    .catch(err => _error(err, "Error in getPostsArr()"));
}

function _getAuthorsArr() {
  return fetch(url + "/users")
    .then(response => response.json())
    .catch(err => _error(err, "Error in getAuthorsArr()"));
}

function _getCommentsArr() {
  return fetch(url + "/comments")
    .then(response => response.json())
    .catch(err => _error(err, "Error in getCommentsArr()"));
}

function loadContent() {
  let posts = [];
  let authors = [];
  let comments = [];

  return _getPostsArr()
    .then(json => {
      posts = json;
      return _getAuthorsArr();
    })
    .then(json => {
      authors = json;
      return _getCommentsArr();
    })
    .then(json => {
      comments = json;
      return { authors, comments, posts };
    })
    .catch(err => _error(err, "Error in loadContent()"));
}

export { loadContent };

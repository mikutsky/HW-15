function _createPost(post, author = { username: "Incognito" }, comments = []) {
  const div_cardPost = document.createElement("div");
  div_cardPost.classList.add("card");
  div_cardPost.dataset.postId = post.id;

  const div_cardHead = document.createElement("div");
  div_cardHead.classList.add("card-header");
  div_cardHead.innerHTML = `Post by <a href="#">${author.username}</a>
    , left <a href="#">${comments.length}</a> comments`;

  const div_cardBody = document.createElement("div");
  div_cardBody.classList.add("card-body");
  div_cardBody.innerHTML = `<h4 class="card-title">${post.title}</h4>
    <p class="card-text">${post.body}</p>`;

  const btn_author = document.createElement("button");
  btn_author.type = "button";
  btn_author.classList.add("btn", "btn-primary", "btn-sm");
  btn_author.textContent = "Aboute the author";
  btn_author.addEventListener("click", el => {
    const commentsAuthor = el.target
      .closest("[data-post-id]")
      .querySelector(".about-author");
    if (commentsAuthor) commentsAuthor.remove();
    else _createAbout(author, el.target.closest("[data-post-id]"));
  });

  const btn_comments = document.createElement("button");
  btn_comments.type = "button";
  btn_comments.classList.add("btn", "btn-primary", "btn-sm");
  btn_comments.textContent = "Comments";
  btn_comments.addEventListener("click", el => {
    const commentsContainer = el.target
      .closest("[data-post-id]")
      .querySelector(".comments-container");
    if (commentsContainer) commentsContainer.remove();
    else _createComments(comments, el.target.closest("[data-post-id]"));
  });

  div_cardBody.appendChild(btn_author);
  div_cardBody.appendChild(btn_comments);
  div_cardPost.appendChild(div_cardHead);
  div_cardPost.appendChild(div_cardBody);

  return div_cardPost;
}

function _createAbout(author, parent) {
  const div_author = document.createElement("div");
  div_author.className = "about-author";

  div_author.innerHTML = `</br><p>
  <strong>name:</strong> ${author.name}</br>
  <strong>phone:</strong> ${author.phone}</br>
    <strong>web:</strong> ${author.website}</br>
  <strong>email:</strong> ${author.email}
  </p>`;

  parent.querySelector(".card-header").appendChild(div_author);
}

function _createComments(comments, parent) {
  const div_coments = document.createElement("div");
  div_coments.className = "comments-container";
  comments.forEach(comment => {
    const div_comm = document.createElement("div");
    div_comm.classList.add("card-footer");
    div_comm.innerHTML = `<h6>${comment.name}</h6>
      <p style="font-style: italic;">${comment.email}</p>
      <p>${comment.body}</p>`;
    div_coments.appendChild(div_comm);
  });
  parent.appendChild(div_coments);
}

function firstPosts(parent, content, postsCount = 10) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < postsCount; i++)
    fragment.appendChild(
      _createPost(
        content.posts[i],
        content.authors[content.posts[i].userId],
        content.comments.filter(
          comment => comment.postId === content.posts[i].id
        )
      )
    );

  const btn_Next = document.createElement("button");
  btn_Next.type = "button";
  btn_Next.classList.add("btn", "btn-outline-light", "btn-sm", "w-100");
  btn_Next.textContent = "Show more...";

  btn_Next.addEventListener("click", el => {
    const capdPostArr = document.querySelectorAll("[data-post-id]");
    const nextfragm = document.createDocumentFragment();
    const startIndex =
      content.posts.indexOf(
        content.posts.find(
          post =>
            String(post.id) ===
            capdPostArr[capdPostArr.length - 1].dataset.postId
        )
      ) + 1;

    for (
      let i = startIndex;
      i < postsCount + startIndex && i < content.posts.length;
      i++
    )
      nextfragm.appendChild(
        _createPost(
          content.posts[i],
          content.authors[content.posts[i].userId],
          content.comments.filter(
            comment => comment.postId === content.posts[i].id
          )
        )
      );
    parent.insertBefore(nextfragm, el.target);
    if (postsCount + startIndex >= content.posts.length) el.target.remove();
  });

  fragment.appendChild(btn_Next);
  return parent.appendChild(fragment);
}

export { firstPosts };

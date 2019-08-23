function _createPost(
  post,
  authorName = "incognito",
  comments = [],
  users = []
) {
  const div_cardPost = document.createElement("div");
  div_cardPost.classList.add("card");
  div_cardPost.dataset.postId = post.id;

  const div_cardHead = document.createElement("div");
  div_cardHead.classList.add("card-header");
  div_cardHead.innerHTML = `Post by <a href="#">${authorName}</a>
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
    _createComments(el.target.closest("[data-post-id]").dataset.postId);
  });

  const btn_comments = document.createElement("button");
  btn_comments.type = "button";
  btn_comments.classList.add("btn", "btn-primary", "btn-sm");
  btn_comments.textContent = "Comments";
  btn_comments.addEventListener("click", el => {
    _createComments(
      comments,
      el.target.closest("[data-post-id]"),
      el.target.closest("[data-post-id]").dataset.postId
    );
  });

  div_cardBody.appendChild(btn_author);
  div_cardBody.appendChild(btn_comments);
  div_cardPost.appendChild(div_cardHead);
  div_cardPost.appendChild(div_cardBody);

  return div_cardPost;
}

function _createAbout(id) {
  console.log(id);
}

function _createComments(comments, parent, id) {
  const div_coments = document.createElement("div");
  comments.forEach(comment => {
    if (comment.postId === id) {
      const div_comm = document.createElement("div");
      div_comm.classList.add("card-footer");
      div_comm.textContent = comment.body;
    }
  });
  parent.appendChild(div_coments);
  console.log(id);
}

function firstPosts(parent, content, postsCount = 10) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < postsCount; i++)
    fragment.appendChild(
      _createPost(
        content.posts[i],
        content.authors[content.posts[i].userId].username
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
          content.authors[content.posts[i].userId].username
        )
      );
    parent.insertBefore(nextfragm, el.target);
    if (postsCount + startIndex >= content.posts.length) el.target.remove();
  });

  fragment.appendChild(btn_Next);
  return parent.appendChild(fragment);
}

export { firstPosts };

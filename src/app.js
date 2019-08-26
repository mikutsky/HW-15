import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

import * as server from "./serverAPI";
import * as render from "./renderUI";

const mainConteiner = document.querySelector("#main-container");

server
  .loadContent()
  .then(content => render.firstPosts(mainConteiner, content, 3));

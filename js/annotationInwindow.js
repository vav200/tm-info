let outBox = document.querySelector(".section__box-annotation");
const linkBox = document.querySelector("#linkbox");
const firstArticle = new XMLHttpRequest();
const article = new XMLHttpRequest();
let mass = [1, 2, 3, 5];

let firstArticleLink = document
  .querySelector(".section__box-menu-link")
  .href.replace(".html", "_content.html");
firstArticle.open("GET", firstArticleLink);
firstArticle.send();
firstArticle.onload = function () {
  outBox.innerHTML = firstArticle.response;
  clearPage();
};

linkBox.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("section__box-menu-link")) {
    document
      .querySelector(".section__box-column-item")
      .classList.remove("section__box-column-item_active");
    document
      .querySelector(".section__box-menu-link")
      .classList.remove("section__box-menu-link_active");

    let adressArticles = e.target.href.replace(".html", "_content.html");
    article.open("GET", adressArticles);
    article.send();
    article.onload = function () {
      outBox.innerHTML = article.response;
      clearPage();
    };
  }
});

function clearPage() {
  document.querySelector(".section__box-annotation .nav-box").remove();
  document
    .querySelector(".section__box-annotation .section__title")
    .classList.replace("section__title", "section__title-stati");
  let textLinks = document.querySelectorAll(".section__content");
  textLinks.forEach((item) => (item.innerHTML = item.textContent));
  const location = document.location.href.split("/").slice(-3, -1).join("/");
  console.log(location);
  let img = document.querySelectorAll("img");
  img.forEach((item) => {
    let itemName = item.src.split("/").pop();
    item.src = adress + location + "/img/" + itemName;
    let imageWidth = parseInt(item.style.width) * 11 + "px";
    item.style.width = imageWidth;
  });
  document
    .querySelector(".section__box-annotation .wrapper")
    .classList.replace("wrapper", "section__box-annotation-wrapper");
  document
    .querySelector(".section__box-annotation .section")
    .classList.replace("pages", "pages-stati");
}

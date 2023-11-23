let stati = document.querySelector("#stati");
stati.addEventListener("click", function (e) {
  if (e.target.classList.contains("article__title")) {
    e.target.classList.toggle("article__title_active");
    e.target.parentElement.classList.toggle("article__box_active");
    e.target.nextElementSibling.classList.toggle("article__desc_active");
  }
});

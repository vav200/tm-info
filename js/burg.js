window.onload = function () {
  const clickBlock = document.querySelector(".header__menu");
  const burg = document.querySelector(".burg");
  const dropMenu = document.querySelector(".header__drop-menu");

  clickBlock.onclick = function () {
    burg.classList.toggle("burg_active");
    dropMenu.classList.toggle("header__drop-menu_active");
  };
};

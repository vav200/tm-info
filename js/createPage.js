const adress = "http://127.0.0.1:5503/Верстка/TMinfo/";

function getAdress() {
  const location = document.location.href.split("/");
  location.pop();
  const adr = location.join("/") + "/";
  return adr;
}
function getPageName() {
  const cont = "_content.";
  const location = document.location.href.split("/");
  let pageName = location.pop();
  if (!pageName) {
    pageName = "index.html";
  }
  let contentPage = pageName.replace(".", cont);
  return contentPage;
}

async function createPage() {
  let content = await getContent();
  let template = await getTemplate();
  let page = template.split('<main class="main">').join(`<main class="main">\r\n${content}`);
  document.body.innerHTML = page;
  burgAnimation();
  setLinks();
  setImg();
  searchName();
}

function burgAnimation() {
  let burg = document.createElement("script");
  burg.type = "text/javascript";
  burg.async = true;
  document.body.prepend(burg);
  burg.src = `${adress}js/burg.js`;
}

function getContent() {
  const link = getAdress() + getPageName();
  const xhr = new XMLHttpRequest();
  xhr.open("GET", link, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4 || xhr.status !== 200) return;
  };
  xhr.send();
  return xhr.response;
}

function getTemplate() {
  const link = `${adress}template.html`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", link, false);
  xhr.onreadystatechange = function () {
    if (xhr.readyState !== 4 || xhr.status !== 200) return;
  };
  xhr.send();
  return xhr.response;
}

function sendMessage() {
  const form = document.querySelector("form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    //const fieldsform = [].slice.call(form.elements, 0);
    let sendForm = new XMLHttpRequest();
    sendForm.open = (this.method, this.action, true);
    let dateForm = new FormData(this);
    for (var key of dateForm.keys()) {
      console.log(key, dateForm.get(key));
    }
    sendForm.send(dateForm);
    return false;
  });
}

function setLinks() {
  let logoLink = document.querySelector(".header__logo-link");
  logoLink.href = adress + "index.html";
  let dropmenuLink = document.querySelectorAll(".header__drop-link");
  dropmenuLink.forEach((item) => {
    item.href = adress + item.dataset.link;
  });
  let footerNav = document.querySelectorAll(".footer__nav-link");
  footerNav.forEach((item) => {
    item.href = adress + item.dataset.link;
  });
  let sendMessage = document.forms.feedback;
  sendMessage.action = adress + "php/send.php";
}

function setImg() {
  let img = document.querySelectorAll("img");
  const maxwidth = 80;
  img.forEach((item) => {
    if (document.documentElement.clientWidth < 1200 && document.documentElement.clientWidth > 959) {
      let imageWidth = parseInt(item.style.width) * 1.5 + "%";
      if (parseInt(imageWidth) > maxwidth) {
        imageWidth = "100%";
      }
      item.style.width = imageWidth;
    } else if (
      document.documentElement.clientWidth < 960 &&
      document.documentElement.clientWidth > 799
    ) {
      let imageWidth = parseInt(item.style.width) * 2 + "%";
      if (parseInt(imageWidth) > maxwidth) {
        imageWidth = "100%";
      }
      item.style.width = imageWidth;
    } else if (
      document.documentElement.clientWidth < 800 &&
      document.documentElement.clientWidth > 639
    ) {
      let imageWidth = parseInt(item.style.width) * 2.5 + "%";
      if (parseInt(imageWidth) > maxwidth) {
        imageWidth = "100%";
      }
      item.style.width = imageWidth;
    } else if (
      document.documentElement.clientWidth < 640 &&
      document.documentElement.clientWidth > 479
    ) {
      let imageWidth = parseInt(item.style.width) * 3 + "%";
      if (parseInt(imageWidth) > maxwidth) {
        imageWidth = "100%";
      }
      item.style.width = imageWidth;
    } else if (
      document.documentElement.clientWidth < 480 &&
      document.documentElement.clientWidth > 319
    ) {
      let imageWidth = parseInt(item.style.width) * 3.5 + "%";
      if (parseInt(imageWidth) > maxwidth) {
        imageWidth = "100%";
      }
      item.style.width = imageWidth;
    } else if (document.documentElement.clientWidth < 320) {
      let imageWidth = parseInt(item.style.width) * 4 + "%";
      if (parseInt(imageWidth) > maxwidth) {
        imageWidth = "100%";
      }
      item.style.width = imageWidth;
    }
  });
}

function getMap() {
  const link = `${adress}map.html`;
  let map = new XMLHttpRequest();
  map.open("get", link, false);
  map.onreadystatechange = function () {
    if (this.readyState !== 4 || this.status !== 200) return;
  };
  map.send();
  return map.response;
}

function searchName() {
  let data = document.createElement("div");
  data.innerHTML = getMap();
  let searchElem = data.querySelectorAll(".header__drop-search-elem");
  let dropList = document.querySelector(".header__drop-search-list");

  document.querySelector(".header__input").addEventListener("keyup", function () {
    let i = 0;
    let numberElements = 10;
    document.querySelector(".header__but").classList.replace("search", "close");
    let searchName = this.value.trim().toLowerCase();
    searchElem.forEach((item) => {
      if (searchName != "") {
        if (item.firstElementChild.textContent.toLowerCase().search(searchName) != -1 && i < 12) {
          item.firstElementChild.href = adress + item.firstElementChild.dataset.linkmap;
          dropList.append(item);
          i++;
        } else {
          item.remove();
        }
      } else {
        item.remove();
        document.querySelector(".header__but").classList.replace("close", "search");
      }
    });
  });
  document.querySelector(".header__but").addEventListener("click", function () {
    searchName = "";
    document.querySelector(".header__input").value = "";
    searchElem.forEach((item) => item.remove());
    document.querySelector(".header__but").classList.replace("close", "search");
  });
  document.addEventListener("click", function (e) {
    if (!e.target.classList.contains(".header__drop-search-link")) {
      searchName = "";
      document.querySelector(".header__input").value = "";
      searchElem.forEach((item) => item.remove());
      document.querySelector(".header__but").classList.replace("close", "search");
    }
  });
  document.querySelector(".header__input").addEventListener("focus", function () {
    document.querySelector(".header__drop-menu").classList.remove("header__drop-menu_active");
    document.querySelector(".burg").classList.remove("burg_active");
  });
}

createPage();

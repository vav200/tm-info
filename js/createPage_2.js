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
  const pageName = location.pop();
  let contentPage = pageName.replace(".", cont);
  return contentPage;
}

function createPage(content) {
  const link = `${adress}template.html`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", link, false);
  xhr.send();
  let page = xhr.response.split('<main class="main">').join(`<main class="main">\r\n${content}`);
  document.body.innerHTML = page;
}

function burgAnimation() {
  let burg = document.createElement("script");
  burg.type = "text/javascript";
  burg.async = true;
  document.body.append(burg);
  burg.src = `${adress}js/burg.js`;
}

function insertContent(atEnd) {
  const link = getAdress() + getPageName();
  const content = new XMLHttpRequest();
  content.open("GET", link, false);
  content.send();
  return content.response;
  atEnd();
}

createPage(insertContent(burgAnimation()));

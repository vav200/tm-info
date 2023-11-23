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

function template(atEnd) {
  const link = `${adress}template.html`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", link);
  xhr.onload = function () {
    document.body.innerHTML = xhr.response;
  };
  xhr.send();
  atEnd();
}

function burgAnimation(atEnd) {
  let burg = document.createElement("script");
  burg.type = "text/javascript";
  burg.async = true;
  document.body.append(burg);
  burg.src = `${adress}js/burg.js`;
  atEnd();
}

function insertContent() {
  const link = getAdress() + getPageName();
  const content = new XMLHttpRequest();
  content.open("GET", link);
  content.onload = function () {
    document.querySelector(".main").innerHTML = content.response;
  };
  content.send();
}

template(function () {
  burgAnimation(insertContent);
});

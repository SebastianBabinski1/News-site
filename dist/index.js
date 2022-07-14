/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('numberOfArticlesForm').addEventListener('submit', defineNumberOfFetchedArticles);
});

var defineNumberOfFetchedArticles = function defineNumberOfFetchedArticles(event) {
  event.preventDefault();
  var noa = document.getElementById('numberOfArticles').value;
  fetch("https://api.spaceflightnewsapi.net/v3/articles?_limit=".concat(noa)).then(function (res) {
    return res.json();
  }).then(function (completeData) {
    console.log(completeData);
    var data = completeData.map(function (item) {
      return "\n      <div class='article'>\n        <div class='article__content'>\n          <p>title: ".concat(item.title, "</p>\n          <p>newsSite: ").concat(item.newsSite, "</p>\n          <p>publishedAt: ").concat(item.publishedAt, "</p>\n          <p>summary: ").concat(item.summary, "</p>\n          <button>\n            <a href=").concat(item.url, " target=\"_blank\" rel=\"noopener noreferrer\"}>Read article</a>\n          </button>\n        </div >\n        <img class='article__image' src=").concat(item.imageUrl, " alt='image'>\n        </div>\n      ");
    });
    document.getElementById("content").innerHTML = data;
  })["catch"](function (error) {
    return console.log(error);
  });
};

fetch('https://api.spaceflightnewsapi.net/v3/articles/count').then(function (res) {
  return res.json();
}).then(function (count) {
  console.log(count);
})["catch"](function (error) {
  return console.log(error);
});
/******/ })()
;
//# sourceMappingURL=index.js.map
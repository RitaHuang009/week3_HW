"use strict";

var api_path = "ritahw09";
var token = "6Titl1D0DsfgLx5Sz5XQaU1VctA2";
"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var ele = document.querySelector('.recommendation-wall');
  ele.style.cursor = 'grab';
  var pos = {
    top: 0,
    left: 0,
    x: 0,
    y: 0
  };

  var mouseDownHandler = function mouseDownHandler(e) {
    ele.style.cursor = 'grabbing';
    ele.style.userSelect = 'none';
    pos = {
      left: ele.scrollLeft,
      top: ele.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY
    };
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  };

  var mouseMoveHandler = function mouseMoveHandler(e) {
    // How far the mouse has been moved
    var dx = e.clientX - pos.x;
    var dy = e.clientY - pos.y; // Scroll the element

    ele.scrollTop = pos.top - dy;
    ele.scrollLeft = pos.left - dx;
  };

  var mouseUpHandler = function mouseUpHandler() {
    ele.style.cursor = 'grab';
    ele.style.removeProperty('user-select');
    document.removeEventListener('mousemove', mouseMoveHandler);
    document.removeEventListener('mouseup', mouseUpHandler);
  }; // Attach the handler


  ele.addEventListener('mousedown', mouseDownHandler);
}); // menu 切換

var menuOpenBtn = document.querySelector('.menuToggle');
var linkBtn = document.querySelectorAll('.topBar-menu a');
var menu = document.querySelector('.topBar-menu');
menuOpenBtn.addEventListener('click', menuToggle);
linkBtn.forEach(function (item) {
  item.addEventListener('click', closeMenu);
});

function menuToggle() {
  if (menu.classList.contains('openMenu')) {
    menu.classList.remove('openMenu');
  } else {
    menu.classList.add('openMenu');
  }
}

function closeMenu() {
  menu.classList.remove('openMenu');
}
"use strict";

var productList = document.querySelector('.productWrap'),
    productSelect = document.querySelector('.productSelect');

function init() {
  getProductList();
}

init(); // 取得產品列表

function getProductList() {
  axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(api_path, "/products")).then(function (response) {
    productData = response.data.products;
    renderProductList();
  })["catch"](function (error) {
    console.log(error);
  });
}

function combineProductHTMLList(item) {
  return "<li class=\"productCard\">\n    <h4 class=\"productType\">\u65B0\u54C1</h4>\n    <img\n      src=\"".concat(item.images, "\"\n      alt=\"\">\n    <a href=\"#\" class=\"addCardBtn\" data-id=\"").concat(item.id, "\" data-class=\"js-addCart\">\u52A0\u5165\u8CFC\u7269\u8ECA</a>\n    <h3>").concat(item.title, "</h3>\n    <del class=\"originPrice\">NT$").concat(item.origin_price, "</del>\n    <p class=\"nowPrice\">NT$").concat(item.price, "</p>\n  </li>");
}

function renderProductList() {
  var str = "";
  productData.forEach(function (item) {
    str += combineProductHTMLList(item);
  });
  productList.innerHTML = str;
}

productSelect.addEventListener('change', function (e) {
  var category = e.target.value;

  if (category == "全部") {
    renderProductList();
    return;
  }

  var str = "";
  productData.forEach(function (item) {
    if (category == item.category) {
      str += combineProductHTMLList(item);
    }
  });
  productList.innerHTML = str;
});
productList.addEventListener('click', function (e) {
  e.preventDefault();
  var addCartClass = e.target.getAttribute('data-class');

  if (addCartClass != 'js-addCart') {
    return;
  }

  var productId = e.target.getAttribute('data-id');
  console.log(productId);
});
"use strict";

var productList = document.querySelector('.productWrap'),
    productSelect = document.querySelector('.productSelect');

function init() {
  getProductList();
}

init(); // 取得產品列表

function getProductList() {
  axios.get("https://livejs-api.hexschool.io/api/livejs/v1/customer/".concat(api_path, "/products")).then(function (response) {
    productData = response.data.products;
    renderProductList();
  })["catch"](function (error) {
    // handle error
    console.log(error);
  });
} // 將組產品列表的資料抽出來共用 [消除重複code]


function combineProductHTMLList(item) {
  return "<li class=\"productCard\">\n  <h4 class=\"productType\">\u65B0\u54C1</h4>\n  <img\n    src=\"".concat(item.images, "\"\n    alt=\"\">\n  <a href=\"#\" class=\"addCardBtn\" data-id=\"").concat(item.id, "\" data-class=\"js-addCart\" >\u52A0\u5165\u8CFC\u7269\u8ECA</a>\n  <h3>").concat(item.title, "</h3>\n  <del class=\"originPrice\">NT$").concat(item.origin_price, "0</del>\n  <p class=\"nowPrice\">NT$").concat(item.price, "</p>\n</li>");
}

function renderProductList() {
  var str = "";
  productData.forEach(function (item) {
    str += combineProductHTMLList(item);
  });
  productList.innerHTML = str;
} // 篩選顯示的資料


productSelect.addEventListener('change', function (e) {
  var category = e.target.value;

  if (category == "全部") {
    renderProductList();
    return;
  }

  var str = "";
  productData.forEach(function (item) {
    if (item.category == category) {
      str += combineProductHTMLList(item);
    }
  });
  productList.innerHTML = str;
});
productList.addEventListener('click', function (e) {
  e.preventDefault();
  var addCartClass = e.target.getAttribute('data-class');

  if (addCartClass !== "js-addCart") {
    return;
  }

  var productId = e.target.getAttribute('data-id');
  console.log(productId);
});
//# sourceMappingURL=all.js.map

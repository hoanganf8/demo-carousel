var carousel = document.querySelector(".carousel");

var carouselInner = carousel.querySelector(".carousel-inner");

var carouselNav = carousel.querySelector(".carousel-nav");

var carouselDots = carousel.querySelector(".carousel-dots");

var navNext = carouselNav.querySelector(".next");
var navPrev = carouselNav.querySelector(".prev");

//Tính toán số lượng ảnh

var carouselItems = carouselInner.querySelectorAll(".item");

if (carouselItems.length) {
  //Xử lý
  //Lấy chiều rộng của 1 item
  var itemWidth = carouselInner.clientWidth; //Trả về chiều cộng của element

  //Tính tổng chiều rộng các item
  var totalWidth = itemWidth * carouselItems.length;

  var dotHtml = "";
  carouselItems.forEach(function (item, index) {
    item.style.width = `${itemWidth}px`;
    dotHtml += `<span class="${
      index === 0 ? "active" : ""
    }" data-index="${index}"></span>`;
  });

  carouselDots.innerHTML = dotHtml;

  //Cập nhật CSS cho carousel-inner
  carouselInner.style.width = `${totalWidth}px`;

  var handleClickDot = function (_index) {
    index = _index;
    position = 0 - itemWidth * index;
    carouselInner.style.translate = `${position}px`;
    renderDots(index);
  };

  var renderDots = function (_index) {
    var dots = carouselDots.children;
    Array.from(dots).forEach(function (dot, index) {
      if (dot.classList.contains("active")) {
        dot.classList.remove("active");
      }
      if (_index === index) {
        dot.classList.add("active");
      }

      dot.addEventListener("click", function () {
        handleClickDot(index);
      });
    });
  };

  renderDots(0);

  //Xử lý chuyển slide khi click vào nút next
  var position = 0;
  var index = 0;
  navNext.addEventListener("click", function () {
    if (Math.abs(position) < totalWidth - itemWidth) {
      position -= itemWidth;
      carouselInner.style.translate = `${position}px`;
      index++;
      renderDots(index);
    }
  });

  navPrev.addEventListener("click", function () {
    if (position < 0) {
      position += itemWidth;
      carouselInner.style.translate = `${position}px`;
      index--;
      renderDots(index);
    }
  });

  //Xử lý vuốt carousel

  var handle = function () {
    console.log("kéo");
  };
  var isDrag = false;
  var x;
  var check = false;
  var rate = (10 * itemWidth) / 100;

  carouselInner.addEventListener("mousedown", function (e) {
    e.preventDefault();
    isDrag = true;
    x = e.clientX;
  });

  carouselInner.addEventListener("mouseup", function (e) {
    e.preventDefault();
    isDrag = false;
    carouselInner.style.translate = `${position}px`;
    carouselInner.style.transition = null;
    renderDots(index);
    check = false;
  });
  carouselInner.addEventListener("mousemove", function (e) {
    if (isDrag) {
      carouselInner.style.cursor = "move";
      var space = e.clientX - x;

      if (space < 0) {
        //Next Slide
        if (Math.abs(space) < rate) {
          carouselInner.style.translate = `${position + space}px`;
          carouselInner.style.transition = "none";
        } else if (!check && Math.abs(position) < totalWidth - itemWidth) {
          position = 0 - ++index * itemWidth;
          check = true;
          carouselInner.style.translate = `${position}px`;
          carouselInner.style.transition = null;
          renderDots(index);
        }
      } else {
        //Prev Slide
        if (Math.abs(space) < rate) {
          carouselInner.style.translate = `${position + space}px`;
          carouselInner.style.transition = "none";
        } else if (!check && position < 0) {
          position = 0 - --index * itemWidth;
          check = true;
          carouselInner.style.translate = `${position}px`;
          carouselInner.style.transition = null;
          renderDots(index);
        }
      }
    } else {
      carouselInner.style.cursor = "default";
    }
  });
}

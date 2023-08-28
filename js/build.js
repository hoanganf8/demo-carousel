var carousel = document.querySelector(".carousel"),
  carouselInner = carousel.querySelector(".carousel-inner"),
  carouselNav = carousel.querySelector(".carousel-nav"),
  carouselDots = carousel.querySelector(".carousel-dots"),
  navNext = carouselNav.querySelector(".next"),
  navPrev = carouselNav.querySelector(".prev"),
  carouselItems = carouselInner.querySelectorAll(".item");
if (carouselItems.length) {
  var e,
    n = carouselInner.clientWidth,
    r = n * carouselItems.length,
    s = "";
  carouselItems.forEach(function (e, r) {
    (e.style.width = `${n}px`),
      (s += `<span class="${
        0 === r ? "active" : ""
      }" data-index="${r}"></span>`);
  }),
    (carouselDots.innerHTML = s),
    (carouselInner.style.width = `${r}px`);
  var t = function (e) {
      (l = 0 - n * (o = e)), (carouselInner.style.translate = `${l}px`), a(o);
    },
    a = function (e) {
      Array.from(carouselDots.children).forEach(function (n, r) {
        n.classList.contains("active") && n.classList.remove("active"),
          e === r && n.classList.add("active"),
          n.addEventListener("click", function () {
            t(r);
          });
      });
    };
  a(0);
  var l = 0,
    o = 0;
  navNext.addEventListener("click", function () {
    Math.abs(l) < r - n &&
      ((l -= n), (carouselInner.style.translate = `${l}px`), a(++o));
  }),
    navPrev.addEventListener("click", function () {
      l < 0 && ((l += n), (carouselInner.style.translate = `${l}px`), a(--o));
    });
  var c = function () {
      console.log("k\xe9o");
    },
    u = !1,
    i = !1,
    v = (10 * n) / 100;
  carouselInner.addEventListener("mousedown", function (n) {
    n.preventDefault(), (u = !0), (e = n.clientX);
  }),
    carouselInner.addEventListener("mouseup", function (e) {
      e.preventDefault(),
        (u = !1),
        (carouselInner.style.translate = `${l}px`),
        (carouselInner.style.transition = null),
        a(o),
        (i = !1);
    }),
    carouselInner.addEventListener("mousemove", function (s) {
      if (u) {
        carouselInner.style.cursor = "move";
        var t = s.clientX - e;
        t < 0
          ? Math.abs(t) < v
            ? ((carouselInner.style.translate = `${l + t}px`),
              (carouselInner.style.transition = "none"))
            : !i &&
              Math.abs(l) < r - n &&
              ((l = 0 - ++o * n),
              (i = !0),
              (carouselInner.style.translate = `${l}px`),
              (carouselInner.style.transition = null),
              a(o))
          : Math.abs(t) < v
          ? ((carouselInner.style.translate = `${l + t}px`),
            (carouselInner.style.transition = "none"))
          : !i &&
            l < 0 &&
            ((l = 0 - --o * n),
            (i = !0),
            (carouselInner.style.translate = `${l}px`),
            (carouselInner.style.transition = null),
            a(o));
      } else carouselInner.style.cursor = "default";
    });
}

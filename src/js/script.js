// удаляем прелодер при загрузке страницы
const contentFadeInOnReady = () => {
  $(".preloader").fadeOut(150, () => {
    $(".preloader").remove();
  });
};

//навешиваем  обработчики открытия и закрытия на модалки
const bindModalListeners = (modalArr) => {
  modalArr.forEach((obj) => {
    let jQTrigger = $(obj.trigger);
    let jQModal = $(obj.modal);

    jQTrigger.on("click", function () {
      stopScroll("body");
      jQModal.addClass("active");
    });

    jQModal.on("click", function (e) {
      if ($(e.target).hasClass("modal")) {
        $(this).removeClass("active");
        freeScroll();
      }
    });

    jQModal.find(".modal__close").on("click", function () {
      jQModal.removeClass("active");
      freeScroll();
    });

    $(document).keydown((e) => {
      if (e.keyCode === 27) {
        $(".modal").removeClass("active");
        freeScroll();
        return false;
      }
    });
  });
};

// Запрещаем скролл для body
function stopScroll(item = "body") {
  let documentWidth = parseInt(document.documentElement.clientWidth),
    windowsWidth = parseInt(window.innerWidth),
    scrollbarWidth = windowsWidth - documentWidth;
  $(item).attr(
    "style",
    "overflow: hidden; padding-right: " + scrollbarWidth + "px"
  );
}

// возвращаем скролл для body
function freeScroll(item = "body") {
  $(item).attr("style", "");
}

const owlGallery = (selector, params) => {
  let arrowIcon = `<svg width="7" height="12" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M1.16693 12C0.868268 12 0.56961 11.8824 0.342116 11.6484C-0.114039 11.1791 -0.114039 10.4207 0.342116 9.95145L4.19785 5.98516L0.487945 2.03327C0.0411239 1.55564 0.0539569 0.795985 0.517111 0.336351C0.981432 -0.123282 1.71991 -0.110081 2.16673 0.365153L6.67228 5.1655C7.11444 5.63714 7.1086 6.38479 6.65828 6.84803L1.99174 11.6484C1.76424 11.8824 1.46559 12 1.16693 12Z" fill="white"/>
    </svg>
    `;

  if (params == undefined) params = "";
  const owl = $(selector);
  owl
    .each((i, el) => {
      $(el)
        .addClass("owl-carousel owl-theme")
        .owlCarousel(
          Object.assign(params, {
            lazyLoad: true,
            smartSpeed: 1000,
            navText: [arrowIcon, arrowIcon],
          })
        );
    })
    .trigger("refresh.owl.carousel");
};

let openMobileMenu = () => {
  let burger = $(".header__burger");
  let mobileMenu = $(".mobileMenu");
  let link = $(".mobileMenu__link");

  burger.on("click", () => {
    burger.toggleClass("active");
    mobileMenu.toggleClass("opened");

    if (burger.hasClass("active")) {
      stopScroll();
    } else {
      freeScroll();
    }
  });

  link.on("click", function () {
    mobileMenu.removeClass("opened");
    burger.removeClass("active");

    freeScroll();
  });
};

const wrap = document.querySelector(".services__cards");
const items = [...wrap.querySelectorAll(".services__card")];
const more = document.querySelector(".services__more");
let visible = items.length;

const showhide = (n) => {
  items.forEach((card, i) => {
    if (i < n) {
      if (!card.parentElement) wrap.appendChild(card);
    } else {
      if (card.parentElement) wrap.removeChild(card);
    }
  });
  return n;
};

visible = showhide(6);

more.addEventListener("click", () => {
  visible = showhide(Math.min(visible + 6, items.length));
  if (visible >= items.length) more.style = "display: none";
});

function activatePortfolioSlider() {
  let button = $(".portfolio__btn");
  let btnParent = ".portfolio__info";

  button.on("click", function () {
    let slider = $(this)
      .closest(btnParent)
      .siblings(".portfolio__miniCarousel");

    slider.toggleClass("visible");

    slider.fadeToggle(500);

    slider.hasClass("visible")
      ? $(this).text("Скрыть")
      : $(this).text("Подробнее");
  });
}

let toggleModal = () => {
  let closeBtn = $(".modal-picture__close");
  let photo = $(".portfolio__miniPhoto");
  let modalImg = $(".modal-picture__picture");
  let modal = $(".modal-picture");

  photo.on("click", function () {
    modal.addClass("active");
    let src = $(this).attr("src");
    modalImg.attr("src", `${src}`);
    stopScroll();
  });

  closeBtn.on("click", function () {
    modal.removeClass("active");
    modalImg.attr("src", "");
    freeScroll();
  });
};

const OutsideClick = (elem, activeClass = "active") => {
  $(document).on("mousedown", function (e) {
    if ($(elem).is(e.target) && $(elem).has(e.target).length === 0) {
      $(elem).removeClass(activeClass);
      freeScroll();
    }
  });
};

$().ready(() => {
  contentFadeInOnReady();
  bindModalListeners([]);
  openMobileMenu();
  activatePortfolioSlider();
  OutsideClick(".modal-picture");
  toggleModal();
  owlGallery(".portfolio__slider", {
    nav: true,
    navContainer: ".portfolio__controls",
    loop: true,
    dots: false,
    mouseDrag: false,
    touchDrag: false,
    // autoHeight: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
  owlGallery(".reviews__slider", {
    nav: true,
    navContainer: ".reviews__controls",
    loop: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      500: {
        items: 1,
      },
      1000: {
        items: 1,
      },
    },
  });
});

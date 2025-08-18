import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "../sass/style.scss";

try {
    new Swiper(".works__slider", {
        slidesPerView: 1,
        loop: true,
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next, .icon-right-open",
            prevEl: ".swiper-button-prev, .icon-left-open",
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 5,
            },
            1920: {
                spaceBetween: 35,
            },
        },
        modules: [Navigation, Pagination],
    });
} catch (e) {}

document.addEventListener("DOMContentLoaded", () => {
    const headerMenu = document.querySelector("#header-menu");
    const headerMenuClose = document.querySelector("#header-menu-close");
    const burger = document.querySelector("#burger");

    burger?.addEventListener("click", () => {
        headerMenu.classList.add("header__menu-active");
        document.body.classList.add("no-scroll");
    });

    headerMenuClose?.addEventListener("click", () => {
        headerMenu.classList.remove("header__menu-active");
        document.body.classList.remove("no-scroll");
    });

    try {
        const tabs = document.querySelectorAll(".catalog__tab");
        const contents = document.querySelectorAll(".catalog__panel");

        const hideAll = () =>
            contents.forEach((c) => (c.style.display = "none"));
        const showAll = () =>
            contents.forEach((c) => (c.style.display = "block"));

        // Инициализация: активируем «Все» и показываем все элементы
        tabs.forEach((t) => t.classList.remove("catalog__tab-active"));
        if (tabs[0]) tabs[0].classList.add("catalog__tab-active");
        showAll();

        tabs.forEach((tab, index) => {
            tab.addEventListener("click", () => {
                tabs.forEach((t) => t.classList.remove("catalog__tab-active"));
                tab.classList.add("catalog__tab-active");

                if (index === 0) {
                    // Таб «Все»
                    showAll();
                } else {
                    // Остальные табы: берём соответствующий контент с учётом смещения
                    hideAll();
                    const target = contents[index - 1];
                    if (target) {
                        target.style.display = "block";
                    } else {
                        console.warn(
                            `Нет соответствующего .catalog__content_item для таба #${index}`
                        );
                        // На крайний случай можно показать все:
                        // showAll();
                    }
                }
            });
        });
    } catch (e) {
        console.error(e);
    }

});

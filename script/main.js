document.addEventListener("DOMContentLoaded", () => {
  initBurgerMenu();
});

function initBurgerMenu() {
  const burger = document.querySelector(".header__burger");
  const menu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".overlay");
  const body = document.body;

  const animationDuration = 400;

  const openMenu = () => {
    const scrollY = window.scrollY;
    body.dataset.scrollY = scrollY;
    burger.classList.add("active");
    menu.classList.add("active");
    overlay.classList.add("active");

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";
    body.style.overflow = "hidden";
  };

  const closeMenu = (targetId = null) => {
    burger.classList.remove("active");
    menu.classList.remove("active");
    overlay.classList.remove("active");

    requestAnimationFrame(() => {
      body.style.position = "";
      body.style.top = "";
      body.style.width = "";
      body.style.overflow = "";
      window.scrollTo(0, parseInt(body.dataset.scrollY || "0"));

      if (targetId) {
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, animationDuration);
      }
    });
  };

  burger.addEventListener("click", () => {
    burger.classList.contains("active") ? closeMenu() : openMenu();
  });

  overlay.addEventListener("click", closeMenu);

  menu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      const targetId = event.target.getAttribute("href").slice(1);
      closeMenu(targetId);
    }
  });
}



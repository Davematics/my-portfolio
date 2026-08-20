const header = document.querySelector(".site-header");
const toggle = document.querySelector(".nav-toggle");
const mobilePanel = document.querySelector(".mobile-panel");
const progress = document.querySelector(".progress");
const year = document.querySelector("[data-year]");
const navLinks = document.querySelectorAll(".nav-list a, .mobile-panel a");
const sections = [...document.querySelectorAll("main section[id]")];

const setOpen = (open) => {
  toggle?.setAttribute("aria-expanded", String(open));
  toggle?.setAttribute("aria-label", open ? "Close menu" : "Menu");
  mobilePanel?.classList.toggle("is-open", open);
  document.body.classList.toggle("nav-open", open);
};

toggle?.addEventListener("click", () => {
  setOpen(toggle.getAttribute("aria-expanded") !== "true");
});

mobilePanel?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setOpen(false));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setOpen(false);
});

const onScroll = () => {
  const scrolled = window.scrollY > 12;
  header?.classList.toggle("is-scrolled", scrolled);

  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  if (progress) progress.style.transform = `scaleX(${ratio})`;

  const fromTop = window.scrollY + 96;
  let current = sections[0]?.id;

  for (const section of sections) {
    if (section.offsetTop <= fromTop) current = section.id;
  }

  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("is-active", active);
  });
};

window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

if (year) year.textContent = String(new Date().getFullYear());

const revealItems = document.querySelectorAll("[data-reveal]");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
  );

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

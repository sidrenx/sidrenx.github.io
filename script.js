// Keep footer copyright year up to date
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll reveal: elements stay visible by default if JS is disabled
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!reduceMotion && "IntersectionObserver" in window && revealItems.length) {
  // Show anything already in the viewport before hiding the rest
  revealItems.forEach((item) => {
    if (item.getBoundingClientRect().top < window.innerHeight * 0.95) {
      item.classList.add("is-visible");
    }
  });
  document.documentElement.classList.add("reveal-ready");

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => {
    if (!item.classList.contains("is-visible")) {
      revealObserver.observe(item);
    }
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Top reading progress bar
const progressBar = document.getElementById("reading-progress-bar");
let scrollTicking = false;

function updateReadingProgress() {
  if (!progressBar) return;
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
  progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  scrollTicking = false;
}

window.addEventListener("scroll", () => {
  if (!scrollTicking) {
    window.requestAnimationFrame(updateReadingProgress);
    scrollTicking = true;
  }
}, { passive: true });
window.addEventListener("resize", updateReadingProgress, { passive: true });
updateReadingProgress();

// Highlight active nav link based on current section
const navLinks = [...document.querySelectorAll(".nav a")];
const sections = [...document.querySelectorAll("main section[id]")];

function setActiveNav(id) {
  navLinks.forEach((link) => {
    const active = link.getAttribute("href") === `#${id}`;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  });
}

if ("IntersectionObserver" in window && sections.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) setActiveNav(entry.target.id);
    });
  }, { rootMargin: "-30% 0px -50% 0px" });

  sections.forEach((section) => sectionObserver.observe(section));

  // Ensure Contact highlights when scrolled all the way to the bottom
  window.addEventListener("scroll", () => {
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 24;
    if (atBottom) setActiveNav("contact");
  }, { passive: true });
}

// Custom cursor (mouse/trackpad only; disabled on touch and reduced-motion)
const customCursor = document.getElementById("custom-cursor");
const useCustomCursor = window.matchMedia(
  "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)"
).matches;

if (customCursor && useCustomCursor) {
  document.body.classList.add("has-custom-cursor");

  const resetCursor = () => customCursor.classList.remove("is-visible", "is-hovering");

  window.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse" && e.pointerType !== "pen") return;
    customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
    customCursor.classList.add("is-visible");
  }, { passive: true });

  document.addEventListener("pointerout", (e) => {
    if (!e.relatedTarget) resetCursor();
  });
  window.addEventListener("blur", resetCursor);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) resetCursor();
  });

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("pointerenter", () => customCursor.classList.add("is-hovering"));
    el.addEventListener("pointerleave", () => customCursor.classList.remove("is-hovering"));
  });
}

// Copy email button + toast notification (includes fallback for local file://)
const copyEmailBtn = document.querySelector("[data-copy-email]");
const siteToast = document.getElementById("site-toast");
let toastTimer;

function showToast(message) {
  if (!siteToast) return;
  siteToast.textContent = message;
  siteToast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => siteToast.classList.remove("is-visible"), 2200);
}

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(area);
  return ok;
}

if (copyEmailBtn) {
  copyEmailBtn.addEventListener("click", async () => {
    const email = copyEmailBtn.dataset.copyEmail;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else if (!fallbackCopy(email)) {
        throw new Error("Copy failed");
      }
      showToast("Email address copied.");
    } catch {
      showToast("Copy unavailable here — use the Email link instead.");
    }
  });
}

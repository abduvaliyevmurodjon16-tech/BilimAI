const toast = document.querySelector("#toast");
const sidebar = document.querySelector("#sidebar");
const menuToggle = document.querySelector("#menu-toggle");
const searchInput = document.querySelector("#search-input");
const emptySearch = document.querySelector("#empty-search");
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function updateDate() {
  const now = new Date();
  const weekdays = ["Yakshanba", "Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba"];
  const months = ["yanvar", "fevral", "mart", "aprel", "may", "iyun", "iyul", "avgust", "sentabr", "oktabr", "noyabr", "dekabr"];
  const formatted = `${weekdays[now.getDay()]}, ${now.getDate()}-${months[now.getMonth()]}`;
  const academicYearStart = now.getMonth() >= 8 ? now.getFullYear() : now.getFullYear() - 1;
  const academicMonth = now.getMonth() >= 8 ? now.getMonth() - 8 : now.getMonth() + 4;
  const quarter = academicMonth < 3 ? 1 : academicMonth < 6 ? 2 : academicMonth < 8 ? 3 : 4;

  document.querySelector("#today-date").textContent = formatted;
  document.querySelector("#schedule-date").textContent = formatted;
  document.querySelector("#school-year").textContent = `${academicYearStart}–${academicYearStart + 1} o‘quv yili`;
  document.querySelector("#school-term").textContent = `${quarter}-chorak`;
  document.querySelector("#copyright-year").textContent = String(now.getFullYear());
}

updateDate();

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".nav-link.is-active")?.classList.remove("is-active");
    link.classList.add("is-active");
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll("[data-scroll]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector(button.dataset.scroll).scrollIntoView({ behavior: "smooth" });
  });
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLocaleLowerCase("uz-UZ");
  const cards = [...document.querySelectorAll(".assignment-card")];
  let visibleCount = 0;

  cards.forEach((card) => {
    const matches = card.dataset.search.toLocaleLowerCase("uz-UZ").includes(query);
    card.hidden = !matches;
    if (matches) visibleCount += 1;
  });
  emptySearch.hidden = visibleCount > 0;
});

document.querySelectorAll(".complete-button").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".assignment-card");
    const subject = card.querySelector(".assignment-title-row strong").textContent;
    card.classList.add("assignment-done");
    card.querySelector(".due-tag").className = "due-tag due-done";
    card.querySelector(".due-tag").textContent = "Bajarildi";
    card.querySelector(".assignment-copy > p").style.textDecoration = "line-through";
    button.outerHTML = '<span class="done-check" aria-label="Bajarildi">✓</span>';
    showToast(`${subject} vazifasi bajarildi deb belgilandi.`);
  });
});

document.querySelector("#notification-button").addEventListener("click", () => {
  showToast("Hozircha yangi bildirishnomalar yo‘q.");
});

document.querySelector(".profile-button").addEventListener("click", () => {
  showToast("Profil sozlamalari tez orada qo‘shiladi.");
});

document.querySelector(".select-button").addEventListener("click", () => {
  showToast("Hozir 4-chorak natijalari ko‘rsatilmoqda.");
});

document.querySelectorAll(".more-button").forEach((button) => {
  button.addEventListener("click", () => showToast("Qo‘shimcha sozlamalar tez orada qo‘shiladi."));
});

document.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    searchInput.focus();
  }
  if (event.key === "Escape") {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

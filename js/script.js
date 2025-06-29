document.addEventListener('DOMContentLoaded', function () {

  // Дублирование слайдов
  const slidesContainer = document.querySelector(".slides");
  if (slidesContainer) {
    slidesContainer.innerHTML += slidesContainer.innerHTML;
  }

  // Автоматический год в футере
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

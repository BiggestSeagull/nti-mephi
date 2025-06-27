// КЛИКОВОЕ ОТКРЫТИЕ ТОЛЬКО ДЛЯ НУЖНЫХ МЕНЮ
document.addEventListener('DOMContentLoaded', function () {
  const allItems = document.querySelectorAll('#menu-komu > ul > li, #menu-vse-ostavnoe > ul > li');

  allItems.forEach(item => {
    const link = item.querySelector('a');
    const submenu = item.querySelector('ul');

    if (submenu && link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();

        const isVisible = submenu.style.display === 'flex';

        // Закрываем все открытые
        document.querySelectorAll('#menu-komu ul ul, #menu-vse-ostavnoe ul ul').forEach(ul => {
          ul.style.display = 'none';
        });

        // Открываем текущее
        submenu.style.display = isVisible ? 'none' : 'flex';
      });
    }
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', function (e) {
    const isClickInside = e.target.closest('#menu-komu, #menu-vse-ostavnoe');
    if (!isClickInside) {
      document.querySelectorAll('#menu-komu ul ul, #menu-vse-ostavnoe ul ul').forEach(ul => {
        ul.style.display = 'none';
      });
    }
  });

  // HOVER-НАВЕДЕНИЕ — отключаем для #menu-komu и #menu-vse-ostavnoe
  document.querySelectorAll('.nav-line li').forEach(function (item) {
    if (item.closest('#menu-komu') || item.closest('#menu-vse-ostavnoe')) return;

    item.addEventListener('mouseenter', function () {
      const submenu = this.querySelector('ul');
      if (submenu) {
        submenu.style.display = 'block';
        submenu.style.left = '0';
        submenu.style.right = 'auto';

        const rect = submenu.getBoundingClientRect();
        if (rect.right > window.innerWidth) {
          submenu.style.left = 'auto';
          submenu.style.right = '0';
        }
      }
    });

    item.addEventListener('mouseleave', function () {
      const submenu = this.querySelector('ul');
      if (submenu) {
        submenu.style.display = 'none';
      }
    });
  });

  // Дублирование слайдов
  const slidesContainer = document.querySelector(".slides");
  if (slidesContainer) {
    slidesContainer.innerHTML += slidesContainer.innerHTML;
  }

  // Выпадающее меню по кнопке
  const dropdownButton = document.getElementById('dropdownButton');
  const dropdownContent = document.getElementById('dropdownContent');
  let isDropdownOpen = false;

  dropdownButton?.addEventListener('click', function (e) {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;
    dropdownContent?.classList.toggle('active', isDropdownOpen);
  });

  document.addEventListener('click', function () {
    if (isDropdownOpen) {
      dropdownContent?.classList.remove('active');
      isDropdownOpen = false;
    }
  });

  dropdownContent?.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  // Автоматический год в футере
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

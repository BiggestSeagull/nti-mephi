document.addEventListener('DOMContentLoaded', function () {
    // Переключение между программами
    const programTabs = document.querySelectorAll('.views-row');
    const programContents = document.querySelectorAll('.programs');

    programTabs.forEach(tab => {
        tab.addEventListener('click', function () {
            programTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');

            programContents.forEach(content => content.classList.remove('active'));
            const programType = this.getAttribute('data-program');
            document.querySelector(`.programs-${programType}`).classList.add('active');
        });
    });

    // Навигация с плавной прокруткой
    const prevBtn = document.querySelector('.nav_item.previous');
    const nextBtn = document.querySelector('.nav_item.next');
    const rowsWrapper = document.querySelector('.rows-wrapper');
    const rows = document.querySelectorAll('.views-row');
    const container = document.querySelector('.view-content-wrapper');

    let currentIndex = 0;
    let visibleItems = 0;

    function calculateLayout() {
        const containerWidth = container.offsetWidth;
        let totalWidth = 0;
        visibleItems = 0;

        // Рассчитываем, сколько вкладок помещается в контейнер
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            const rowWidth = row.offsetWidth + 10; // Ширина вкладки + gap (10px)

            if (totalWidth + rowWidth <= containerWidth) {
                totalWidth += rowWidth;
                visibleItems++;
            } else {
                break;
            }
        }

        // Если все вкладки помещаются, скрываем стрелки
        if (rows.length <= visibleItems) {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        } else {
            prevBtn.style.display = 'block';
            nextBtn.style.display = 'block';
            updateNavigation();
        }
    }

    function updatePosition() {
        let newPosition = 0;
        let totalWidth = 0;

        // Рассчитываем позицию для текущего индекса
        for (let i = 0; i < currentIndex; i++) {
            if (i < rows.length) {
                totalWidth += rows[i].offsetWidth + 10;
            }
        }

        newPosition = -totalWidth;
        rowsWrapper.style.transform = `translateX(${newPosition}px)`;

        updateNavigation();
    }

    function updateNavigation() {
        // Обновляем состояние кнопок
        if (prevBtn) {
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';
        }

        if (nextBtn) {
            const isEndReached = currentIndex >= rows.length - visibleItems;
            nextBtn.style.opacity = isEndReached ? '0.5' : '1';
            nextBtn.style.pointerEvents = isEndReached ? 'none' : 'auto';
        }
    }

    // Инициализация
    calculateLayout();
    updatePosition();

    // Обработчики событий для кнопок
    if (prevBtn) {
        prevBtn.addEventListener('click', function () {
            if (currentIndex > 0) {
                currentIndex--;
                updatePosition();
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            if (currentIndex < rows.length - visibleItems) {
                currentIndex++;
                updatePosition();
            }
        });
    }

    // Обработчик изменения размера окна
    window.addEventListener('resize', function () {
        calculateLayout();
        // Корректируем currentIndex, если он выходит за пределы после изменения размера
        if (currentIndex > rows.length - visibleItems) {
            currentIndex = Math.max(0, rows.length - visibleItems);
        }
        updatePosition();
    });
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



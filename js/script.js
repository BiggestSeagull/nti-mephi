// Навигация
document.querySelectorAll('.nav-line li').forEach(function (item) {
    item.addEventListener('mouseenter', function () {
        const submenu = this.querySelector('ul');
        if (submenu) {
            submenu.style.display = 'block';

            // Сбрасываем стиль перед вычислениями
            submenu.style.left = '0';
            submenu.style.right = 'auto';

            // Получаем позицию и размеры подменю и родительского элемента
            const rect = submenu.getBoundingClientRect();

            // Проверяем, выходит ли подменю за правую границу
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
const slidesContainer = document.querySelector(".news-slides");
if (slidesContainer) {
    slidesContainer.innerHTML += slidesContainer.innerHTML;
}


// Полезные ссылки
const dropdownButton = document.getElementById('dropdownButton');
const dropdownContent = document.getElementById('dropdownContent');
let isDropdownOpen = false;
// Обработчик клика по кнопке
dropdownButton.addEventListener('click', function (e) {
    e.stopPropagation();
    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
        dropdownContent.classList.add('active');
    } else {
        dropdownContent.classList.remove('active');
    }
});
// Закрытие при клике вне меню
document.addEventListener('click', function () {
    if (isDropdownOpen) {
        dropdownContent.classList.remove('active');
        isDropdownOpen = false;
    }
});
// Предотвращаем закрытие при клике внутри меню
dropdownContent.addEventListener('click', function (e) {
    e.stopPropagation();
});


// Текущий год для футера
document.getElementById("year").textContent = new Date().getFullYear();
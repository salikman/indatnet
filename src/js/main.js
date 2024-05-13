/**
 * !(i)
 * Код попадает в итоговый файл, только когда вызвана функция, например FLSFunctions.spollers();
 * Или когда импортирован весь файл, например import "files/script.js";
 * Неиспользуемый код в итоговый файл не попадает.

 * Если мы хотим добавить модуль следует его раскомментировать
 */
// import { MousePRLX } from './libs/parallaxMouse'
// import AOS from 'aos'
import Swiper, { Navigation, Pagination } from 'swiper';

import { BaseHelpers } from './helpers/base-helpers';
import { PopupManager } from './modules/popup-manager';
import { BurgerMenu } from './modules/burger-menu';
import { Tabs } from './modules/tabs';
import { Accordion } from './modules/accordion';

BaseHelpers.checkWebpSupport();

BaseHelpers.calcScrollbarWidth();

BaseHelpers.addTouchClass();

BaseHelpers.addLoadedClass();

BaseHelpers.headerFixed();

/**
 * Открытие/закрытие модальных окон
 * Чтобы модальное окно открывалось и закрывалось
 * На окно повешай атрибут data-popup="<название окна>"
 * На кнопку, которая вызывает окно повешай атрибут data-type="<название окна>"

 * На обертку(.popup) окна добавь атрибут '[data-close-overlay]'
 * На кнопку для закрытия окна добавь класс '.button-close'
 * */
new PopupManager();

/**
 *  Модуль для работы с меню (Бургер)
 * */
new BurgerMenu().init();

/**
 *  Библиотека для анимаций
 *  документация: https://michalsnik.github.io/aos
 * */
AOS.init();

/**
 * Параллакс мышей
 * */
// new MousePRLX();

new Tabs('tabs-example', {
	onChange: (data) => {
		console.log(data);
	},
});

new Accordion('.accordion', {
	shouldOpenAll: false, // true
	defaultOpen: [], // [0,1]
	collapsedClass: 'open',
});

// document.addEventListener("DOMContentLoaded", function() {
// 	// Отримуємо всі посилання з класом 'header__menu'
// 	var links = document.querySelectorAll('.header__menu a');

// 	// Перебираємо кожне посилання
// 	links.forEach(function(link) {
// 			// Додаємо обробник подій 'click' для кожного посилання
// 			link.addEventListener('click', function(event) {
// 					// Забороняємо браузеру виконувати дійу за замовчуванням
// 					// event.preventDefault();
					
// 					// Видаляємо клас 'active' з усіх посилань
// 					links.forEach(function(item) {
// 							item.classList.remove('active');
// 					});
					
// 					// Додаємо клас 'active' до поточного посилання
// 					this.classList.add('active');
// 			});
// 	});
// });
document.addEventListener("DOMContentLoaded", function() {
	var links = document.querySelectorAll('.header__menu a');

	// Функція для визначення поточного якоря на основі положення на сторінці
	function getCurrentSection() {
			var scrollPosition = window.scrollY;
			var sections = document.querySelectorAll('section'); // Змініть цей селектор на відповідний вашим секціям
			var currentSection = '';

			sections.forEach(function(section) {
					var sectionTop = section.offsetTop;
					var sectionHeight = section.clientHeight;

					if (scrollPosition >= sectionTop - sectionHeight / 3) {
							currentSection = section.getAttribute('id');
					}
			});

			return currentSection;
	}

	// Функція для додавання класу active до відповідного посилання у меню
	function setActiveLink() {
			var currentSection = getCurrentSection();

			links.forEach(function(link) {
					var href = link.getAttribute('href').substring(1); // Відкидаємо символ # в href
					if (href === currentSection) {
							link.classList.add('active');
					} else {
							link.classList.remove('active');
					}
			});
	}

	// Додаємо обробник подій прокрутки сторінки
	window.addEventListener('scroll', setActiveLink);

	// Обробник події 'click' для посилань у меню
	links.forEach(function(link) {
			link.addEventListener('click', function(event) {
					// event.preventDefault();
					links.forEach(function(item) {
							item.classList.remove('active');
					});
					this.classList.add('active');
			});
	});

	// Встановлюємо початковий стан активного посилання
	setActiveLink();
});

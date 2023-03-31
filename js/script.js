"use strict";

window.addEventListener('DOMContentLoaded', () => {
	const form = document.querySelector('#form'),
		  taskInput = document.querySelector('.form__input'),
		  taskList = document.querySelector('.todo-list');

	let tasks = [];

	if (localStorage.getItem('tasks')) {
		tasks = JSON.parse(localStorage.getItem('tasks'));
		tasks.forEach(task => renderTask(task));
	}

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape') {
			taskInput.blur();
		}
	});

	checkEmptyList();

	form.addEventListener('submit', addTask);
	taskList.addEventListener('click', deleteTask);
	taskList.addEventListener('click', doneTask);

	function addTask(e) {
		e.preventDefault();

		const taskText = taskInput.value;

		// Описываем задачу в виде объекта
		const newTask = {
			id: Date.now(),
			text: taskText,
			done: false
		};

		// Добавляем задачу в массив с задачами
		tasks.push(newTask);

		saveToLocalStorage();

		renderTask(newTask);

		taskInput.value = '';
		taskInput.focus();

		checkEmptyList();
	}

	function deleteTask(e) {
		// Проверяем, если клик был НЕ по кнопке "удалить задачу"
		if (e.target.dataset.action !== 'delete') {
			return;
		}

		const parentNode = e.target.closest('li');

		// Определяем ID задачи
		 const id = parentNode.id;

		// Удаляем задачу через фильтрацию массива
		tasks = tasks.filter(task => task.id != id);

		saveToLocalStorage();

		// Удаляем задачу из разметки
		parentNode.remove();

		checkEmptyList();
	}

	function doneTask(e) {
		// Проверяем, что клик был НЕ по кнопке "задача выполнена"
		if (e.target.dataset.action !== 'done') {
			return;
		}

		const parentNode = e.target.closest('li'),
			  taskTitle = parentNode.querySelector('.todo-list__title'),
			  taskWrapper = parentNode.querySelector('.todo-list__wrapper');

		// Определяем ID задачи
		const id = parentNode.id;

		const task = tasks.find(task => task.id == id);
		task.done = !task.done;

		saveToLocalStorage();

		taskTitle.classList.toggle('todo-list__title-done');
		taskWrapper.classList.toggle('todo-list-done');
	}

	function checkEmptyList() {
		if (tasks.length === 0) {
			const emptyListHTML = `
				<li class="todo-list__empty">
					<img src="./image/no-resullt.svg" alt="Empty" width="48" class="todo-list__picture">
					<p class="todo-list__empty-text">There are currently no tasks</p>
				</li>
			`;

			taskList.insertAdjacentHTML('afterbegin', emptyListHTML);
		}

		if (tasks.length > 0) {
			const emptyListEl = document.querySelector('.todo-list__empty');
			emptyListEl ? emptyListEl.remove() : null;
		}
	}

	function saveToLocalStorage() {
		localStorage.setItem('tasks', JSON.stringify(tasks));
	}

	function renderTask(task) {
		// Формируем CSS класс
		const cssClassTitle = task.done ? 'todo-list__title todo-list__title-done' : 'todo-list__title',
		cssClassWrapper = task.done ? 'todo-list__wrapper todo-list-done' : 'todo-list__wrapper';

		// Формируем разметку для новой задачи
		const taskHTML = `
			<li id="${task.id}" class="todo-list__item">
				<div class="${cssClassWrapper}">
				<span class="${cssClassTitle}">${task.text}</span>
				<div class="todo-list__buttons">
					<button type="button" data-action="done" class="btn-action done-btn">
						<img src="./image/tick.svg" alt="Done" width="18" height="18">
					</button>
					<button type="button" data-action="delete" class="btn-action delete-btn">
						<img src="./image/cross.svg" alt="Done" width="18" height="18">
					</button>
				</div>
				</div>
			</li>
		`;

		taskList.insertAdjacentHTML('beforeend', taskHTML);
	}

	function SortArray(x, y){
		if (x.text < y.text) {return -1;}
		if (x.text > y.text) {return 1;}
		return 0;
	}
});
window.addEventListener('DOMContentLoaded', function() {
	const form = document.querySelector('#form'),
		  taskInput = document.querySelector('.form__input'),
		  tasksList = document.querySelector('.todo-list'),
		  emptyList = document.querySelector('.todo-list__empty');

	form.addEventListener('submit', addTask);
	tasksList.addEventListener('click', deleteTask);
	tasksList.addEventListener('click', doneTask);

	if (localStorage.getItem('tasksHTML')) {
		tasksList.innerHTML = localStorage.getItem('tasksHTML');
	}

	function addTask(e) {
		e.preventDefault();

		const taskText = taskInput.value;

		const taskHTML = `
						<li class="todo-list__item">
							<div class="todo-list__wrapper">
								<span class="todo-list__title">${taskText}</span>
								<div class="todo-list__buttons">
									<button type="button" data-action="done" class="btn-action">
										<img src="./image/tick.svg" alt="Done" width="18" height="18">
									</button>
									<button type="button" data-action="delete" class="btn-action">
										<img src="./image/cross.svg" alt="Done" width="18" height="18">
									</button>
								</div>
							</div>
						</li>`;

		tasksList.insertAdjacentHTML('beforeend', taskHTML);

		taskInput.value = '';
		taskInput.focus();

		if (tasksList.children.length > 1) {
			emptyList.classList.add('hide');
		}

		saveHTMLToLS();
	};

	function deleteTask(e) {
		if (e.target.dataset.action !== 'delete') {
			return;
		} 

		const parentNode = e.target.closest('li');
		parentNode.remove();
		if (tasksList.children.length === 1) {
			emptyList.classList.remove('hide');
		}

		saveHTMLToLS();
	};

	function doneTask(e) {
		if (e.target.dataset.action !== 'done') {
			return;
		}

		const parentNode = e.target.closest('li'),
			  taskTitle = parentNode.querySelector('.todo-list__title'),
			  taskWrapper = parentNode.querySelector('.todo-list__wrapper');

		taskWrapper.classList.toggle('todo-list-done');
		taskTitle.classList.toggle('todo-list__title-done');

		saveHTMLToLS();
	};

	function saveHTMLToLS () {
		localStorage.setItem('tasksHTML', tasksList.innerHTML);
	}
});




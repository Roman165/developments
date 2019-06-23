(function() {
	'use strict';

	var form      = document.getElementById('form'),
		newTodo   = document.getElementById('newTodo'),
		todosList = document.getElementById('todos'),
		doneList  = document.getElementById('completed'),
		addBtn    = document.getElementById('addTodo');

		loadExistTodos()

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		var text = newTodo.value;	


		createItem(todosList, prepareHtml(text));
		updateStorage();

		
		addBtn.setAttribute('disabled', true);
		form.reset();

	})

	newTodo.addEventListener('input', (e) => {
		if (newTodo.value.length > 3) {
			addBtn.removeAttribute('disabled');
		} else {
			addBtn.setAttribute('disabled', true);
		}
	})

	function prepareHtml(text) {
		return `
			<label><input type="checkbox"> ${text}</label>
			<br>
			<button class="btn btn-warning editBtn">Edit</button>
			<button class="btn btn-danger deleteBtn">Delete</button>
			<button class="btn btn-success saveBtn" hidden>Save</button>
			<button class="btn btn-dark cancelBtn" hidden>Cancel</button>`;
	}

	function loadExistTodos() {
		var tasks = getStorage();
		tasks.forEach(function(task) {

		createItem(todosList, prepareHtml(task));

		})
	}

	function createItem(list, text) {
		var newItem = document.createElement('li');
			newItem.innerHTML = text;
			newItem.classList.add('list-group-item');

		list.append(newItem);

		let deleteBtn = newItem.querySelector('.deleteBtn');
		if (deleteBtn) {
			deleteBtn.addEventListener('click', () => {
		   		deleteItem(newItem);
			});
		}

		let editBtn = newItem.querySelector('.editBtn');
		if (editBtn) {
			editBtn.addEventListener('click', () => {
		   		editItem(newItem);
			});
		}

		let cancelBtn = newItem.querySelector('.cancelBtn');
		if (cancelBtn) {
			cancelBtn.addEventListener('click', () => {
		   		cancelItem(newItem);
			});
		}

		let saveBtn = newItem.querySelector('.saveBtn');
		if (saveBtn) {
			saveBtn.addEventListener('click', () => {
		   		saveItem(newItem);
			});
		}

		// let checkbox = newItem.querySelector('input[type="checkbox"]');
		// if (checkbox) {
		// 	checkbox.addEventListener('change', () => {
		// 	  	moveItem(newItem);
		// 	});
		// }
		addEvent(newItem, 'input[type="checkbox"]', 'change', moveItem)
	}

		function addEvent(parent, selector, event, callback) {
			let el = parent.querySelector(selector);
		if (el) {
			el.addEventListener(event, () => {
			  	callback(parent);
			});
		}
		}

	function deleteItem(item) {
		item.remove();
		updateStorage();

	}

	function moveItem(item) {
		var text = item.querySelector('label').innerText,
			btn  = item.querySelector('.deleteBtn').outerHTML;

		createItem(doneList, text + ' ' + btn);
		deleteItem(item);
	}

	function editItem(item) {
		var label = item.querySelector('label'),
			text  = label.innerText,
			input = document.createElement('input');

		input.type = 'text';
		input.classList.add('form-control');
		input.value = text;

		item.insertBefore(input, label);

		label.hidden = true;
		item.querySelector('.editBtn').hidden = true;
		item.querySelector('.deleteBtn').hidden = true;
		
		item.querySelector('.saveBtn').hidden = false;
		item.querySelector('.cancelBtn').hidden = false;
		

	}

	function cancelItem(item) {
		item.querySelector('label').hidden = false;
		item.querySelector('.editBtn').hidden = false;
		item.querySelector('.deleteBtn').hidden = false;
		
		deleteItem(item.querySelector('input[type="text"]'));
		item.querySelector('.saveBtn').hidden = true;
		item.querySelector('.cancelBtn').hidden = true;
	}

	function saveItem(item) {
		var label = item.querySelector('label'),
			input = item.querySelector('input[type="text"]'),
			text  = input.value;

		text = `<input type="checkbox">  ${text}`;

		label.innerHTML = text;

		cancelItem(item);
		updateStorage();
		addEvent(item, 'input[type="checkbox"]', 'change', moveItem);
	}
	function updateStorage(){

	var labels = document.getElementsByTagName('label'),
		texts = [];
		
		for (var i = 0; i < labels.length; i++) {
			texts.push(labels[i].innerText.trim());
		}
		texts = texts.join('%');
			localStorage.setItem('todos', texts);
	// labels && labels.forEach(function(label) {});

	}

	function getStorage(){
		var texts = localStorage.getItem('todos');
		return texts ? texts.split('%'):[];
			// console.log(texts);
	}


	function deleteStorage(){}
})();
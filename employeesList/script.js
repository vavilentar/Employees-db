const empAddBtn = document.querySelector('.emp-add-btn');
const empTable = document.querySelector('.employees-table');
const deleteBtn = document.querySelector('.deleteBtn');
const loadBtn = document.querySelector('.load-items');

let counter = 1;

loadUsersFromStorage();

// loadBtn.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	const inputIdLoad = document.querySelector('.load-item-input');
// 	loadUsers(inputIdLoad.value);
// });

loadBtn.addEventListener('click', (e) => {
	e.preventDefault();
	loadUsersFromStorage();
});


deleteBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const inputId = document.querySelector('.inputDelete');
	if (inputId.value != '') {
		deleteTR(inputId.value);
		inputId.value = '';
		inputId.style.backgroundColor = 'white';
	} else {
		alert('Введите ID записи');
		inputId.style.backgroundColor = '#ff5656';
	}
});

empAddBtn.addEventListener('click', (e) => {
	const empName = document.querySelector('.emp-name');
	const empBirthday = document.querySelector('.emp-birth');
	e.preventDefault();

	if (empName.value != '' & empBirthday.value != '') {
		let empSplit = empName.value.split(' ');
		addNewEmp(empSplit, empBirthday.value);
		empName.style.backgroundColor = 'white';
		empBirthday.style.backgroundColor = 'white';
		empName.value = '';
		empBirthday.value = '';
		counter++;
	} else {
		alert('Заполните данные');
		empName.style.backgroundColor = '#ff5656';
		empBirthday.style.backgroundColor = '#ff5656';
	}
});

function addNewEmp(empName, empBirth) {
	let newEmpNote = document.createElement('tr');
	newEmpNote.classList.add('emp-note');
	newEmpNote.id = counter;
	newEmpNote.innerHTML = `
		<td class="id">${counter}</td>
		<td>${empName[0]}</td>
		<td>${empName[1]}</td>
		<td>${empName[2]}</td>
		<td>${empBirth.split('-').reverse().join('.')}</td>
	`;
	empTable.appendChild(newEmpNote);

	createLocalCopy(counter, empName.join(' '), empBirth.split('-').reverse().join('.'));
}

function deleteTR(id) {
	const toDelete = document.getElementById(id);
	toDelete.remove();
}

function createLocalCopy(id, name, birthday) {
	let user = {
		id: id,
		name: name,
		birthday: birthday,
	};

	localStorage.setItem(id, JSON.stringify(user));
}

function loadUsers(key) {
	let loadedUser = JSON.parse(localStorage.getItem(key));
	console.log(loadedUser);

	let loadedName = loadedUser.name.split(' ');

	let loadedEmp = document.createElement('tr');
	loadedEmp.classList.add('emp-note');
	loadedEmp.id = counter;
	loadedEmp.innerHTML = `
		<td class="id">${loadedUser.id}</td>
		<td>${loadedName[0]}</td>
		<td>${loadedName[1]}</td>
		<td>${loadedName[2]}</td>
		<td>${loadedUser.birthday}</td>
	`;
	empTable.appendChild(loadedEmp);
}

function loadUsersFromStorage() {
	let storagedUsers = [];
	empTable.innerHTML = '';
	counter = 1;

	for (let i = 1; i <= localStorage.length; i++) {
		storagedUsers.push(JSON.parse(localStorage.getItem(i)));
	}

	for (let i = 0; i < storagedUsers.length; i++) {
		let loadedUser = storagedUsers[i];

		let loadedName = loadedUser.name.split(' ');

		let loadedEmp = document.createElement('tr');
		loadedEmp.classList.add('emp-note');
		loadedEmp.id = counter;
		loadedEmp.innerHTML = `
		<td class="id">${counter}</td>
		<td>${loadedName[0]}</td>
		<td>${loadedName[1]}</td>
		<td>${loadedName[2]}</td>
		<td>${loadedUser.birthday}</td>
	`;
		empTable.appendChild(loadedEmp);
		counter++;
	}

	return counter = storagedUsers.length+1;
}
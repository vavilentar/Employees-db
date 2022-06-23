const sendBtn = document.querySelector('.send');
const mainTable = document.querySelector('.main-table');
const deleteBtn = document.querySelector('.deleteBtn');
const loadBtn = document.querySelector('.load-items');
const nameList = document.querySelector('.name');

loadPersonalNames();

let counter = 1;

loadBtn.addEventListener('click', (e) => {
	e.preventDefault();
	loadPersonalNames();
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

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();
	const dateTime = document.querySelector('.day');
	const nameOf = document.querySelector('.name');
	const placeOf = document.querySelector('.place');

	if (dateTime.value != '') {
		const dateValue = dateTime.value.split('T')[0].split('-').reverse().join('.');
		const timeValue = dateTime.value.split('T')[1];
		addTR(dateValue, timeValue, nameOf.value, placeOf.value);
		dateTime.style.backgroundColor = 'white';
		counter++;
	} else {
		alert('Введите дату и время');
		dateTime.style.backgroundColor = '#ff5656';
	}

});

function addTR(day, time, name, place) {
	let newTr = document.createElement('tr');
	newTr.classList.add('table-note');
	newTr.id = counter;
	newTr.innerHTML = `
		<td class="id">${counter}</td>
		<td>${day}</td>
		<td>${time}</td>
		<td>${name}</td>
		<td>${place}</td>
	`;
	mainTable.appendChild(newTr);
}

function deleteTR(id) {
	const toDelete = document.getElementById(id);
	toDelete.remove();
}

function loadPersonalNames() {
	let storagedUsers = [];
	nameList.innerHTML = '';

	for (let i = 1; i <= localStorage.length; i++) {
		storagedUsers.push(JSON.parse(localStorage.getItem(i)));
	}

	if (storagedUsers.length > 0) {

		for (let i = 0; i < storagedUsers.length; i++) {
			let loadedUser = storagedUsers[i];
			let loadedName = loadedUser.name;

			let loadedEmp = document.createElement('option');
			loadedEmp.innerHTML = `
			<option value=${loadedName}>${loadedName}</option>
	`;
			nameList.appendChild(loadedEmp);
		}
	} else {
		alert('Нет данных');
	}

	console.log(storagedUsers);
}
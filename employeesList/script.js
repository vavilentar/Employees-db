const empAddBtn = document.querySelector('.emp-add-btn');
const empTable = document.querySelector('.employees-table');
const deleteBtn = document.querySelector('.deleteBtn');
const loadBtn = document.querySelector('.load-items');


empTable.innerHTML = `
<tr>
<th class="id">ID</th>
<th>Name</th>
<th>Phone</th>
<th>Email</th>
<th>City</th>
</tr>
`;

function deleteTR(id) {
	const toDelete = document.getElementById(id);
	toDelete.remove();
}

const reqURL = 'https://jsonplaceholder.typicode.com/users';

function sendRequest(method, url) {
	const headers = {
		'Content-Type': 'application/json'
	}
	return fetch(url, {
			method: method,
			headers: headers,
		})
		.then(response => {
			return response.json()
		})
}

sendRequest('GET', reqURL)
	.then(data => {
		for (let i = 0; i < data.length; i++) {
			let userTab = document.createElement('tr');
			userTab.innerHTML = `
			<td class="id">${data[i].id}</td>
			<td>${data[i].name}</td>
			<td>${data[i].phone}</td>
			<td>${data[i].email}</td>
			<td>${data[i].address.city}</td>
			`
			empTable.appendChild(userTab);
		}
	})


//LEGACY 

// let counter = 1;

// loadUsersFromStorage();

// loadBtn.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	loadUsersFromStorage();
// });

// deleteBtn.addEventListener('click', (e) => {
// 	e.preventDefault();
// 	const inputId = document.querySelector('.inputDelete');
// 	if (inputId.value != '') {
// 		deleteTR(inputId.value);
// 		inputId.value = '';
// 		inputId.style.backgroundColor = 'white';
// 	} else {
// 		alert('Введите ID записи');
// 		inputId.style.backgroundColor = '#ff5656';
// 	}
// });

// empAddBtn.addEventListener('click', (e) => {
// 	const empName = document.querySelector('.emp-name');
// 	const empBirthday = document.querySelector('.emp-birth');
// 	e.preventDefault();

// 	if (empName.value != '' & empBirthday.value != '') {
// 		let empSplit = empName.value.split(' ');
// 		addNewEmp(empSplit, empBirthday.value);
// 		empName.style.backgroundColor = 'white';
// 		empBirthday.style.backgroundColor = 'white';
// 		empName.value = '';
// 		empBirthday.value = '';
// 		counter++;
// 	} else {
// 		alert('Заполните данные');
// 		empName.style.backgroundColor = '#ff5656';
// 		empBirthday.style.backgroundColor = '#ff5656';
// 	}
// });

// function addNewEmp(empName, empBirth) {
// 	let newEmpNote = document.createElement('tr');
// 	newEmpNote.classList.add('emp-note');
// 	newEmpNote.id = counter;
// 	newEmpNote.innerHTML = `
// 		<td class="id">${counter}</td>
// 		<td>${empName[0]}</td>
// 		<td>${empName[1]}</td>
// 		<td>${empName[2]}</td>
// 		<td>${empBirth.split('-').reverse().join('.')}</td>
// 	`;
// 	empTable.appendChild(newEmpNote);

// 	createLocalCopy(counter, empName.join(' '), empBirth.split('-').reverse().join('.'));
// }


// function createLocalCopy(id, name, birthday) {
// 	let user = {
// 		id: id,
// 		name: name,
// 		birthday: birthday,
// 	};

// 	localStorage.setItem(id, JSON.stringify(user));
// }

// function loadUsers(key) {
// 	let loadedUser = JSON.parse(localStorage.getItem(key));
// 	console.log(loadedUser);

// 	let loadedName = loadedUser.name.split(' ');

// 	let loadedEmp = document.createElement('tr');
// 	loadedEmp.classList.add('emp-note');
// 	loadedEmp.id = counter;
// 	loadedEmp.innerHTML = `
// 		<td class="id">${loadedUser.id}</td>
// 		<td>${loadedName[0]}</td>
// 		<td>${loadedName[1]}</td>
// 		<td>${loadedName[2]}</td>
// 		<td>${loadedUser.birthday}</td>
// 	`;
// 	empTable.appendChild(loadedEmp);
// }

// function loadUsersFromStorage() {
// 	let storagedUsers = [];
// 	empTable.innerHTML = `
// 	<tbody><tr>
// <th class="id">#</th>
// <th>Фамилия</th>
// <th>Имя</th>
// <th>Отчество</th>
// <th>Дата рождения</th>
// </tr>
// </tbody>
// `;
// 	counter = 1;

// 	for (let i = 1; i <= localStorage.length; i++) {
// 		storagedUsers.push(JSON.parse(localStorage.getItem(i)));
// 	}

// 	for (let i = 0; i < storagedUsers.length; i++) {
// 		let loadedUser = storagedUsers[i];

// 		let loadedName = loadedUser.name.split(' ');

// 		let loadedEmp = document.createElement('tr');
// 		loadedEmp.classList.add('emp-note');
// 		loadedEmp.id = counter;
// 		loadedEmp.innerHTML = `
// 		<td class="id">${counter}</td>
// 		<td>${loadedName[0]}</td>
// 		<td>${loadedName[1]}</td>
// 		<td>${loadedName[2]}</td>
// 		<td>${loadedUser.birthday}</td>
// 	`;
// 		empTable.appendChild(loadedEmp);
// 		counter++;
// 	}

// 	return counter = storagedUsers.length + 1;
// }
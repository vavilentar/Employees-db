const empAddBtn = document.querySelector('.emp-add-btn');
const empTable = document.querySelector('.employees-table');
const deleteBtn = document.querySelector('.deleteBtn');

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

let counter = 1;

empAddBtn.addEventListener('click', (e) => {
	const empName = document.querySelector('.emp-name');
	const empBirthday = document.querySelector('.emp-birth');
	e.preventDefault();

	if(empName.value != '' & empBirthday.value != ''){
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
		<td>${empBirth}</td>
	`;
	empTable.appendChild(newEmpNote);
}


function deleteTR(id) {
	const toDelete = document.getElementById(id);
	toDelete.remove();
}
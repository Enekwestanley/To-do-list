import './style.css';
import { ToDo, addToList } from './method.js';

// Clear completed functionality
const deleteAllCompleted = () => {
  ToDo.list = ToDo.list.filter((item) => item.complete === false);
  ToDo.list.forEach((item, i) => { item.index = i; });
  localStorage.setItem('todoList', JSON.stringify(ToDo.list));
  addToList();
};

function add(e) {
  if (e.key === 'Enter') {
    const newItem = new ToDo(this.value, false);
    localStorage.setItem('todoList', JSON.stringify(newItem.getList()));
    this.value = '';
    addToList();
  }
}

// //On Window load
const list = JSON.parse(localStorage.getItem('todoList'));
if (list) {
  list.forEach((item) => new ToDo(item.description, item.complete));
}

// Add input event on todo
const addInput = document.getElementById('add-input');
addInput.addEventListener('keydown', add);

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', deleteAllCompleted);

addToList();

import './style.css';
class ToDo {
  static list = [];

  constructor(description, complete = false) {
    this.description = description;
    this.complete = complete;
    this.index = ToDo.list.length;
    ToDo.list.push(this);
    this.getList = () => ToDo.list;
  }

  update() {
    if (this.complete) {
      this.complete = false;
    } else {
      this.complete = true;
    }
  }
}

// Add items to UI
const addToList = () => {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = '';

  ToDo.list.forEach((item) => {
    const listItem = document.createElement('li');
    listItem.setAttribute('id', item.index);
    listItem.classList = 'item-container';

    listItem.innerHTML = `
    <input class="checkbox" type="checkbox">
    <input type="text" class="input" value='${item.description}'>
    <button class="cancel-btn"><i class="fa fa-trash" aria-hidden="true"></i></button>
    `;
    todoList.appendChild(listItem);

    const checkbox = listItem.querySelector('input');
    const text = listItem.querySelector('.input');
    const textInput = listItem.querySelector('p');
    const deleteButton = listItem.querySelector('button');

     // Update
     checkbox.addEventListener('change', () => {
      const index = parseInt(listItem.id, 10);
      ToDo.list[index].update();
      text.classList.toggle('complete');
      textInput.classList.toggle('complete');
      localStorage.setItem('todoList', JSON.stringify(ToDo.list));
    });

    text.addEventListener('input', (e) => {
      text.value = e.target.value;
      const index = parseInt(listItem.id, 10);
      ToDo.list[index].description = e.target.value;
      localStorage.setItem('todoList', JSON.stringify(ToDo.list));
      if (e.code === 'Enter') {
        // text.style.display = 'block';
        textInput.classList.toggle('edit-item');
      }
    });

    // Delete functionality
    deleteButton.addEventListener('click', () => {
      const index = parseInt(listItem.id, 10);
      ToDo.list = ToDo.list.filter((item) => item !== ToDo.list[index]);
      ToDo.list.forEach((item, i) => { item.index = i; });
      localStorage.setItem('todoList', JSON.stringify(ToDo.list));
      addToList();
    });

    if (item.complete) {
      checkbox.checked = true;
      text.classList = 'complete';
    }
  });
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

addToList();
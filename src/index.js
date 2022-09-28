import './style.css';

const toDoContainer = document.getElementById('container');

const Activities = [
  {
    description: 'Say my prayer',
    completed: true,
    index: 0,
  },

  {
    description: 'Brush my teeth',
    completed: false,
    index: 1,
  },

  {
    description: 'Take my bath',
    completed: true,
    index: 3,
  },

  {
    description: 'Go to school',
    completed: false,
    index: 4,
  },

  {
    description: 'Go to movies',
    completed: false,
    index: 5,
  },

  {
    description: 'Read a novel',
    completed: false,
    index: 6,
  },
];

const show = (arr) => {
  arr.forEach((e) => {
    toDoContainer.innerHTML += `<div class="activity-container">
    <input type="checkbox" class="checkBox">
    <li class ="item">${arr[arr.indexOf(e)].description}</li>
    <i class="fa-solid fa-ellipsis-vertical"></i>
    </div>`;
  });
};

show(Activities);

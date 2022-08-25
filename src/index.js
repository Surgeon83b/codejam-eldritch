import _ from 'lodash';
import './style.css';
import '../assets/Ancients/index';
import difficulties from '../data/difficulties';
import ancientsData from '../data/ancients';

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  return element;
}
let a = _.shuffle(ancientsData);
console.log(a);
//document.body.appendChild(component());

const ancients = document.querySelector('.ancients-container');
ancients.addEventListener('click', ancientsClick);
let mode = 0;
let diff = '';

const curAncient =  document.querySelector('.cur-ancient');
const diffContainer = document.querySelector('.difficulty-container');
let currentAncient = {};
diffContainer.addEventListener('click', diffClick);
//console.log(diffContainer.childNodes);
//console.log(difficulties);
const diffContainerChildren = diffContainer.children;
for (let i=0; i<=4; i++) {
  diffContainerChildren[i].innerHTML = difficulties[i].name;
  diffContainerChildren[i].setAttribute('id', difficulties[i].id);
}

function ancientsClick(e) {
  const tar = e.target;

  switch (tar.id) {
    case 'azathoth': {
      mode = 1;
      break;
    }
    case 'cthulthu': {
      mode = 2;
      break;
    }
    case 'iogSothoth': {
      mode = 3;
      break;
    }
    case 'shubNiggurath': {
      mode = 4;
      break;
    }
  }
  curAncient.innerHTML = tar.id;
  currentAncient = ancientsData.find(el => el.id==tar.id);
  console.log(currentAncient);
}

function diffClick(e) {
  diff = e.target.id;
  console.log(diff);
}

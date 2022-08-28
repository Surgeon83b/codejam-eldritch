import _ from 'lodash';
import './style.css';
import '../assets/Ancients/index';
import difficulties from '../data/difficulties';
import ancientsData from '../data/ancients';
import { brownCards, blueCards, greenCards } from '../data/mythicCards';

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


const curAncient = document.querySelector('.cur-ancient');
const diffContainer = document.querySelector('.difficulty-container');

///// --- Initialization of Ancient Mode and Dificulty --- //////
let currentAncient = {};
let diff = '';
let numberOfCards = {};
let setOfCards = {};

diffContainer.addEventListener('click', diffClick);
//console.log(diffContainer.childNodes);
const diffContainerChildren = diffContainer.children;
for (let i = 0; i <= 4; i++) {
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
  currentAncient = ancientsData.find(el => el.id == tar.id);
  console.log(currentAncient);
  fillDots(currentAncient);
  numberOfCards = cardsCount(currentAncient);
  console.log(numberOfCards);
}

function diffClick(e) {
  diff = e.target.id;
  console.log(diff);
}

document.querySelector('.shuffle').addEventListener('click', shuffle);

function shuffle(mode) {
  console.log(modifiedSetOfCards(diff));
  setOfCards = setTotalCards(modifiedSetOfCards(diff), numberOfCards); console.log(setOfCards);
  console.log(stageCards(setOfCards, currentAncient));
}

function totalCards(ancient) {
  return (
    ancient.firstStage.greenCards + ancient.firstStage.blueCards + ancient.firstStage.brownCards +
    ancient.secondStage.greenCards + ancient.secondStage.blueCards + ancient.secondStage.brownCards +
    ancient.thirdStage.greenCards + ancient.thirdStage.blueCards + ancient.thirdStage.brownCards
  )
}

///// --- CARDS COUNT OF EVERY COLOR --- /////
function cardsCount(ancient) {
  return {
    greenCards: ancient.firstStage.greenCards + ancient.secondStage.greenCards + ancient.thirdStage.greenCards,
    blueCards: ancient.firstStage.blueCards + ancient.secondStage.blueCards + ancient.thirdStage.blueCards,
    brownCards: ancient.firstStage.brownCards + ancient.secondStage.brownCards + ancient.thirdStage.brownCards,
  }
}
//////////////////////////////////////////////////////////////////////////////

function modifiedSetOfCards(diff) {
  switch (diff) {
    case 'normal':
      return {
        greenCards: greenCards,
        brownCards: brownCards,
        blueCards: blueCards
      }
    default:
      return {
        greenCards: greenCards,
        brownCards: brownCards,
        blueCards: blueCards
      }
  }
}

function setTotalCards(cards, colorsCount) {
  const green = (_.shuffle(cards.greenCards.slice())).slice(0, colorsCount.greenCards);
  const brown = (_.shuffle(cards.brownCards.slice())).slice(0, colorsCount.brownCards);
  const blue = (_.shuffle(cards.blueCards.slice())).slice(0, colorsCount.blueCards);
  return {
    greenCards: green,
    brownCards: brown,
    blueCards: blue
  }
}

function stageCards(cards, curAncient) {
  const finalCards = {
    stage1: {},
    stage2: {},
    stage3: {}
  };
  const curCards = {};
  Object.assign(curCards, cards);
 //console.log(curAncient);
 /////////// FIRST STAGE //////////////
  curCards.greenCards = _.shuffle(curCards.greenCards);
  finalCards.stage1.greenCards = curCards.greenCards.slice(0, curAncient.firstStage.greenCards);
  curCards.greenCards = curCards.greenCards.slice(curAncient.firstStage.greenCards, curCards.greenCards.length);

  curCards.brownCards = _.shuffle(curCards.brownCards);
  finalCards.stage1.brownCards = curCards.brownCards.slice(0, curAncient.firstStage.brownCards);
  curCards.brownCards = curCards.brownCards.slice(curAncient.firstStage.brownCards, curCards.brownCards.length);

  curCards.blueCards = _.shuffle(curCards.blueCards);
  finalCards.stage1.blueCards = curCards.blueCards.slice(0, curAncient.firstStage.blueCards);
  curCards.blueCards = curCards.blueCards.slice(curAncient.firstStage.blueCards, curCards.blueCards.length);

  finalCards.stage1.cards = finalCards.stage1.greenCards;
  finalCards.stage1.cards.push(...finalCards.stage1.brownCards);
  finalCards.stage1.cards.push(...finalCards.stage1.blueCards);
  _.shuffle(finalCards.stage1.cards);
  console.log(finalCards.stage1.cards);
/////////// SECOND STAGE //////////////
  curCards.greenCards = _.shuffle(curCards.greenCards);
  finalCards.stage2.greenCards = curCards.greenCards.slice(0, curAncient.secondStage.greenCards);
  curCards.greenCards = curCards.greenCards.slice(curAncient.secondStage.greenCards, curCards.greenCards.length);

  curCards.brownCards = _.shuffle(curCards.brownCards);
  finalCards.stage2.brownCards = curCards.brownCards.slice(0, curAncient.secondStage.brownCards);
  curCards.brownCards = curCards.brownCards.slice(curAncient.secondStage.brownCards, curCards.brownCards.length);

  curCards.blueCards = _.shuffle(curCards.blueCards);
  finalCards.stage2.blueCards = curCards.blueCards.slice(0, curAncient.secondStage.blueCards);
  curCards.blueCards = curCards.blueCards.slice(curAncient.secondStage.blueCards, curCards.blueCards.length);

/////////// THIRD STAGE //////////////
  curCards.greenCards = _.shuffle(curCards.greenCards);
  finalCards.stage3.greenCards = curCards.greenCards.slice(0, curAncient.thirdStage.greenCards);
  curCards.greenCards = curCards.greenCards.slice(curAncient.thirdStage.greenCards, curCards.greenCards.length);

  curCards.brownCards = _.shuffle(curCards.brownCards);
  finalCards.stage3.brownCards = curCards.brownCards.slice(0, curAncient.thirdStage.brownCards);
  curCards.brownCards = curCards.brownCards.slice(curAncient.thirdStage.brownCards, curCards.brownCards.length);

  curCards.blueCards = _.shuffle(curCards.blueCards);
  finalCards.stage3.blueCards = curCards.blueCards.slice(0, curAncient.thirdStage.blueCards);
  curCards.blueCards = curCards.blueCards.slice(curAncient.thirdStage.blueCards, curCards.blueCards.length);


  console.log(curCards);
  return finalCards;
}


////////// --- FILL DOTS OF EVERY STAGE --- //////////
function fillDots(ancient) {
  const stage1 = document.querySelector('.stage1');
  const stage2 = document.querySelector('.stage2');
  const stage3 = document.querySelector('.stage3');

  stage1.querySelector('.green').innerHTML = ancient.firstStage.greenCards;
  stage1.querySelector('.blue').innerHTML = ancient.firstStage.blueCards;
  stage1.querySelector('.brown').innerHTML = ancient.firstStage.brownCards;

  stage2.querySelector('.green').innerHTML = ancient.secondStage.greenCards;
  stage2.querySelector('.blue').innerHTML = ancient.secondStage.blueCards;
  stage2.querySelector('.brown').innerHTML = ancient.secondStage.brownCards;

  stage3.querySelector('.green').innerHTML = ancient.thirdStage.greenCards;
  stage3.querySelector('.blue').innerHTML = ancient.thirdStage.blueCards;
  stage3.querySelector('.brown').innerHTML = ancient.thirdStage.brownCards;
}
//////////////////////////////////////////////////////////////////////////////
import _, { last } from 'lodash';
import './style.css';
import '../assets/Ancients/index';
import difficulties from '../data/difficulties';
import ancientsData from '../data/ancients';
import { brownCards, blueCards, greenCards } from '../data/mythicCards';
import { fillDots, stageCards, cardsCount, modifiedSetOfCards } from './utils'

///// --- Initialization of Ancient Mode and Dificulty --- //////
let currentAncient = {};
let diff = '';
let numberOfCards = {
  greenCards: 0,
  brownCards: 0,
  blueCards: 0
};
let setOfCards = {};
let finalCards = [];
let stageLengths = [];
let counter = 0;
//////////////////////////////////////////////////////////////////
const stage1 = document.querySelector('.stage1');
const stage2 = document.querySelector('.stage2');
const stage3 = document.querySelector('.stage3');
const stages = [stage1, stage2, stage3];

const curAncient = document.querySelector('.cur-ancient');
const diffContainer = document.querySelector('.difficulty-container');

const ancients = document.querySelector('.ancients-container');
ancients.addEventListener('click', ancientsClick);
const deck = document.querySelector('.deck');
const lastCard = document.querySelector('.last-card');
const lastCardName = document.querySelector('.last-card-name');
deck.style.backgroundImage = `url('../assets/mythicCardBackground.png')`;
deck.addEventListener('click', nextCard);

function resetAll() {
  counter = 0;
  stageLengths = [];
  finalCards = [];
  setOfCards = {};
  diff = '';
  numberOfCards = {
    greenCards: 0,
    brownCards: 0,
    blueCards: 0
  };
  deck.style.visibility = 'hidden';
  document.querySelector('.deck-container').style.visibility = 'hidden';

  for (let i = 0; i <= 4; i++) {
    diffContainerChildren[i].classList.remove('active');
  }
  lastCard.innerHTML = '';
}

function nextCard() {
  lastCard.style.backgroundImage = `url(${finalCards[finalCards.length - 1].cardFace})`;
  let curCard = {};
  let curStage = {};
  curCard = finalCards.pop();
  counter++;

  lastCardName.innerHTML = curCard.id + ' - ' + curCard.difficulty;
  if (counter <= stageLengths[0]) curStage = stage1
  else if (counter > stageLengths[0] + stageLengths[1]) curStage = stage3
  else curStage = stage2;
  curStage.querySelector('.' + curCard.color).innerHTML--;
  if (counter == stageLengths[0] + stageLengths[1] + stageLengths[2]) {
    deck.style.visibility = 'hidden';
    document.querySelector('.shuffle').style.visibility = 'hidden';
    stage3.style.backgroundColor = 'red';
    stage3.querySelector('.stage-text').innerHTML += ' completed';
  } else
    if (counter == stageLengths[0]) {
      stage1.style.backgroundColor = 'red';
      stage1.querySelector('.stage-text').innerHTML += ' completed';
    } else
      if (counter == stageLengths[0] + stageLengths[1]) {
        stage2.style.backgroundColor = 'red';
        stage2.querySelector('.stage-text').innerHTML += ' completed';
      }
}

diffContainer.addEventListener('click', diffClick);
document.querySelector('.shuffle').addEventListener('click', shuffle);

const diffContainerChildren = diffContainer.children;
for (let i = 0; i <= 4; i++) {
  diffContainerChildren[i].innerHTML = difficulties[i].name;
  diffContainerChildren[i].setAttribute('id', difficulties[i].id);
}

function ancientsClick(e) {
  const tar = e.target;
  resetAll();
  document.querySelector('.shuffle').style.visibility = 'hidden';

  curAncient.innerHTML = tar.id;
  currentAncient = ancientsData.find(el => el.id == tar.id);
  fillDots(currentAncient, stages);
  numberOfCards = cardsCount(currentAncient);
  console.log(numberOfCards);
  document.querySelector('.difficulty-container').style.visibility = 'visible';
}

function diffClick(e) {
  resetAll();
  fillDots(currentAncient, stages);
  numberOfCards = cardsCount(currentAncient);
  let curDiff = e.target;
  diff = e.target.id;
  for (let i = 0; i <= 4; i++) {
    diffContainerChildren[i].classList.remove('active');
  }

  curDiff.classList.add('active');
  diffContainer.classList.remove('active');
  console.log(diff);
  document.querySelector('.shuffle').style.visibility = 'visible';
  lastCard.innerHTML = '';
}

function shuffle(mode) {
  deck.style.visibility = 'visible';
  document.querySelector('.deck-container').style.visibility = 'visible';

  stage1.style.backgroundColor = 'white';
  stage1.querySelector('.stage-text').innerHTML = 'Stage 1';
  stage2.style.backgroundColor = 'white';
  stage2.querySelector('.stage-text').innerHTML = 'Stage 2';
  stage3.style.backgroundColor = 'white';
  stage3.querySelector('.stage-text').innerHTML = 'Stage 3';

  setOfCards = setTotalCards(modifiedSetOfCards(diff, numberOfCards), numberOfCards);
  finalCards = stageCards(setOfCards, currentAncient, stageLengths);
  console.log('finalCards', finalCards);
  lastCard.style.backgroundImage = 'none';
  lastCardName.innerHTML = '';
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

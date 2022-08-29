import _, { last } from 'lodash';
import './style.css';
import '../assets/Ancients/index';
import difficulties from '../data/difficulties';
import ancientsData from '../data/ancients';
import { brownCards, blueCards, greenCards } from '../data/mythicCards';

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

const stage1 = document.querySelector('.stage1');
const stage2 = document.querySelector('.stage2');
const stage3 = document.querySelector('.stage3');

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
  // console.log(finalCards.pop().cardFace);

  lastCard.style.backgroundImage = `url(${finalCards[finalCards.length-1].cardFace})`;
  let curCard = {};
  let curStage = {};
  curCard = finalCards.pop();
  counter++;

  lastCardName.innerHTML = curCard.id + curCard.difficulty;
  if (counter <= stageLengths[0]) curStage = stage1
  else if (counter > stageLengths[0] + stageLengths[1]) curStage = stage3
  else curStage = stage2;
  curStage.querySelector('.' + curCard.color).innerHTML--;
  if (counter == stageLengths[0] + stageLengths[1] + stageLengths[2]) deck.style.visibility = 'hidden';
}


diffContainer.addEventListener('click', diffClick);
const diffContainerChildren = diffContainer.children;
for (let i = 0; i <= 4; i++) {
  diffContainerChildren[i].innerHTML = difficulties[i].name;
  diffContainerChildren[i].setAttribute('id', difficulties[i].id);
}

function ancientsClick(e) {
  const tar = e.target;
//resetAll();
document.querySelector('.shuffle').style.visibility = 'hidden';
  
  curAncient.innerHTML = tar.id;
  currentAncient = ancientsData.find(el => el.id == tar.id);
  fillDots(currentAncient);
  numberOfCards = cardsCount(currentAncient);
  console.log(numberOfCards);
  document.querySelector('.difficulty-container').style.visibility = 'visible';
}

function diffClick(e) {
 // resetAll();
 // fillDots(currentAncient);
 // numberOfCards = cardsCount(currentAncient);
  let curDiff = e.target;
  console.log(curDiff);
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

document.querySelector('.shuffle').addEventListener('click', shuffle);

function shuffle(mode) {
  // console.log(modifiedSetOfCards(diff));
  deck.style.visibility = 'visible';
  document.querySelector('.deck-container').style.visibility = 'visible';
  setOfCards = setTotalCards(modifiedSetOfCards(diff), numberOfCards); console.log('setOfCards', setOfCards);
  finalCards = stageCards(setOfCards, currentAncient);
  console.log('finalCards', finalCards);
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
    case 'very-easy': {
      let greenEasy = greenCards.filter(val => val.difficulty == 'easy');
      let greenNormal = greenCards.filter(val => val.difficulty == 'normal');
      if (numberOfCards.greenCards > greenEasy.length) {
        greenNormal = _.shuffle(greenNormal);
        greenNormal = greenNormal.slice(0, numberOfCards.greenCards - greenEasy.length);
        greenEasy.push(...greenNormal);
      }

      let brownEasy = brownCards.filter(val => val.difficulty == 'easy');
      let brownNormal = brownCards.filter(val => val.difficulty == 'normal');
      console.log(numberOfCards.brownCards);
      console.log(brownEasy.length);
      if (numberOfCards.brownCards > brownEasy.length) {
        brownNormal = _.shuffle(brownNormal);

        brownNormal = brownNormal.slice(0, numberOfCards.brownCards - brownEasy.length);
        brownEasy.push(...brownNormal);
      }

      let blueEasy = blueCards.filter(val => val.difficulty == 'easy');
      let blueNormal = blueCards.filter(val => val.difficulty == 'normal');
      if (numberOfCards.blueCards > blueEasy.length) {
        blueNormal = _.shuffle(blueNormal);
        blueNormal = blueNormal.slice(0, numberOfCards.blueCards - blueEasy.length);
        blueEasy.push(...blueNormal);
      }

      return {
        greenCards: greenEasy,
        brownCards: brownEasy,
        blueCards: blueEasy,
      }
    }
    case 'easy':
      return {
        greenCards: greenCards.filter(val => val.difficulty !== 'hard'),
        brownCards: brownCards.filter(val => val.difficulty !== 'hard'),
        blueCards: blueCards.filter(val => val.difficulty !== 'hard'),
      }
    case 'normal':
      return {
        greenCards: greenCards,
        brownCards: brownCards,
        blueCards: blueCards
      }
    case 'hard':
      return {
        greenCards: greenCards.filter(val => val.difficulty !== 'easy'),
        brownCards: brownCards.filter(val => val.difficulty !== 'easy'),
        blueCards: blueCards.filter(val => val.difficulty !== 'easy'),
      }
    case 'very-hard': {
      let greenHard = greenCards.filter(val => val.difficulty == 'hard');
      let greenNormal = greenCards.filter(val => val.difficulty == 'normal');
      if (numberOfCards.greenCards > greenHard.length) {
        greenNormal = _.shuffle(greenNormal);
        greenNormal = greenNormal.slice(0, numberOfCards.greenCards - greenHard.length);
        greenHard.push(...greenNormal);
      }

      let brownHard = brownCards.filter(val => val.difficulty == 'hard');
      let brownNormal = brownCards.filter(val => val.difficulty == 'normal');
      if (numberOfCards.brownCards > brownHard.length) {
        brownNormal = _.shuffle(brownNormal);
        brownNormal = brownNormal.slice(0, numberOfCards.brownCards - brownHard.length);
        brownHard.push(...brownNormal);
      }

      let blueHard = blueCards.filter(val => val.difficulty == 'hard');
      let blueNormal = blueCards.filter(val => val.difficulty == 'normal');
      if (numberOfCards.blueCards > blueHard.length) {
        blueNormal = _.shuffle(blueNormal);
        blueNormal = blueNormal.slice(0, numberOfCards.blueCards - blueHard.length);
        blueHard.push(...blueNormal);
      }

      return {
        greenCards: greenHard,
        brownCards: brownHard,
        blueCards: blueHard,
      }
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
    stage3: {},
    cards: []
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

  finalCards.stage1.cards = finalCards.stage1.greenCards.slice();
  finalCards.stage1.cards.push(...finalCards.stage1.brownCards);
  finalCards.stage1.cards.push(...finalCards.stage1.blueCards);
  finalCards.stage1.cards = _.shuffle(finalCards.stage1.cards);
  stageLengths[0] = finalCards.stage1.cards.length;

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

  finalCards.stage2.cards = finalCards.stage2.greenCards.slice();
  finalCards.stage2.cards.push(...finalCards.stage2.brownCards);
  finalCards.stage2.cards.push(...finalCards.stage2.blueCards);
  finalCards.stage2.cards = _.shuffle(finalCards.stage2.cards);
  stageLengths[1] = finalCards.stage2.cards.length;

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

  finalCards.stage3.cards = finalCards.stage3.greenCards.slice();
  finalCards.stage3.cards.push(...finalCards.stage3.brownCards);
  finalCards.stage3.cards.push(...finalCards.stage3.blueCards);
  finalCards.stage3.cards = _.shuffle(finalCards.stage3.cards);
  stageLengths[2] = finalCards.stage3.cards.length;

  finalCards.cards = [...finalCards.stage3.cards];
  finalCards.cards.push(...finalCards.stage2.cards);
  finalCards.cards.push(...finalCards.stage1.cards);
  console.log(finalCards);
  return finalCards.cards;
}


////////// --- FILL DOTS OF EVERY STAGE --- //////////
function fillDots(ancient) {

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
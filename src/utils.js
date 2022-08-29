////////// --- FILL DOTS OF EVERY STAGE --- //////////
function fillDots(ancient, stages) {

    stages[0].querySelector('.green').innerHTML = ancient.firstStage.greenCards;
    stages[0].querySelector('.blue').innerHTML = ancient.firstStage.blueCards;
    stages[0].querySelector('.brown').innerHTML = ancient.firstStage.brownCards;
  
    stages[1].querySelector('.green').innerHTML = ancient.secondStage.greenCards;
    stages[1].querySelector('.blue').innerHTML = ancient.secondStage.blueCards;
    stages[1].querySelector('.brown').innerHTML = ancient.secondStage.brownCards;
  
    stages[2].querySelector('.green').innerHTML = ancient.thirdStage.greenCards;
    stages[2].querySelector('.blue').innerHTML = ancient.thirdStage.blueCards;
    stages[2].querySelector('.brown').innerHTML = ancient.thirdStage.brownCards;
  }
  //////////////////////////////////////////////////////////////////////////////

///// --- CARDS COUNT OF EVERY COLOR --- /////
function cardsCount(ancient) {
    return {
      greenCards: ancient.firstStage.greenCards + ancient.secondStage.greenCards + ancient.thirdStage.greenCards,
      blueCards: ancient.firstStage.blueCards + ancient.secondStage.blueCards + ancient.thirdStage.blueCards,
      brownCards: ancient.firstStage.brownCards + ancient.secondStage.brownCards + ancient.thirdStage.brownCards,
    }
  }
  //////////////////////////////////////////////////////////////////////////////

  ////////// --- CARDS FOR THE CURRENT GAME --- //////////
  function stageCards(cards, curAncient, stageLengths) {
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
  //////////////////////////////////////////////////////////////////////////////

  export {fillDots, stageCards, cardsCount};

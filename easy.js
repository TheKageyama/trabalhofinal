const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const characters = [
  '001', '025', '031', '038'
];

const createElement = (tag, className) => {
  const element = document.createElement(tag);
  element.className = className;
  return element;
}

let firstCard = '';
let secondCard = '';
let time = 30;  
let pairsFound = 0;  

const checkEndGame = () => {
  const disabledCards = document.querySelectorAll('.disabled-card');

  if (disabledCards.length === 8) {
    clearInterval(loop);
    alert(`Parabéns, ${spanPlayer.textContent}! Seu tempo foi de: ${timer.innerHTML}`);
    saveScore();  
  }
}

const checkCards = () => {
  const firstCharacter = firstCard.getAttribute('data-character');
  const secondCharacter = secondCard.getAttribute('data-character');

  if (firstCharacter === secondCharacter) {
    firstCard.firstChild.classList.add('disabled-card');
    secondCard.firstChild.classList.add('disabled-card');
    firstCard = '';
    secondCard = '';
    pairsFound++;  
    checkEndGame();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('reveal-card');
      secondCard.classList.remove('reveal-card');
      firstCard = '';
      secondCard = '';
    }, 500);
  }
}

const revealCard = ({ target }) => {
  if (target.parentNode.className.includes('reveal-card')) {
    return;
  }

  if (firstCard === '') {
    target.parentNode.classList.add('reveal-card');
    firstCard = target.parentNode;
  } else if (secondCard === '') {
    target.parentNode.classList.add('reveal-card');
    secondCard = target.parentNode;
    checkCards();
  }
}

const createCard = (character) => {
  const card = createElement('div', 'card');
  const front = createElement('div', 'face front');
  const back = createElement('div', 'face back');

  front.style.backgroundImage = `url('../images/${character}.png')`;

  card.appendChild(front);
  card.appendChild(back);

  card.addEventListener('click', revealCard);
  card.setAttribute('data-character', character);

  return card;
}

const loadGame = () => {
  const duplicateCharacters = [...characters, ...characters];

  const shuffledArray = duplicateCharacters.sort(() => Math.random() - 0.5);

  shuffledArray.forEach((character) => {
    const card = createCard(character);
    grid.appendChild(card);
  });
}

let loop; 

const startTimer = () => {
  loop = setInterval(() => {
    if (time === 0) {
      clearInterval(loop);
      alert(`Seu tempo acabou, ${spanPlayer.textContent}!`);
      saveScore(); 
    } else {
      time--;
      timer.innerHTML = time < 10 ? `0${time}` : time;  
    }
  }, 1000);
}

const saveScore = () => {
  const playerName = spanPlayer.textContent;  
  const playerScore = pairsFound * 10 + time; 
  
  const players = JSON.parse(localStorage.getItem('players')) || [];
  players.push({ name: playerName, score: playerScore });
  localStorage.setItem('players', JSON.stringify(players));

  
  window.location = 'ranking.html';
}

window.onload = () => {
  
  const playerName = localStorage.getItem('player') || 'Jogador';
  spanPlayer.textContent = playerName;  

  startTimer();
  loadGame();
}

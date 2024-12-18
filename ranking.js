const rankingList = document.getElementById('ranking-list');

const savePlayer = (name, score) => {

  const players = JSON.parse(localStorage.getItem('players')) || [];
  
  
  players.push({ name: name, score: score });
  
  
  localStorage.setItem('players', JSON.stringify(players));
};

const displayRanking = () => {
 
  const players = JSON.parse(localStorage.getItem('players')) || []; 

  
  players.sort((a, b) => b.score - a.score);

  
  players.forEach((player) => {
    const li = document.createElement('li');
    li.textContent = `${player.name}: ${player.score} pontos`;  
    rankingList.appendChild(li);
  });
};

window.onload = displayRanking;

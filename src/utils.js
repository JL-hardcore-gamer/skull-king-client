const suits = [
  { type: 'red', color: '#f44336' },
  { type: 'blue', color: '#2196f3' },
  { type: 'yellow', color: '#ffeb3b' },
  { type: 'black', color: '#607d8b' },
];

const specialCards = [
  {
    id: 53,
    type: 'purple',
    color: '#9c27b0',
    value: 'JL King',
    icon1: 'fa-chess-king',
    icon2: null,
  },
  {
    id: 54,
    type: 'pink',
    color: '#e27b9e',
    value: 'Mermaid',
    icon1: 'fa-fish',
    icon2: null,
  },
  {
    id: 55,
    type: 'pink',
    color: '#e27b9e',
    value: 'Mermaid',
    icon1: 'fa-fish',
    icon2: null,
  },
  {
    id: 56,
    type: 'grey',
    color: '#9e9e9e',
    value: 'Pirate',
    icon1: 'fa-skull-crossbones',
    icon2: null,
  },
  {
    id: 57,
    type: 'grey',
    color: '#9e9e9e',
    value: 'Pirate',
    icon1: 'fa-skull-crossbones',
    icon2: null,
  },
  {
    id: 58,
    type: 'grey',
    color: '#9e9e9e',
    value: 'Pirate',
    icon1: 'fa-skull-crossbones',
    icon2: null,
  },
  {
    id: 59,
    type: 'grey',
    color: '#9e9e9e',
    value: 'Pirate',
    icon1: 'fa-skull-crossbones',
    icon2: null,
  },
  {
    id: 60,
    type: 'grey',
    color: '#9e9e9e',
    value: 'Pirate',
    icon1: 'fa-skull-crossbones',
    icon2: null,
  },
  {
    id: 61,
    type: 'white',
    color: 'white',
    value: 'Escape',
    icon1: 'fa-flag',
    icon2: null,
  },
  {
    id: 62,
    type: 'white',
    color: 'white',
    value: 'Escape',
    icon1: 'fa-flag',
    icon2: null,
  },
  {
    id: 63,
    type: 'white',
    color: 'white',
    value: 'Escape',
    icon1: 'fa-flag',
    icon2: null,
  },
  {
    id: 64,
    type: 'white',
    color: 'white',
    value: 'Escape',
    icon1: 'fa-flag',
    icon2: null,
  },
  {
    id: 65,
    type: 'white',
    color: 'white',
    value: 'Escape',
    icon1: 'fa-flag',
    icon2: null,
  },
  {
    id: 66,
    type: 'green',
    color: '#4caf50',
    value: 'Bloody Mary',
    icon1: 'fa-skull-crossbones',
    icon2: 'fa-flag',
  },
];

const generateCardList = () => {
  let cardList = [];
  let id = 1;
  suits.forEach(({ color, type }) => {
    for (let i = 1; i <= 13; ++i) {
      cardList.push({
        id: id,
        type: type,
        color: color,
        value: i,
      });
      ++id;
    }
  });

  cardList.push(...specialCards);

  return cardList;
};

const cardList = generateCardList();

export { cardList };

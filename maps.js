/*
 * Reglas:
 * El final de cada nivel debe ser el inicio del siguiente
*/

const emojis = {
    '-': ' ',
    'O': '🪦',
    'X': '🧄',
    'I': '🩸',
    'PLAYER': '🧛🏻‍♀️',
    'BOMB_COLLISION': '🔥',
    'GAME_OVER': '👎',
    'WIN': '🍷',
    'HEART': '🤍',
    'DEATH': '☠️',
  };
  
  const maps = [];
  maps.push(`
    IXXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    -XXXXXXXXX
    OXXXXXXXXX
  `);
  maps.push(`
    O--XXXXXXX
    X--XXXXXXX
    XX----XXXX
    X--XX-XXXX
    X-XXX--XXX
    X-XXXX-XXX
    XX--XX--XX
    XX--XXX-XX
    XXXX---IXX
    XXXXXXXXXX
    `);
  maps.push(`
    I-----XXXX
    XXXXX-XXXX
    XX----XXXX
    XX-XXXXXXX
    XX-----XXX
    XXXXXX-XXX
    XX-----XXX
    XX-XXXXXXX
    XX-----OXX
    XXXXXXXXXX
  `);
  maps.push(`
    OXXXXXXXXX  
    -XXXXXXXXX  
    -XXXXXXXXX  
    -XXXXXXXXX  
    -XXXXXXXXX  
    -XXXXXXXXX  
    -----XXXXX  
    XXXX--XXXX  
    XXXXX-IXXX  
    XXXXXXXXXX  
`);
maps.push(`
  XXXXXXXXXX  
  XX-----XXX  
  X--XXX-XXX  
  X-X----XXX  
  X-X-XXXXXX  
  XIX-XX---X  
  XXX-X--X-X  
  XXX---XX-X  
  XXXXXXOX-X  
  XXXXXX---X  
`);
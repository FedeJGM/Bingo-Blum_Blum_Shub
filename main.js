class BlumBlumShub {
  constructor(seed) {
    this.p = 383; // Número primo p
    this.q = 503; // Número primo q
    this.M = this.p * this.q; // M = p * q
    this.seed = seed % this.M; // Semilla inicial
  }

  next() { 
    this.seed = (this.seed ** 2) % this.M; // Fórmula de Blum Blum Shub
    return this.seed;
  }
    // Generar un número pseudoaleatorio en el rango [0, max)
  getRandom(max) {
    const randomValue = this.next();// Obtener el siguiente número pseudoaleatorio
    return randomValue % max;// Escalar al rango [0, max)
  }
}

// Instancia global única del generador Blum Blum Shub
const bbs = new BlumBlumShub(Date.now());// Usar la fecha actual como semilla

function getRandomInt(min, max) {
  const range = max - min + 1;// Rango de valores posibles
  return bbs.getRandom(range) + min;// Escalar al rango [min, max]
}

// Elementos del DOM
const bingoCard = document.getElementById('bingoCard');
const calledNumbersDiv = document.getElementById('calledNumbers');
const resetBtn = document.getElementById('resetBtn');
const roundsInfoDiv = document.getElementById('roundsInfo');
const callNumberBtn = document.getElementById('callNumberBtn');
const resultsDiv = document.getElementById('results');
const bingoBall = document.getElementById('bingoBall'); 

// Variables globales
let numbers = Array.from({ length: 75 }, (_, i) => i + 1); // Lista de números del 1 al 75
let calledNumbers = []; // Lista de números ya llamados
let rounds = 0; // Contador de rondas
let firstBingoRound = null; // Rondas necesarias para el primer Binguito
let completedCardRound = null; // Rondas necesarias para completar la cartilla
let completedBingos = []; // Registro para almacenar Binguitos completados

// Función auxiliar para verificar si un número está en la cartilla
function isNumberInCard(calledNumber) {
  const cells = document.querySelectorAll('.bingo-cell');
  for (const cell of cells) {
    const cellContent = cell.textContent;
    if (cellContent === 'FREE') {
      continue; // Ignorar la casilla "FREE"
    }
    if (Number(cellContent) === calledNumber) {
      return true; // El número está en la cartilla
    }
  }
  return false; // El número no está en la cartilla
}

// Generar la cartilla de Bingo
function generateBingoCard() {
  const cardNumbers = [];
  for (let i = 0; i < 24; i++) {
    let num;
    do {
      num = getRandomInt(1, 75);
    } while (cardNumbers.includes(num)); // Asegurar que los números sean únicos
    cardNumbers.push(num);
  }
  cardNumbers.splice(12, 0, 'FREE'); // Casilla Libre en el centro

  cardNumbers.forEach((num, index) => {
    const cell = document.createElement('div');
    cell.classList.add('bingo-cell');
    if (index === 12) {
      cell.classList.add('free-cell'); // Estilo para la casilla libre
    }
    cell.textContent = num;
    bingoCard.appendChild(cell);
  });
}

// Resaltar el número llamado en la cartilla
function highlightCalledNumber(calledNumber) {
  const cells = document.querySelectorAll('.bingo-cell');
  cells.forEach(cell => {
    if (Number(cell.textContent) === calledNumber) {
      cell.classList.add('called'); // Resaltar número llamado
    }
  });
}

// Verificar si hay un Binguito en filas o columnas
function checkBingo() {
  const cells = document.querySelectorAll('.bingo-cell');
  const rows = [
    [0, 1, 2, 3, 4], // Fila 1
    [5, 6, 7, 8, 9], // Fila 2
    [10, 11, 12, 13, 14], // Fila 3
    [15, 16, 17, 18, 19], // Fila 4
    [20, 21, 22, 23, 24], // Fila 5
  ];

  // Verificar filas
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    if (!completedBingos.includes(`fila-${i}`)) {
      // Verificar si la fila ya fue notificada
      let isRowComplete = true;
      for (const index of row) {
        const cellContent = cells[index].textContent;
        if (cellContent !== 'FREE' && !calledNumbers.includes(Number(cellContent))) {
          isRowComplete = false;
          break;
        }
      }
      if (isRowComplete) {
        completedBingos.push(`fila-${i}`); // Agregar la fila al array de Binguitos completados
        alert('¡Binguito!'); // Mostrar alerta de Binguito
        return true; // Hay un Binguito en una fila
      }
    }
  }

  // Verificar columnas
  for (let col = 0; col < 5; col++) {
    if (!completedBingos.includes(`columna-${col}`)) {
      // Verificar si la columna ya fue notificada
      let isColumnComplete = true;
      for (let row = 0; row < 5; row++) {
        const index = rows[row][col]; // Obtener el índice de la celda en la columna actual
        const cellContent = cells[index].textContent;
        if (cellContent !== 'FREE' && !calledNumbers.includes(Number(cellContent))) {
          isColumnComplete = false;
          break;
        }
      }
      if (isColumnComplete) {
        completedBingos.push(`columna-${col}`); // Agregar la columna al array de Binguitos completados
        alert('¡Binguito!'); // Mostrar alerta de Binguito
        return true; // Hay un Binguito en una columna
      }
    }
  }
  return false; // No hay Binguito
}

// Verificar si la cartilla está completamente marcada
function isCardCompleted() {
  const cells = document.querySelectorAll('.bingo-cell');
  return Array.from(cells).every(cell => {
    const cellContent = cell.textContent;
    return cellContent === 'FREE' || calledNumbers.includes(Number(cellContent));
  });
}

// Mostrar los resultados en pantalla
function showResults() {
  let resultsText = '';
  if (firstBingoRound !== null) {
    resultsText += `<p>Rondas para el primer Binguito: ${firstBingoRound}</p>`;
  }
  if (completedCardRound !== null) {
    resultsText += `<p>Rondas para completar la cartilla: ${completedCardRound}</p>`;
  }
    resultsDiv.innerHTML = resultsText; //Actualizar el contenido del div de resultados
}

// Llamar un número aleatorio
function callNumber() {
  if (numbers.length === 0) {
    alert('¡Todos los números han sido llamados!');
    return;
  }

  const randomIndex = getRandomInt(0, numbers.length - 1);
  const calledNumber = numbers.splice(randomIndex, 1)[0];// Extraer un número aleatorio
  calledNumbers.push(calledNumber);// Agregar a la lista de números llamados

  // Actualizar la lista de números llamados
  calledNumbersDiv.textContent = `Números llamados: ${calledNumbers.join(', ')}`;
  rounds++;
  roundsInfoDiv.textContent = `Rondas: ${rounds}`;

  // Resaltar el número llamado en la cartilla
  highlightCalledNumber(calledNumber);

  // Actualizar la bola de bingo
  bingoBall.textContent = calledNumber;

  // Verificar si el número está en la cartilla antes de checkBingo
  if (isNumberInCard(calledNumber)) {
    if (checkBingo() && firstBingoRound === null) {
      firstBingoRound = rounds; // Guardar las rondas necesarias para el primer Binguito
      showResults(); // Actualizar los resultados en pantalla
    }

    if (isCardCompleted() && completedCardRound === null) {
      completedCardRound = rounds; // Guardar las rondas necesarias para completar la cartilla
      alert('¡Cartilla completada!'); // Mostrar alerta de cartilla completada
      showResults(); // Actualizar los resultados en pantalla
      callNumberBtn.disabled = true; // Deshabilitar el botón de llamar número
    }
  }
}

// Inicializar el juego
generateBingoCard();
callNumberBtn.addEventListener('click', callNumber);

// Reiniciar el juego
resetBtn.addEventListener('click', () => {
  location.reload();
});

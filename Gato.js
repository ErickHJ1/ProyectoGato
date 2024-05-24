const cells = document.querySelectorAll('.cell');
let jugador = 'X';
let cpu = 'O';
let btn = document.getElementById('btnReset')

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!cell.textContent) {
            cell.textContent = jugador;
            jugador = (jugador === 'X') ? 'X' : 'X';

            // Mira si alguien ganó
            if (checkWin(cells)) {
                alert(`El jugador ganó!`);
            } else {
                // Turno de la CPU después del jugador humano
                setTimeout(() => turnoCPU(cells), 2100); // Agrega un retraso para simular la decisión de la CPU
            }
        }
    });
});

function checkWin(cells) {
    // Define las combinaciones ganadoras (filas, columnas y diagonales)
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    // Mira cada winCondition
    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return true; // Alguien ganó
        }
    }

    // Verifica si hay empate
    if (checkEmpate(cells)) {
        // No hay ganador
        return false;
    }
}


function checkEmpate(cells) {
    // Verifica si todas las celdas están ocupadas
    const todasOcupadas = Array.from(cells).every(cell => cell.textContent);

    if (todasOcupadas) {
        alert('¡Empate! No hay ganador.');
        return true;
    } else {
        return false;
    }
}

function turnoCPU(cells) {
    // Filtra las celdas disponibles (sin contenido)
    const celdasDisponibles = Array.from(cells).filter(cell => !cell.textContent);
    

    // Implementa una lógica más avanzada para elegir la celda
    const celdaSeleccionada = elegirCeldaEstrategica(cells, celdasDisponibles);

    if (celdaSeleccionada) {
        // Actualiza la celda con el marcador de la CPU
        celdaSeleccionada.textContent = cpu;

        // Verifica si alguien ganó después del turno de la CPU
        if (checkWin(cells)) {
            alert(`¡La CPU ganó!`);
        }
    }
}


function elegirCeldaEstrategica(cells, celdasDisponibles) {
    // Prioriza el centro y las esquinas
    const esquinas = [0, 2, 6, 8];
    const centro = 4;

    // Si el centro está disponible, elige el centro
    if (celdasDisponibles.includes(cells[centro])) {
        return cells[centro];
    }

    // Si alguna esquina está disponible, elige una al azar
    const esquinaDisponible = esquinas.find(esquina => celdasDisponibles.includes(cells[esquina]));
    if (esquinaDisponible !== undefined) {
        return cells[esquinaDisponible];
    }

    // Si no hay esquinas disponibles, aplica una estrategia básica
    // Por ejemplo, bloquear al jugador humano si tiene dos marcadores en una fila
    const filaBloqueada = buscarFilaBloqueada(cells, celdasDisponibles);
    if (filaBloqueada !== undefined) {
        return cells[filaBloqueada];
    }

        const indiceAleatorio = Math.floor(Math.random() * celdasDisponibles.length);
        return celdasDisponibles[indiceAleatorio];
        
    }
    // Si no se cumple ninguna condición anterior, elige una celda al azar
    
function buscarFilaBloqueada(cells, celdasDisponibles) {
    const winCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];
}

function reiniciar(btn) {
    location.reload()
}

function byebye() {
    document.getElementById('music').play();
}
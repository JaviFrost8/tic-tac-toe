import { useState } from 'react'
import './App.css'
import { Square } from './components/Square'
import confetti from 'canvas-confetti';

const TURNS = {
  X: '❌',
  O: '⚪'
}

const WINNER_COMBS =[
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.X);
  const [winner, setWinner] = useState(null)

  function uploadBoard(index){
    //Si hay algo en indice, no se sobreescribe
    if(board[index] || winner) return
    //marcar en el tablero
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard)
    //Cambiamos al siguiente turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
    setTurn(newTurn)
    //Ver si hay algún ganador o queda empate
    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
      
    }else if(checkEndGame(newBoard)){
      setWinner(false);
    }
    
  }

  function checkEndGame(boardToCheck){
    return boardToCheck.every((square) => square !== null)
  }

  function checkWinner(boardToCheck){
    for(const comb of WINNER_COMBS){
      const [a, b, c] = comb;
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }

    return null
  }

  function resetGame(){
    setBoard(Array(9).fill(null));
    setTurn(TURNS.X);
    setWinner(null)
  }

  return (
    <main className='board'>
      <section>
        <h1>Tic tac toe</h1>
        <div className='game'>
          {
            board.map((_, index) => {
              return (
                <Square
                  key={index}
                  index={index}
                  uploadBoard={uploadBoard}
                >
                  {board[index]}
                </Square>
              )
            })
          }
        </div>
      </section>
      <section className='turn'>
          <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
          <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </section>

      {
        winner !== null && (
          <section className='winner'>
            <div className='text'>
              <h2>
                {
                  winner === false 
                    ? 'Empate'
                    : 'Ganó'
                }
              </h2>

              <header className='win'>
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
              </footer>
            </div>
          </section>
        )
      }
    </main>
  )
}

export default App

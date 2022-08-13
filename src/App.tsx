import { FC, useState } from 'react';

import Board from './components/board/Board';

const App: FC = () => {
  const [score, setScore] = useState<number>(0);

  return (
    <>
      <header>
        <h1>Welcome to 2048</h1>
        <p>Use keyboard arrows to play</p>
        <span>
          Your current score: <strong>{score}</strong>
        </span>
      </header>
      <Board score={score} updateScore={setScore} />
    </>
  );
};

export default App;

import { FC, MouseEventHandler } from 'react';

import { Scorable } from '../../interfaces/scorable.interface';

import Styles from './EndOverlay.module.scss';

interface Props extends Scorable {
  isWin: boolean;
  onStartNewGame: MouseEventHandler<HTMLButtonElement>;
}

const EndOverlay: FC<Props> = ({ isWin, score, onStartNewGame }) => {
  return (
    <div className={`${Styles.overlay} ${isWin ? Styles.win : ''}`}>
      <span>{isWin ? 'Congratulations! You WON!' : 'GAME OVER!'}</span>
      <span>Your score is: {score}</span>
      <button type="button" onClick={onStartNewGame}>
        Start new game
      </button>
    </div>
  );
};

export default EndOverlay;

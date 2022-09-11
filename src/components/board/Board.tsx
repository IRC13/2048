import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react';

import { ArrowKeyCodes } from '../../enums/arrow-key-codes.enum';
import { Scorable } from '../../interfaces/scorable.interface';
import { MAX_CELL_VALUE } from '../../const/board.const';
import {
  assignRandomCellInitialValue,
  getInitialCells,
  getRearrangedCellsX,
  getRearrangedCellsY,
  isMergeAvailable,
  updateCellValuesX,
  updateCellValuesY
} from '../../helpers/board.helper';
import EndOverlay from '../end-overlay/EndOverlay';

import Styles from './Board.module.scss';

interface Props extends Scorable {
  updateScore: Dispatch<SetStateAction<number>>;
}

const Board: FC<Props> = ({ score, updateScore }) => {
  const [cells, setCells] = useState<number[]>(getInitialCells());
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isWin, setIsWin] = useState<boolean>(false);

  const addedScoreRef = useRef<number>(0);

  const onStartNewGame = (): void => {
    setIsEnd(false);
    setIsWin(false);
    setCells(getInitialCells());
    updateScore(0);
  };

  const getUpdatedStateOnMoveX = (cells: number[], fromLeftToRight: boolean): number[] => {
    let rearrangedCells = getRearrangedCellsX(cells, fromLeftToRight);

    addedScoreRef.current = updateCellValuesX(rearrangedCells);

    // rearrange again after summing
    rearrangedCells = getRearrangedCellsX(rearrangedCells, fromLeftToRight);

    assignRandomCellInitialValue(rearrangedCells);

    return rearrangedCells;
  };

  const getUpdatedStateOnMoveY = (cells: number[], fromUpToDown: boolean): number[] => {
    let rearrangedCells = getRearrangedCellsY(cells, fromUpToDown);

    addedScoreRef.current = updateCellValuesY(rearrangedCells);

    // rearrange again after summing
    rearrangedCells = getRearrangedCellsY(rearrangedCells, fromUpToDown);

    assignRandomCellInitialValue(rearrangedCells);

    return rearrangedCells;
  };

  useEffect(() => {
    if (isEnd) {
      return;
    }

    const eventName = 'keyup';
    const onKeyUp = ({ keyCode }: KeyboardEvent): void => {
      const arrowCodes = Object.values(ArrowKeyCodes).filter(Number);
      if (arrowCodes.includes(keyCode)) {
        switch (keyCode) {
          case ArrowKeyCodes.Left:
            setCells(prevState => getUpdatedStateOnMoveX(prevState, false));
            break;
          case ArrowKeyCodes.Up:
            setCells(prevState => getUpdatedStateOnMoveY(prevState, false));
            break;
          case ArrowKeyCodes.Right:
            setCells(prevState => getUpdatedStateOnMoveX(prevState, true));
            break;
          case ArrowKeyCodes.Down:
            setCells(prevState => getUpdatedStateOnMoveY(prevState, true));
            break;
        }
      }
    };

    document.addEventListener(eventName, onKeyUp);

    return () => {
      document.removeEventListener(eventName, onKeyUp);
    };
  }, [isEnd]);

  useEffect(() => {
    if (addedScoreRef.current) {
      updateScore(prevState => prevState + addedScoreRef.current);
      addedScoreRef.current = 0;
    }

    if (cells.includes(MAX_CELL_VALUE)) {
      setIsEnd(true);
      setIsWin(true);
    } else if (cells.every(c => c > 0) && !isMergeAvailable(cells)) {
      setIsEnd(true);
    }
  }, [cells, updateScore]);

  return (
    <div className={Styles.board}>
      {cells.map((cell, i) => (
        <div key={i} className={`${Styles.boardCell} ${cell ? Styles[`v-${cell}` as keyof typeof Styles] : ''}`}>
          {cell || null}
        </div>
      ))}
      {isEnd ? <EndOverlay isWin={isWin} score={score} onStartNewGame={onStartNewGame} /> : null}
    </div>
  );
};

export default Board;

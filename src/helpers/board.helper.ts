import { INITIAL_CELL_VALUE, INITIAL_FILLED_CELLS, ROW_LENGTH, TOTAL_CELLS, TOTAL_ROWS } from '../const/board.const';

export const getInitialCells = (
  totalCells = TOTAL_CELLS,
  initialFilledCells = INITIAL_FILLED_CELLS,
  initialCellsValue = INITIAL_CELL_VALUE
): number[] => {
  const cells = Array.from<number>({
    length: totalCells
  }).fill(0);

  for (let i = 0; i < initialFilledCells; i++) {
    assignRandomCellInitialValue(cells, totalCells, initialCellsValue);
  }

  return cells;
};

export const getRandomCellIndex = (totalCells: number): number => {
  return Math.floor(Math.random() * totalCells);
};

export const assignRandomCellInitialValue = (
  cells: number[],
  totalCells = TOTAL_CELLS,
  initialCellsValue = INITIAL_CELL_VALUE
): void => {
  const randomIndex = getRandomCellIndex(totalCells);

  if (cells[randomIndex]) {
    assignRandomCellInitialValue(cells, totalCells, initialCellsValue);
  } else {
    cells[randomIndex] = initialCellsValue;
  }
};

export const getRearrangedCellsX = (cells: number[], fromLeftToRight: boolean, rowLength = ROW_LENGTH): number[] => {
  let idxToFill = 0;

  return cells.reduce((res, _, i, cellsArr) => {
    if (i % rowLength === 0) {
      const rowStartIdx = idxToFill;
      const rowEndIdx = rowStartIdx + rowLength;
      const rowFilledValues = cellsArr.slice(rowStartIdx, rowEndIdx).filter(Boolean);
      const rowNotFilledValues = Array.from<number>({
        length: rowLength - rowFilledValues.length
      }).fill(0);
      const rearrangedRow = fromLeftToRight
        ? rowNotFilledValues.concat(rowFilledValues)
        : rowFilledValues.concat(rowNotFilledValues);

      idxToFill += rowLength;

      return res.concat(rearrangedRow);
    }

    return res;
  }, [] as number[]);
};

export const getRearrangedCellsY = (
  cells: number[],
  fromUpToDown: boolean,
  rowLength = ROW_LENGTH,
  totalRows = TOTAL_ROWS
): number[] => {
  for (let i = 0; i < rowLength; i++) {
    const columnFilledValues = [];

    let iteratedRowIdx = 0;
    while (iteratedRowIdx < totalRows) {
      const cellValue: number = cells[i + rowLength * iteratedRowIdx];

      if (cellValue) {
        columnFilledValues.push(cellValue);
      }

      iteratedRowIdx++;
    }

    const columnNotFilledValues = Array.from<number>({
      length: totalRows - columnFilledValues.length
    }).fill(0);

    const rearrangedColumn = fromUpToDown
      ? columnNotFilledValues.concat(columnFilledValues)
      : columnFilledValues.concat(columnNotFilledValues);

    for (let j = i; j < cells.length; j += rowLength) {
      cells[j] = rearrangedColumn[Math.floor(j / rearrangedColumn.length)];
    }
  }

  return [...cells];
};

export const updateCellValuesX = (cells: number[], totalCells = TOTAL_CELLS): number => {
  let addedScore = 0;

  for (let i = 0; i < totalCells - 1; i++) {
    const currentCellValue = cells[i];
    const nextCellValue = cells[i + 1];

    if (currentCellValue === nextCellValue) {
      cells[i] = currentCellValue + nextCellValue;
      cells[i + 1] = 0;
      addedScore += cells[i];
    }
  }

  return addedScore;
};

export const updateCellValuesY = (cells: number[], totalCells = TOTAL_CELLS, rowLength = ROW_LENGTH): number => {
  let addedScore = 0;

  for (let i = 0; i < totalCells - rowLength; i++) {
    const currentCellValue = cells[i];
    const nextCellValue = cells[i + rowLength];

    if (currentCellValue === nextCellValue) {
      cells[i] = currentCellValue + nextCellValue;
      cells[i + rowLength] = 0;
      addedScore += cells[i];
    }
  }

  return addedScore;
};

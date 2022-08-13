import { render } from '@testing-library/react';

import { mockMathRandom } from '../../utils/test/math-random-mock.util';
import Board from './Board';

describe('Board.tsx test suite', () => {
  beforeEach(() => {
    mockMathRandom();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should match snapshot', () => {
    const view = render(<Board score={0} updateScore={jest.fn()} />);

    expect(view).toMatchSnapshot();
  });
});

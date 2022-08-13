import { render } from '@testing-library/react';

import Board from './Board';

describe('Board.tsx test suite', () => {
  it('should match snapshot', () => {
    const view = render(<Board score={0} updateScore={jest.fn()} />);

    expect(view).toMatchSnapshot();
  });
});

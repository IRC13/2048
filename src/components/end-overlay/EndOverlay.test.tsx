import { render } from '@testing-library/react';

import EndOverlay from './EndOverlay';

describe('EndOverlay.tsx test suite', () => {
  it('should match snapshot', () => {
    const view = render(<EndOverlay isWin score={0} onStartNewGame={jest.fn()} />);

    expect(view).toMatchSnapshot();
  });
});

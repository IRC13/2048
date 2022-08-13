import { render } from '@testing-library/react';

import { mockMathRandom } from './utils/test/math-random-mock.util';
import App from './App';

describe('App.tsx test suite', () => {
  beforeEach(() => {
    mockMathRandom();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('should match snapshot', () => {
    const view = render(<App />);

    expect(view).toMatchSnapshot();
  });
});

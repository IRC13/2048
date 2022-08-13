import { render } from '@testing-library/react';

import App from './App';

describe('App.tsx test suite', () => {
  it('should match snapshot', () => {
    const view = render(<App />);

    expect(view).toMatchSnapshot();
  });
});

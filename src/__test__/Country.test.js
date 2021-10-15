import React from 'react';
import { render } from '@testing-library/react';
import Country from '../components/Country';

test('The spinner appears in the Country view', () => {
  const { container } = render(<Country />);
  const linkElement = container.querySelector('.spinner');
  expect(linkElement).toBeInTheDocument();
});

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Admin from './views/Admin'

test('Renders admin view', () => {
  render(<Admin />)
  const testid = screen.getByTestId('Admin')
  expect(testid).toBeTruthy();
})
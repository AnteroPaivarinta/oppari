import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor, fireEvent, getByTestId } from '@testing-library/react'
import Admin from './views/Admin';
import { mockObject } from '../__mocks__/axios';
import axios from 'axios';

jest.mock('axios');
describe('Axios', () => {
  
  it('Renders admin view', async () => {
    const obj = {
      PersonID: '123',
      firstName: '123',
      lastName: '123',
      age: '123',
      email: '123',
      gender: '123',
      phone: '123',
      tshirt: '123',
      team: '123',
      licenseCard: true,
      hopes: '123',
      freeText: '123',
      tasks: [],
      date: '123',
      days: [],
    }
    const flushPromises = () => new Promise(setImmediate);
    const mockedAxios = axios as jest.Mocked<typeof axios>; 
    mockedAxios.get.mockResolvedValueOnce({ data: [obj] });
    mockedAxios.post.mockResolvedValueOnce({ data: {loginResponse: 'Right user and password'}} );
    render(<Admin />)
    const user = screen.getByTestId('user');
    fireEvent.change(user, 'admin');

    const password = screen.getByTestId('password');
    fireEvent.change(password, '123');
    fireEvent.click(screen.getByTestId('login'));
    await flushPromises()
    
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalled();
    });

    mockedAxios.post.mockResolvedValueOnce({ data: {token: 'code123'}} );
    fireEvent.click(screen.getByTestId('sendCode'));
    await flushPromises()
    
    await flushPromises()
    await waitFor(() => {
      expect(screen.getByTestId('database')).toBeTruthy();
    });
  })
});
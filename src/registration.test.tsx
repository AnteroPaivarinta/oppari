import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor, fireEvent, getByTestId } from '@testing-library/react'
import Registration from './views/Registration';
import axios from 'axios';

jest.mock('axios');
describe('Registration', () => {
  it('Making sure that user can send data with form', async () => {
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
    render(<Registration />)

    fireEvent.change(screen.getByTestId('firstName'), 'testi');
    fireEvent.change(screen.getByTestId('lastName'), 'testi');
    fireEvent.change(screen.getByTestId('age'), '23');
    fireEvent.change(screen.getByTestId('gender'), 'Mies');
    fireEvent.change(screen.getByTestId('email'), 'sposti@gmail.com');
    fireEvent.change(screen.getByTestId('team'), 'tiimi');
    fireEvent.change(screen.getByTestId('phone'), '+382309482309');
    fireEvent.change(screen.getByTestId('licenseCard'), true);
    fireEvent.change(screen.getByTestId('hopes'), 'toivomuksia');
    fireEvent.click(screen.getByTestId('first'));



    fireEvent.change(screen.getByTestId('freetextfield'), 'vapaateksti');

    fireEvent.click(screen.getByText('selectionbox'));
    fireEvent.click(screen.getByText('kisakansliatoimitsija'));
    fireEvent.click(screen.getByText('robotButton'));
    fireEvent.click(screen.getByText('sendButton'));


    const mockedAxios = axios as jest.Mocked<typeof axios>; 
    mockedAxios.post.mockResolvedValueOnce({ data: {loginResponse: 'Right user and password'}} );

    await flushPromises()
    await waitFor(() => {
      expect(mockedAxios.post).toBeCalled();
    });
  })



});
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import Admin from './views/Admin';
import { mockObject } from '../__mocks__/axios';
import axios from 'axios';
jest.mock('axios');
describe('Axios', () => {
  
  it('Renders admin view', async () => {

    const flushPromises = () => new Promise(setImmediate);
    const mockData = { example: 'data' };
    const mockedAxios = axios as jest.Mocked<typeof axios>; // Cast axios to a mocked version
    mockedAxios.get.mockResolvedValueOnce({ data: mockData });
    render(<Admin />)
    await flushPromises()
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalled();
    });
  })
});

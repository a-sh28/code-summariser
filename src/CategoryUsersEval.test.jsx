import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CategoryUsersEval from './CategoryUsersEval';

describe('CategoryUsersEval component', () => {
  test('renders user statistics correctly', async () => {
    // Mock the fetch requests
    jest.spyOn(global, 'fetch')
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          naturalness: 50,
          usefulness: 60,
          consistency: 70,
          count: 10
        })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => (['Software Developer', 'Designer', 'Data Scientist'])
      });

    const { getByText, findByText } = render(<CategoryUsersEval />);

    // Check if initial category is rendered
    expect(getByText('Software Developer')).toBeInTheDocument();

    // Click on a different category
    fireEvent.click(getByText('Designer'));

    // Wait for the component to update with new statistics
    await waitFor(() => {
      expect(getByText('Naturalness: 5')).toBeInTheDocument();
      expect(getByText('Usefulness: 6')).toBeInTheDocument();
      expect(getByText('Consistency: 7')).toBeInTheDocument();
      expect(getByText('Total Number of Code Summaries: 10')).toBeInTheDocument();
    });
  });
});

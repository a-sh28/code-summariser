import React from 'react';
import { render } from '@testing-library/react';
import AllUsersEval from './AllUsersEval';

describe('AllUsersEval component', () => {
  test('renders user statistics correctly', async () => {
  
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          naturalness: 25,
          usefulness: 30,
          consistency: 35,
          count: 5
        })
      });

    const { findByText } = render(<AllUsersEval />);

    expect(await findByText('Naturalness: 5')).toBeInTheDocument();
    expect(await findByText('Usefulness: 6')).toBeInTheDocument();
    expect(await findByText('Consistency: 7')).toBeInTheDocument();
    expect(await findByText('Total Number of Code Summaries: 10')).toBeInTheDocument();
  });
});

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard component', () => {
  test('renders navigation bar correctly', () => {
    const { getByText } = render(<AdminDashboard />);
    
    expect(getByText('Admin Mode')).toBeInTheDocument();
    expect(getByText('Add an Admin')).toBeInTheDocument();
    expect(getByText('View User Stats')).toBeInTheDocument();
    expect(getByText('Change to user mode')).toBeInTheDocument();
    expect(getByText('Account Settings')).toBeInTheDocument();
  });

  
});

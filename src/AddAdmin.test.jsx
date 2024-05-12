import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddAdmin from './AddAdmin';

describe('AddAdmin component', () => {
  test('renders form fields correctly', () => {
    const { getByLabelText, getByText } = render(<AddAdmin />);
    
    expect(getByText('Add Admin')).toBeInTheDocument();
    expect(getByLabelText('Name')).toBeInTheDocument();
    expect(getByLabelText('Password')).toBeInTheDocument();
    expect(getByText('Add Administrator')).toBeInTheDocument();
  });

  test('updates input values on user input', () => {
    const { getByLabelText } = render(<AddAdmin />);

    const nameInput = getByLabelText('Name');
    const passwordInput = getByLabelText('Password');

    fireEvent.change(nameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    expect(nameInput.value).toBe('admin');
    expect(passwordInput.value).toBe('password');
  });


});

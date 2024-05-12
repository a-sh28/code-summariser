import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AccountSettings from './AccountSettings.jsx';

describe('AccountSettings component', () => {
  test('renders account information correctly', () => {
    const { getByLabelText, getByText } = render(<AccountSettings />);
    
    expect(getByText('Account Information')).toBeInTheDocument();
    expect(getByLabelText('Admin Name:')).toBeInTheDocument();
    expect(getByLabelText('Admin Password:')).toBeInTheDocument();
    expect(getByText('Change Password')).toBeInTheDocument();
  });

  test('shows change password form when Change Password button is clicked', () => {
    const { getByText, getByLabelText } = render(<AccountSettings />);

    fireEvent.click(getByText('Change Password'));

    expect(getByLabelText('New Password:')).toBeInTheDocument();
    expect(getByText('Submit New Password')).toBeInTheDocument();
  });


});

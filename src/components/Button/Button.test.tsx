import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders button with title', () => {
    render(<Button title="Click me" />);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders button with custom class', () => {
    render(<Button title="Click me" classList={['custom-class']} />);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toHaveClass('custom-class');
  });

  it('calls onClick when button is clicked', () => {
    const onClickMock = jest.fn();
    render(<Button title="Click me" onClick={onClickMock} />);
    const buttonElement = screen.getByText('Click me');
    fireEvent.click(buttonElement);
    expect(onClickMock).toHaveBeenCalled();
  });

  it('renders a submit button when type is "submit"', () => {
    render(<Button title="Submit" type="submit" />);
    const buttonElement = screen.getByText('Submit');
    expect(buttonElement).toHaveAttribute('type', 'submit');
  });

  it('disables the button when disabled prop is true', () => {
    render(<Button title="Click me" disabled={true} />);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeDisabled();
  });
});

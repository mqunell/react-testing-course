import { render, screen, fireEvent } from '@testing-library/react';
import App, { replacePascalWithSpaces } from './App';

/**
 * Functional tests
 */
test('initial conditions of button and checkbox', () => {
	// Create a virtual DOM from the passed-in JSX
	render(<App />);

	// Check that the button starts with the correct text, backgroundColor, and enabled status
	const colorButton = screen.getByRole('button', {
		name: 'Change to Midnight Blue',
	});
	expect(colorButton).toBeEnabled();
	expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });

	// Check that the checkbox starts out unchecked
	const checkbox = screen.getByRole('checkbox');
	expect(checkbox).not.toBeChecked();
});

test('button changes text and color when clicked', () => {
	render(<App />);

	const colorButton = screen.getByRole('button', {
		name: 'Change to Midnight Blue',
	});

	// Click the button and check the new text and backgroundColor
	fireEvent.click(colorButton);
	expect(colorButton).toHaveTextContent('Change to Medium Violet Red');
	expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });

	// Click the button again and check the new (original) text and backgroundColor
	fireEvent.click(colorButton);
	expect(colorButton).toHaveTextContent('Change to Midnight Blue');
	expect(colorButton).toHaveStyle({ backgroundColor: 'Medium Violet Red' });
});

test('checkbox disables button when checked, enables when not checked', () => {
	render(<App />);

	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const colorButton = screen.getByRole('button');

	// Not checked (default)
	expect(checkbox).not.toBeChecked();

	// Checked
	fireEvent.click(checkbox);
	expect(checkbox).toBeChecked();
	expect(colorButton).toBeDisabled();

	// Not checked
	fireEvent.click(checkbox);
	expect(checkbox).not.toBeChecked();
	expect(colorButton).toBeEnabled();
});

test('the MediumVioletRed button becomes gray when disabled and reverts', () => {
	render(<App />);

	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const colorButton = screen.getByRole('button');

	// Disable
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

	// Re-enable
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'MediumVioletRed' });
});

test('the MidnightBlue button becomes gray when disabled and reverts', () => {
	render(<App />);

	const checkbox = screen.getByRole('checkbox', { name: 'Disable button' });
	const colorButton = screen.getByRole('button');

	// Click to change to MidnightBlue
	fireEvent.click(colorButton);

	// Disable
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'gray' });

	// Re-enable
	fireEvent.click(checkbox);
	expect(colorButton).toHaveStyle({ backgroundColor: 'MidnightBlue' });
});

/**
 * Unit tests (grouped together with "describe")
 */
describe('spaces before pascal-case capital letters', () => {
	test('works for no inner capital letters', () => {
		expect(replacePascalWithSpaces('Gray')).toBe('Gray');
	});

	test('works for one inner capital letter', () => {
		expect(replacePascalWithSpaces('MidnightBlue')).toBe('Midnight Blue');
	});

	test('works for multiple inner capital letters', () => {
		expect(replacePascalWithSpaces('MediumVioletRed')).toBe(
			'Medium Violet Red'
		);
	});
});

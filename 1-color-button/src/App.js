import { useState } from 'react';
import './App.css';

// "PascalCaseString" -> "Pascal Case String"
export function replacePascalWithSpaces(colorName) {
	return colorName.replace(/\B([A-Z])\B/g, ' $1');
}

function App() {
	const [buttonColor, setButtonColor] = useState('MediumVioletRed');
	const [isChecked, setIsChecked] = useState(false);

	const newButtonColor =
		buttonColor === 'MediumVioletRed' ? 'MidnightBlue' : 'MediumVioletRed';

	return (
		<div>
			<button
				style={{ backgroundColor: isChecked ? 'gray' : buttonColor }}
				disabled={isChecked}
				onClick={() => setButtonColor(newButtonColor)}
			>
				Change to {replacePascalWithSpaces(newButtonColor)}
			</button>

			<label>
				<input
					type="checkbox"
					checked={isChecked}
					aria-checked={isChecked}
					onChange={(e) => setIsChecked(e.target.checked)}
				/>
				Disable button
			</label>
		</div>
	);
}

export default App;

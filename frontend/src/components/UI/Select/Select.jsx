import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Select.module.css';

const cls = classNames.bind(styles);

/**
 * A reusable Select component that renders a dropdown list of options.
 *
 * @param {object} current - The currently selected option.
 * @param {function} onChange - A callback function to handle changes to the selected option.
 * @param {array} options - An array of option objects to be rendered in the dropdown list.
 * @param {string} label - An optional label to be displayed above the select component.
 * @param {boolean} disabled - A flag to indicate whether the select component is disabled.
 * @return {JSX.Element} The rendered Select component.
 */
export const Select = ({ current, onChange, options, label, disabled }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div
			className={cls('container')}
			style={label ? { marginTop: 26 } : {}}
			{...(!disabled ? { tabIndex: 0 } : {})}
			onClick={() => setIsOpen(!isOpen)}
			onBlur={() => setIsOpen(false)}
		>
			{label && <label className={cls('selectLabel')}>{label}</label>}
			<span className={cls('value', { disabled })}>{current.title}</span>
			{!disabled && (
				<>
					<div className={cls('caret', { flipped: isOpen })}></div>
					<ul className={cls('options', { show: isOpen })}>
						{options.map(option => (
							<li
								key={option.value}
								className={cls('option', { selected: option.value === current.value })}
								onClick={() => {
									onChange(option);
								}}
							>
								{option.title}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

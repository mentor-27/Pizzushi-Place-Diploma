import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Select.module.css';

const cls = classNames.bind(styles);

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

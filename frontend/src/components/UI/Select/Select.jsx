import { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './Select.module.css';

const cls = classNames.bind(styles);

export const Select = ({ value, onChange, options, label, disabled }) => {
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
			<span className={cls('value', { disabled })}>{value.name}</span>
			{!disabled && (
				<>
					<div className={cls('caret', { flipped: isOpen })}></div>
					<ul className={cls('options', { show: isOpen })}>
						{options.map(option => (
							<li
								className={cls('option', { selected: option.roleId === value.roleId })}
								key={option.roleId}
								onClick={() => {
									onChange(option);
								}}
							>
								{option.name}
							</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
};

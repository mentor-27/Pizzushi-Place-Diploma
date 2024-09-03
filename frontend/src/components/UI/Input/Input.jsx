import { forwardRef } from 'react';
import classNames from 'classnames/bind';

import styles from './Input.module.css';

const cls = classNames.bind(styles);

export const Input = forwardRef(
	(
		{
			className,
			mx = 0,
			my = 0,
			px = 16,
			py = 16,
			label,
			err,
			bg = 'var(--light-low)',
			...props
		},
		ref,
	) => {
		return (
			<div className={styles.inputBlock} style={{ marginInline: mx, marginBlock: my }}>
				{label && (
					<label htmlFor={props?.id || props?.name} className={styles.inputLabel}>
						{label}
					</label>
				)}
				<input
					className={cls('input', className)}
					style={{ paddingInline: px, paddingBlock: py, backgroundColor: bg }}
					{...props}
					ref={ref}
				></input>
				{err && (
					<label htmlFor={props?.id || props?.name} className={styles.inputError}>
						{err}
					</label>
				)}
			</div>
		);
	},
);

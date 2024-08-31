import { forwardRef } from 'react';
import styles from './Input.module.css';

export const Input = forwardRef(
	(
		{ mx = 0, my = 0, px = 16, py = 16, label, err, bg = 'var(--light-low)', ...props },
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
					className={styles.input}
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

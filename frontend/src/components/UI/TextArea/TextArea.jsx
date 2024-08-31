import { forwardRef } from 'react';

import styles from './TextArea.module.css';

export const TextArea = forwardRef(
	({ mx = 0, my = 0, px = 16, py = 16, label, ...props }, ref) => {
		return (
			<div className={styles.textareaBlock} style={{ marginInline: mx, marginBlock: my }}>
				{label && (
					<label className={styles.textAreaLabel} htmlFor={props?.id || props?.name}>
						{label}
					</label>
				)}
				<textarea
					className={styles.textArea}
					style={{ paddingInline: px, paddingBlock: py }}
					name={props?.name}
					id={props?.id}
					{...props}
					ref={ref}
				></textarea>
			</div>
		);
	},
);

import styles from './Cheeckbox.module.css';

export const Checkbox = ({ onChange, checked, value, margin = 0, ...props }) => {
	return (
		<label className={styles.checkboxBlock}>
			<input
				type="checkbox"
				className={styles.realCheckbox}
				value={value}
				checked={checked}
				onChange={onChange}
				{...props}
			/>
			<span className={styles.styledCheckbox} style={{ margin }}></span>
		</label>
	);
};

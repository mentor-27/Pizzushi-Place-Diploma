import { Checkbox } from '../../../UI';
import styles from './FilterCheckbox.module.css';

export const FilterCheckbox = ({ text, value, onChange, checked, margin }) => {
	return (
		<div className={styles.filterCheckbox} style={{ margin }}>
			<Checkbox
				onChange={onChange}
				checked={checked}
				value={value}
				id={`checkbox-${String(value)}`}
			/>
			<label htmlFor={`checkbox-${String(value)}`} className={styles.checkBoxLabel}>
				{text}
			</label>
		</div>
	);
};

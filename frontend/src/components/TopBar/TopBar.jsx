import { CategoriesPanel, SortBlock } from './UI';
import styles from './TopBar.module.css';

export const TopBar = ({ categories, ...props }) => {
	return (
		<div className={styles.topBar} {...props}>
			<CategoriesPanel />
			<SortBlock />
		</div>
	);
};

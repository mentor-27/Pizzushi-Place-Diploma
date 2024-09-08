import { CategoriesPanel, SortBlock } from './UI';
import styles from './TopBar.module.css';

export const TopBar = () => {
	return (
		<div className={styles.topBar}>
			<CategoriesPanel />
			<SortBlock />
		</div>
	);
};

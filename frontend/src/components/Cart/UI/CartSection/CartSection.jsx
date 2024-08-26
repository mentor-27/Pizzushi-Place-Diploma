import { Divider, Title } from '../../../UI';
import styles from './CartSection.module.css';

export const CartSection = ({ children, header = '', ActionComponent }) => {
	return (
		<section className={styles.sectionBlock}>
			{header && (
				<>
					<div className={styles.sectionHeader}>
						<Title size="md" text={header} />
						<ActionComponent className={styles.headerComponent} />
					</div>
					<Divider my="24px" color="var(--dark-middle)" />
				</>
			)}
			{children}
		</section>
	);
};

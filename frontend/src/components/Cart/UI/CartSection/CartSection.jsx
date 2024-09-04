import { Divider, Title } from '../../../UI';
import styles from './CartSection.module.css';

export const CartSection = ({
	children,
	header = '',
	ActionComponent,
	disabled = false,
}) => {
	return (
		<section className={styles.sectionBlock}>
			{header && (
				<>
					<div className={styles.sectionHeader}>
						<Title size="md" text={header} ws="normal" />
						{!disabled && ActionComponent && (
							<ActionComponent className={styles.headerComponent} />
						)}
					</div>
					<Divider my="24px" color="var(--dark50)" />
				</>
			)}
			<div className={styles.sectionContent}>{children}</div>
			{disabled && <div className={styles.disableOverlay}></div>}
		</section>
	);
};

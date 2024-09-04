import { Title } from '../UI';
import { Container } from '../UI/Container/Container';
import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footerBlock}>
			<Container py="16px" roundedBottom className={styles.footerContainer}>
				<Title
					size="xs"
					tAlign="start"
					color="var(--light0)"
					text="This site has been developed for educational purposes only."
				/>
				<Title
					size="xs"
					tAlign="end"
					color="var(--light0)"
					text="© 2024 Pizzushi. All rights reserved."
				/>
			</Container>
		</footer>
	);
};

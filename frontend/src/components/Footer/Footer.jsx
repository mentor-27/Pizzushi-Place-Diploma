import { Container } from '../Container/Container';
import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<Container roundedBottom>Footer</Container>
		</footer>
	);
};

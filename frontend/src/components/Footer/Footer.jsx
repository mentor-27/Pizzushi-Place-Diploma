import { Container } from '../UI/Container/Container';
import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footerBlock}>
			<Container roundedBottom></Container>
		</footer>
	);
};

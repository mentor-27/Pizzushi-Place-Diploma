import { Link } from 'react-router-dom';
import { Title } from '../UI';
import { Block } from '../UI/Block/Block';
import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footerBlock}>
			<Block py="16px" roundedBottom className={styles.footerContainer}>
				<Title
					size="xs"
					tAlign="start"
					color="var(--light0)"
					text="This site has been developed for educational purposes only."
				/>
				<Link to="https://result.school/">Result.University</Link>
				<Title
					size="xs"
					tAlign="end"
					color="var(--light0)"
					text="© 2024 Pizzushi. All rights reserved."
				/>
			</Block>
		</footer>
	);
};

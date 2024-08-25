import styles from './Input.module.css';

export const Input = ({ padding = '16px', ...props }) => {
	return <input className={styles.input} style={{ padding }} {...props}></input>;
};

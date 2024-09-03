import classNames from 'classnames/bind';

import styles from './Modal.module.css';

const cls = classNames.bind(styles);

export const Modal = ({ open = false, close, children }) => {
	return (
		<div className={cls('modalOverlay', { visible: open })} onClick={close}>
			{children}
		</div>
	);
};

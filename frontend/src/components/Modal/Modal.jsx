import classNames from 'classnames/bind';

import styles from './Modal.module.css';

const cls = classNames.bind(styles);

export const Modal = ({ open = false, close, children }) => {
	return (
		open && (
			<div className={cls({ modalOverlay: open })} onClick={close}>
				{open && children}
			</div>
		)
	);
};

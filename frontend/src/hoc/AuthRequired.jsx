import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectCurrentUser } from '../redux/selector';

export const AuthRequired = ({ children }) => {
	const { isAuth } = useSelector(selectCurrentUser);

	if (!isAuth) return <Navigate to="/403" />;

	return children;
};

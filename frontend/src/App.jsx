import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import {
	Authentication,
	Registration,
	Categories,
	Category,
	Checkout,
	Dashboard,
	Main,
	NotFound,
	Product,
	DUsers,
	DCategories,
	DProducts,
} from './pages';
import { Container, Footer, Header } from './components';
import { Drawer } from './components';
import { Scroller } from './components/UI';
import { setScroller } from './redux/actions';
import { selectCurrentUser } from './redux/selector';
import styles from './App.module.css';

export const App = () => {
	const dispatch = useDispatch();
	const [flag, setFlag] = useState(false);
	const user = useSelector(selectCurrentUser);

	document.onscroll = () => {
		if (window.scrollY > 600 && !flag) {
			dispatch(setScroller(true));
			setFlag(true);
		} else if (window.scrollY < 600 && flag) {
			dispatch(setScroller(false));
			setFlag(false);
		}
	};

	return (
		<Container
			className={styles.app}
			roundedTop
			roundedBottom
			px="0"
			py="0"
			mx="16px"
			my="16px"
		>
			<Routes>
				<Route
					element={
						<>
							<Header />
							<Outlet />
							<Footer />
							<Drawer />
						</>
					}
				>
					<Route index element={<Main />} />
					<Route path="/product/:id" element={<Product />} />
					<Route path="/categories" element={<Categories />} />
					<Route path="/categories/:slug" element={<Category />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route
						path="/login"
						element={user?.id ? <Navigate to="/" /> : <Authentication />}
					/>
					<Route
						path="/registration"
						element={user?.id ? <Navigate to="/" /> : <Registration />}
					/>
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Route>
				<Route path="/dashboard" element={<Dashboard />}>
					<Route path="users" element={<DUsers />} />
					<Route path="categories" element={<DCategories />} />
					<Route path="products" element={<DProducts />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
			<Scroller />
			<Toaster toastOptions={{ className: styles.toaster, position: 'bottom-center' }} />
		</Container>
	);
};

import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import {
	Authorization,
	Categories,
	Category,
	Checkout,
	Dashboard,
	Main,
	NotFound,
	Product,
} from './pages';
import { Container, Footer, Header } from './components';
import { Drawer } from './components';
import { Scroller } from './components/UI';
import { setScroller } from './redux/actions';
import { useState } from 'react';
import styles from './App.module.css';

export const App = () => {
	const dispatch = useDispatch();
	const [flag, setFlag] = useState(false);

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
		<Container roundedTop roundedBottom px="0" py="0" mx="auto" my="16px">
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
					<Route path="/login" element={<Authorization />} />
					<Route path="/404" element={<NotFound />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Route>
				<Route path="/dashboard" element={<Dashboard />}>
					<Route path="users" element={<div>users</div>} />
					<Route path="*" element={<div>Not Found</div>} />
				</Route>
			</Routes>
			<Scroller />
			<Toaster toastOptions={{ className: styles.toaster, position: 'bottom-center' }} />
		</Container>
	);
};

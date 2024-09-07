import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import * as pages from './pages';
import { AuthRequired } from './hoc/AuthRequired';
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
			px={0}
			py={0}
			mx={16}
			my={16}
			width="calc(100% - 32px)"
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
					<Route index element={<pages.Main />} />
					<Route path="/product/:id" element={<pages.Product />} />
					<Route path="/categories" element={<pages.Categories />} />
					<Route path="/categories/:slug" element={<pages.Category />} />
					<Route path="/checkout" element={<pages.Checkout />} />
					<Route
						path="/login"
						element={user?.id ? <Navigate to="/" /> : <pages.Authentication />}
					/>
					<Route
						path="/registration"
						element={user?.id ? <Navigate to="/" /> : <pages.Registration />}
					/>
					<Route path="/404" element={<pages.NotFound />} />
					<Route path="/403" element={<pages.Forbidden />} />
					<Route path="*" element={<Navigate to="/404" />} />
				</Route>
				<Route
					path="/dashboard"
					element={
						<AuthRequired>
							<pages.Dashboard />
						</AuthRequired>
					}
				>
					<Route path="users" element={<pages.DUsers />} />
					<Route path="categories" element={<pages.DCategories />} />
					<Route path="products" element={<pages.DProducts />} />
					<Route path="orders" element={<pages.DOrders />} />
					<Route path="*" element={<pages.NotFound />} />
				</Route>
			</Routes>
			<Scroller />
			<Toaster toastOptions={{ className: styles.toaster, position: 'bottom-center' }} />
		</Container>
	);
};

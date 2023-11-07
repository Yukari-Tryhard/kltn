import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';

import Header from './Header';

import routes from '../../routes/ProtectedRoutes';
import LoadingSpinner from '../../common/components/LoadingSpinner';

const Page404 = lazy(() => import('../../pages/error/NotFound'));

function PageContent() {
	const mainContentRef = useRef(null);
	const { pageTitle } = useSelector((state) => state.header);

	// Scroll back to top on new page load
	useEffect(() => {
		mainContentRef.current.scroll({
			top: 0,
			behavior: 'smooth'
		});
	}, [pageTitle]);

	return (
		<div className="drawer-content flex flex-col">
			<Header />
			<main className="flex-1 overflow-y-auto pt-4 px-6 bg-base-200" ref={mainContentRef}>
				<Suspense fallback={<LoadingSpinner />}>
					<Routes>
						{routes.map((route, key) => {
							return <Route key={key} exact={true} path={`${route.path}`} element={<route.component />} />;
						})}

						{/* Redirecting unknown url to 404 page */}
						<Route path="*" element={<Page404 />} />
					</Routes>
				</Suspense>
			</main>
		</div>
	);
}

export default PageContent;

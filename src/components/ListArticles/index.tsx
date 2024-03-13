import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { RootState } from '../../store';
import ArticleComponent from '../Article';
import { ARTICLE } from '../../saga/actionTypes';

type PropsPagination = {
	limit: number;
};

export default function ListArticles({ limit }: PropsPagination) {
	// export default function ListArticles() {
	const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
	const isLoading = useSelector(
		(state: RootState) => state.article.isLoading,
	);
	const { articles } = useSelector((state: RootState) => state.article);
	const dispatch = useDispatch();

	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean);
	const slug: string = pathSegments[0];
	const current: number =
		parseInt(pathSegments[pathSegments.length - 1]) || 1;
	const nameTag: string = pathSegments[1];

	const offset: number = (current - 1) * limit;

	useEffect(() => {
		if (slug === undefined || !isNaN(parseInt(slug))) {
			dispatch({
				type: ARTICLE.FETCH_ALL,
				payload: {
					filter: {
						offset,
						limit,
					},
				},
			});
		}

		if (slug === 'feed') {
			if (!auth) {
				<Navigate to='/login' replace={true} />;
			} else {
				dispatch({
					type: ARTICLE.FETCH_FOLLOW,
					payload: {
						filter: {
							offset,
							limit,
						},
					},
				});
			}
		}

		if (slug === 'tag' && isNaN(parseInt(nameTag))) {
			dispatch({
				type: ARTICLE.FETCH_ALL,
				payload: {
					filter: {
						tag: `${nameTag}`,
						offset,
						limit,
					},
				},
			});
		}
	}, [auth, dispatch, current, slug, limit, offset, nameTag]);

	return isLoading ? (
		<div className='d-flex justify-content-center'>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden mx-auto'>Loading...</span>
			</Spinner>
		</div>
	) : (
		<div className='articles'>
			{articles?.length ? (
				articles?.map((article) => (
					<ArticleComponent key={article.slug} {...article} />
				))
			) : (
				<p>There are no articles yet!!!</p>
			)}
		</div>
	);
}

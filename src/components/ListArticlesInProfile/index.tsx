import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useLocation, useParams } from 'react-router-dom';

import { RootState } from '../../store';
import { ARTICLE } from '../../saga/actionTypes';
import ArticleComponent from '../Article';

type ListArticlesInProfileProps = {
	filterType: 'Favorited' | 'MyArticles';
	limit: number;
};

export default function ListArticlesInProfile({
	filterType,
	limit,
}: ListArticlesInProfileProps) {
	const dispatch = useDispatch();
	const articles = useSelector((state: RootState) => state.article.articles);
	const isLoading = useSelector(
		(state: RootState) => state.article.isLoading,
	);
	const { username } = useParams();

	const location = useLocation();
	const pathSegments = location.pathname.split('/').filter(Boolean);
	const current: number =
		parseInt(pathSegments[pathSegments.length - 1]) || 1;

	const offset: number = (current - 1) * limit;

	useEffect(() => {
		const filterParam =
			filterType === 'Favorited'
				? { favorited: `${username}` }
				: { author: `${username}` };

		dispatch({
			type: ARTICLE.FETCH_ALL,
			payload: {
				filter: {
					...filterParam,
					offset: offset,
					limit: limit,
				},
			},
		});
	}, [dispatch, username, filterType, limit, offset]);

	return (
		<div className='articles p-6 m-6'>
			{isLoading ? (
				<div className='d-flex justify-content-center'>
					<Spinner animation='border' role='status'>
						<span className='visually-hidden mx-auto'>
							Loading...
						</span>
					</Spinner>
				</div>
			) : (
				<>
					{articles?.length ? (
						articles?.map((article) => (
							<ArticleComponent key={article.slug} {...article} />
						))
					) : (
						<p>
							{filterType === 'Favorited'
								? 'There are no favorited articles yet!!!'
								: 'There are no articles yet!!!'}
						</p>
					)}
				</>
			)}
		</div>
	);
}

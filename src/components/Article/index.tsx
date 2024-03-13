import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { Article } from '../../types/article';
import { ARTICLE } from '../../saga/actionTypes';
import { RootState } from '../../store';

export default function ArticleComponent(article: Article) {
	const [localFavorited, setLocalFavorited] = useState(article.favorited);
	const auth = useSelector((state: RootState) => state.auth.isLoggedIn);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleFavorited = () => {
		if (!auth) {
			navigate('/login');
		} else {
			setLocalFavorited(!localFavorited);
			dispatch({
				type: ARTICLE.TOGGLE_FAVORITE,
				payload: {
					favorited: article.favorited,
					slug: article.slug,
				},
			});
		}
	};

	return (
		<div className='shadow-sm p-3 mb-3 bg-body rounded border'>
			<div className='author d-flex justify-content-between align-items-start'>
				<Link
					to={`/profile/${article.author?.username}`}
					className='d-inline-flex gap-2 text-black text-secondary-hover text-decoration-none'
				>
					<Image
						src={article.author?.image}
						alt={article.author?.username}
						className='avatar-lg me-1'
						roundedCircle
					/>
					<div className='author__right'>
						<p className='fw-bold mb-0'>
							{article.author?.username}
						</p>
						<p className='text-secondary mb-1'>
							<small>
								{article.createdAt
									?.slice(0, 10)
									.split('-')
									.reverse()
									.join('.')}
							</small>
						</p>
					</div>
				</Link>
				<Button
					className={`border px-2 ${
						localFavorited
							? 'text-white bg-danger-90 bg-danger-hover border-danger-90 border-danger-hover'
							: 'bg-white text-secondary-90 text-danger-hover border-secondary-90 border-danger-hover'
					}`}
					onClick={handleFavorited}
				>
					<i className='fa-solid fa-heart'></i>
					<span className='ms-1'>{article.favoritesCount}</span>
				</Button>
			</div>
			<div className='content'>
				<Link
					to={`/article/${article.slug}`}
					className='text-black text-decoration-none'
				>
					<h3 className='article-title fs-5 font-bold'>
						{article.title}
					</h3>

					<p className='article-desc mb-3'>{article.description}</p>

					<div className='d-flex flex-wrap gap-1 mb-3'>
						{article.tagList?.map((tag, index) => (
							<small
								className='rounded border px-1 py-0 text-secondary'
								key={index}
							>
								{tag}
							</small>
						))}
					</div>

					<Button
						variant=''
						className='bg-primary-80 bg-primary-90-hover text-white'
					>
						Read more
					</Button>
				</Link>
			</div>
		</div>
	);
}

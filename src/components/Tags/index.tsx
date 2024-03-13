import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { RootState } from '../../store';
import { TAGS } from '../../saga/actionTypes';

export default function Tags() {
	const dispatch = useDispatch();

	const { tags, isLoading } = useSelector((state: RootState) => state.tags);

	useEffect(() => {
		if (!tags.length) {
			dispatch({
				type: TAGS.GET,
			});
		}
	}, []);

	return isLoading ? (
		<div className='d-flex justify-content-center'>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden mx-auto'>Loading...</span>
			</Spinner>
		</div>
	) : (
		<div className='tags d-flex flex-wrap gap-1'>
			{tags.map((tag, index) => (
				<Link
					to={`/tag/${tag}`}
					className='btn bg-primary-80 bg-primary-90-hover text-white'
					key={index}
				>
					{tag}
				</Link>
			))}
		</div>
	);
}

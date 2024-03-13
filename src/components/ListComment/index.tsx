import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

import { RootState } from '../../store';
import { COMMENT } from '../../saga/actionTypes';
import CommentComponent from '../Comment';

export default function ListComments() {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const { comments } = useSelector((state: RootState) => state.comment);

	useEffect(() => {
		dispatch({
			type: COMMENT.FETCH,
			payload: {
				slug: `${slug}`,
			},
		});
	}, [slug, dispatch]);

	return (
		<>
			{comments?.map((comment) => (
				<CommentComponent key={comment.id} {...comment} />
			))}
		</>
	);
}

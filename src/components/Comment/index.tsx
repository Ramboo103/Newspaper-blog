import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Button, Image, Spinner } from 'react-bootstrap';

import { COMMENT } from '../../saga/actionTypes';
import { Comment } from '../../types/comment';
import { RootState } from '../../store';

export default function CommentComponent(comment: Comment) {
	const dispatch = useDispatch();
	const { slug } = useParams();
	const currentUsername = localStorage.getItem('username');

	const loading = useSelector((state: RootState) => state.comment.loading);

	const handleDeleteComment = (id: number) => {
		dispatch({
			type: COMMENT.DELETE,
			payload: {
				slug: `${slug}`,
				id: id,
			},
		});
	};

	return loading ? (
		<div className='d-flex justify-content-center'>
			<Spinner animation='border' role='status'>
				<span className='visually-hidden mx-auto'>Loading...</span>
			</Spinner>
		</div>
	) : (
		<div className='comment-list'>
			<div
				key={comment.id}
				className='comment-item d-flex gap-2 justify-content-start align-items-start rounded p-2 shadow-sm border mb-2'
			>
				<Image
					src={`${comment.author.image}`}
					alt={`${comment.author.username}`}
					title={`${comment.author.username}`}
					className='avatar'
					roundedCircle
				/>

				<div className='w-100'>
					<p className='fw-bold mb-1'>{comment.author.username}</p>
					<p className='comment-content mb-0'>{comment.body}</p>
					<div className='comment-delete d-flex justify-content-end'>
						{comment.author.username === currentUsername && (
							<Button
								variant=''
								className='text-danger-80 text-danger-hover p-0'
								title='delete'
								onClick={() => handleDeleteComment(comment.id)}
							>
								<i className='fa-solid fa-trash-can'></i>
							</Button>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

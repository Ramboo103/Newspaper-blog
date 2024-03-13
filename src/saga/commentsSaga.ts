import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

import axiosInstance from '../service/request';
import { Comment } from '../types/comment';
import {
	fetchCommentStart,
	fetchCommentSuccess,
	commentFailure,
	createCommentStart,
	createCommentSuccess,
	createCommentFailure,
	deleteComment,
} from '../reducers/commentsSlice';
import { COMMENT } from './actionTypes';
import { getTokenFromLocalStorage } from '../service/localStorage';

type ResponseComment = {
	data: {
		comment: Comment;
	};
};

type Response = {
	data: {
		comments: Comment[];
	};
};

type Action = {
	type: string;
	payload: {
		slug: string;
	};
};

type ActionCreate = {
	type: string;
	payload: {
		slug: string;
		comment: {
			body: string;
		};
	};
};

type ActionDelete = {
	type: string;
	payload: {
		slug: string;
		id: number;
	};
};

function* commentsSliceSaga(action: Action) {
	try {
		yield put(fetchCommentStart());

		const { slug } = action.payload;

		const response: Response = yield call(() =>
			axiosInstance.get(`/articles/${slug}/comments`),
		);

		if (response) {
			yield put(fetchCommentSuccess(response.data.comments));
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			yield put(commentFailure(error.message));
		}
	}
}

function* createCommentSaga(action: ActionCreate) {
	try {
		yield put(createCommentStart());
		if (getTokenFromLocalStorage() && getTokenFromLocalStorage() !== null) {
			const slug = action.payload.slug;
			const response: ResponseComment = yield call(() =>
				axiosInstance.post(
					`/articles/${slug}/comments`,
					action.payload,
				),
			);

			if (response) {
				yield put(createCommentSuccess(response.data.comment));
			} else {
				yield put(createCommentFailure('Comment failed'));
			}
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			yield put(createCommentFailure(error.message));
		}
	}
}

function* deleteCommentSaga(action: ActionDelete) {
	try {
		if (getTokenFromLocalStorage() && getTokenFromLocalStorage() !== null) {
			const { slug, id } = action.payload;

			const response: Comment = yield call(() =>
				axiosInstance.delete(`/articles/${slug}/comments/${id}`),
			);

			if (response) {
				yield put(deleteComment(id));
			} else {
				yield put(commentFailure('Comment failed'));
			}
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			yield put(commentFailure(error.message));
		}
	}
}

export default function* watchCommentsSaga() {
	yield takeLatest(COMMENT.FETCH, commentsSliceSaga);
	yield takeLatest(COMMENT.CREATE, createCommentSaga);
	yield takeLatest(COMMENT.DELETE, deleteCommentSaga);
}

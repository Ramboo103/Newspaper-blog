import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../types/comment';

type CommentState = {
	comments: Comment[];
	loading: boolean;
	error: string | null;
};

const initialState: CommentState = {
	comments: [],
	loading: true,
	error: null,
};

const commentsSlice = createSlice({
	name: 'comment',
	initialState,
	reducers: {
		fetchCommentStart: (state: CommentState) => {
			state.loading = true;
			state.error = null;
		},
		fetchCommentSuccess: (
			state: CommentState,
			action: PayloadAction<Comment[]>,
		) => {
			state.loading = false;
			state.comments = action.payload;
		},
		commentFailure: (
			state: CommentState,
			action: PayloadAction<string>,
		) => {
			state.loading = false;
			state.error = action.payload;
		},
		createCommentStart(state: CommentState) {
			state.error = null;
			state.loading = true;
		},
		createCommentSuccess(
			state: CommentState,
			action: PayloadAction<Comment>,
		) {
			state.comments.push(action.payload);
			state.error = null;
			state.loading = false;
		},
		createCommentFailure(
			state: CommentState,
			action: PayloadAction<string>,
		) {
			state.error = action.payload;
			state.loading = false;
		},
		deleteComment: (state: CommentState, action: PayloadAction<number>) => {
			state.comments = state.comments.filter(
				(comment) => comment.id !== action.payload,
			);
		},
	},
});

export const {
	fetchCommentStart,
	fetchCommentSuccess,
	commentFailure,
	createCommentStart,
	createCommentSuccess,
	createCommentFailure,
	deleteComment,
} = commentsSlice.actions;
export default commentsSlice.reducer;

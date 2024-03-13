import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Tags } from '../types/tags';

type TagsState = {
	tags: Tags;
	error: string | null;
	isLoading: boolean;
};

const initialState: TagsState = {
	tags: [],
	error: null,
	isLoading: true,
};

const tagsSlice = createSlice({
	name: 'tags',
	initialState,
	reducers: {
		setTagsStart(state: TagsState) {
			state.error = null;
			state.isLoading = true;
		},
		setTagsSuccess(state: TagsState, action: PayloadAction<Tags>) {
			state.tags = action.payload;
			state.error = null;
			state.isLoading = false;
		},
		setTagsFailure(state: TagsState, action: PayloadAction<string>) {
			state.error = action.payload;
			state.isLoading = false;
		},
	},
});

export const { setTagsStart, setTagsSuccess, setTagsFailure } =
	tagsSlice.actions;
export default tagsSlice.reducer;

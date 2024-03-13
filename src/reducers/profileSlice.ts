import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { Author } from '../types/user';

type AccountState = {
	Profile: Author;
	loading: boolean;
	error: string | null;
};

const initialState: AccountState = {
	Profile: {
		username: '',
		bio: null,
		image: '',
		following: false,
	},
	loading: false,
	error: null,
};

const accountSlice = createSlice({
	name: 'profile',
	initialState,
	reducers: {
		fetchProfileStart: (state) => {
			state.loading = true;
			state.error = null;
		},
		fetchProfileSuccess: (state, action: PayloadAction<Author>) => {
			state.loading = false;
			state.Profile = action.payload;
		},
		fetchProfileFailure: (state, action: PayloadAction<string>) => {
			state.loading = false;
			state.error = action.payload;
		},
		toggleFollowProfile: (state, action: PayloadAction<Author>) => {
			const profile = current(state.Profile);
			if (profile.username === action.payload.username) {
				state.Profile = action.payload;
			}
		},
	},
});

export const {
	fetchProfileStart,
	fetchProfileSuccess,
	fetchProfileFailure,
	toggleFollowProfile,
} = accountSlice.actions;
export default accountSlice.reducer;

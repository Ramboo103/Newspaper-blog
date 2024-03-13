import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { User } from '../types/user';

export type authState = {
	user: User | null;
	isLoggedIn: boolean;
	isLogInSuccess: boolean | null;
	isRegisterSuccess: boolean | null;
	isFetchSuccess: boolean;
	isEditSuccess: boolean | null;
	isLoading: boolean;
	token: string | null;
	error: string | null;
};

const initialState: authState = {
	user: {
		email: '',
		token: '',
		username: '',
		bio: '',
		image: '',
		following: false,
	},
	isLoggedIn: !!localStorage.getItem('token'),
	isLogInSuccess: null,
	isRegisterSuccess: null,
	isFetchSuccess: false,
	isEditSuccess: null,
	isLoading: false,
	token: localStorage.getItem('token') || null,
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOut: (state: authState) => {
			state.isLoggedIn = false;
		},
		logInStart(state: authState) {
			state.isLogInSuccess = null;
			state.isLoading = true;
			state.error = null;
		},
		loginSuccess: (state: authState, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isLoggedIn = true;
			state.isLogInSuccess = true;
			state.error = null;
			state.isLoading = false;
		},
		loginFailure: (state: authState, action: PayloadAction<string>) => {
			state.isLoggedIn = false;
			state.isLogInSuccess = false;
			state.error = action.payload;
			state.user = null;
			state.isLoading = false;
		},
		registerStart(state: authState) {
			state.isRegisterSuccess = null;
			state.isLoading = true;
			state.error = null;
		},
		registerSuccess: (state: authState, action: PayloadAction<User>) => {
			state.user = action.payload;
			state.isRegisterSuccess = true;
			state.error = null;
			state.isLoggedIn = true;
			state.isLoading = false;
		},
		registerFailure: (state: authState, action: PayloadAction<string>) => {
			state.user = null;
			state.error = action.payload;
			state.isRegisterSuccess = false;
			state.isLoggedIn = false;
			state.isLoading = false;
		},
		fetchAuthStart(state) {
			state.error = null;
		},
		fetchAuthSuccess(state: authState, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isFetchSuccess = true;
		},
		fetchAuthFailure(state: authState, action: PayloadAction<string>) {
			state.error = action.payload;
			state.isFetchSuccess = false;
		},
		editAuthStart(state: authState) {
			state.isEditSuccess = null;
			state.isLoading = true;
			state.error = null;
		},
		editAuthSuccess(state: authState, action: PayloadAction<User>) {
			state.user = action.payload;
			state.isEditSuccess = true;
			state.isLoading = false;
			state.error = null;
		},
		editAuthFailure(state: authState, action: PayloadAction<string>) {
			state.error = action.payload;
			state.isEditSuccess = false;
			state.isLoading = false;
		},
	},
});

export const {
	logOut,
	logInStart,
	loginSuccess,
	loginFailure,
	registerStart,
	registerSuccess,
	registerFailure,
	fetchAuthStart,
	fetchAuthSuccess,
	fetchAuthFailure,
	editAuthStart,
	editAuthSuccess,
	editAuthFailure,
} = authSlice.actions;
export default authSlice.reducer;

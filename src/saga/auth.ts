import { takeLatest, call, put } from 'redux-saga/effects';
import axios, { AxiosError } from 'axios';

import axiosInstance from '../service/request';
import {
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
} from '../reducers/auth';
import { User } from '../types/user';
import { AUTH } from './actionTypes';
import {
	removeTokenToLocalStorage,
	saveTokenToLocalStorage,
	getTokenFromLocalStorage,
	saveUserNameToLocalStorage,
	removeUsernameFromLocalStorage,
	saveImageToLocalStorage,
	removeImageFromLocalStorage,
} from '../service/localStorage';

type ActionLogin = {
	type: string;
	payload: {
		user: {
			email: string;
			password: string;
		};
	};
};

type ActionRegister = {
	type: string;
	payload: {
		user: {
			username: string;
			email: string;
			password: string;
		};
	};
};

type ActionEdit = {
	type: string;
	payload: {
		user: {
			email: string;
			password: string;
			username: string;
			bio: string;
			image: string;
		};
	};
};

type Response = {
	data: {
		user: User;
	};
};

function* logoutSaga() {
	removeTokenToLocalStorage();
	removeUsernameFromLocalStorage();
	removeImageFromLocalStorage();
	yield put(logOut());
}

function* loginUserSaga(action: ActionLogin) {
	try {
		yield put(logInStart());
		const response: Response = yield call(() =>
			axiosInstance.post('/users/login', action.payload),
		);

		if (response.data.user) {
			yield put(loginSuccess(response.data.user));
			const token: string = response.data.user.token;
			const username: string = response.data.user.username;
			const image: string = response.data.user.image;
			saveUserNameToLocalStorage(username);
			saveTokenToLocalStorage(token);
			saveImageToLocalStorage(image);
			getTokenFromLocalStorage();
		} else {
			yield put(loginFailure('An Unexpected Error Occurred!!!'));
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error?.isAxiosError && !error?.response) {
				yield put(
					loginFailure('Please Check Your Internet and Try Again.'),
				);
			} else if (error.response?.data?.errors) {
				for (const key in error.response.data.errors) {
					const errorMessage = `${
						key.charAt(0).toUpperCase() + key.slice(1)
					} ${error.response.data.errors[key][0]}`;
					yield put(loginFailure(errorMessage));
				}
			} else {
				yield put(loginFailure('An Unexpected Error Occurred!!!'));
			}
		}
	}
}

function* registerUserSaga(action: ActionRegister) {
	try {
		yield put(registerStart());
		const response: Response = yield call(() =>
			axiosInstance.post('/users/', action.payload),
		);

		if (response.data.user) {
			const token: string = response.data.user.token;
			saveTokenToLocalStorage(token);
			const username: string = response.data.user.username;
			saveUserNameToLocalStorage(username);
			const image: string = response.data.user.image;
			saveImageToLocalStorage(image);

			yield put(registerSuccess(response.data.user));
		} else {
			yield put(registerFailure('Something went wrong!!!'));
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error?.isAxiosError && !error?.response) {
				yield put(
					registerFailure(
						'Please Check Your Internet and Try Again.',
					),
				);
			} else if (error.response?.data?.errors) {
				for (const key in error.response.data.errors) {
					const errorMessage = `${
						key.charAt(0).toUpperCase() + key.slice(1)
					} ${error.response.data.errors[key][0]}`;
					yield put(registerFailure(errorMessage));
				}
			} else {
				yield put(registerFailure('An Unexpected Error Occurred!!!'));
			}
		}
	}
}

function* fetchDataSaga() {
	try {
		yield put(fetchAuthStart());
		const response: Response = yield call(() => axiosInstance.get('/user'));

		if (response) {
			yield put(fetchAuthSuccess(response.data.user));
		} else {
			yield put(fetchAuthFailure('Something went wrong!'));
		}
	} catch (error) {
		if (axios.isAxiosError(error)) {
			yield put(fetchAuthFailure(error.message));
		}
	}
}

function* editDataSaga(action: ActionEdit) {
	try {
		yield put(editAuthStart());
		const response: Response = yield call(() =>
			axiosInstance.put('/user', action.payload),
		);

		if (response.data.user.username) {
			yield put(editAuthSuccess(response.data.user));
			saveTokenToLocalStorage(response.data.user.token);
			saveUserNameToLocalStorage(response.data.user.username);
			saveImageToLocalStorage(response.data.user.image);
		} else {
			yield put(editAuthFailure('An Unexpected Error Occurred!!!'));
		}
	} catch (error) {
		if (error instanceof AxiosError) {
			if (error?.isAxiosError && !error?.response) {
				yield put(
					editAuthFailure(
						'Please Check Your Internet and Try Again.',
					),
				);
			} else if (error.response?.data?.errors) {
				for (const key in error.response.data.errors) {
					const errorMessage = `${
						key.charAt(0).toUpperCase() + key.slice(1)
					} ${error.response.data.errors[key][0]}`;
					yield put(editAuthFailure(errorMessage));
				}
			} else {
				yield put(editAuthFailure('An Unexpected Error Occurred!!!'));
			}
		}
	}
}

export default function* watchUser() {
	yield takeLatest(AUTH.LOGOUT, logoutSaga);
	yield takeLatest(AUTH.LOGIN, loginUserSaga);
	yield takeLatest(AUTH.REGISTER, registerUserSaga);
	yield takeLatest(AUTH.SET, fetchDataSaga);
	yield takeLatest(AUTH.EDIT, editDataSaga);
}

export const removeTokenToLocalStorage = (): void => {
	localStorage.removeItem('token');
};

export const saveTokenToLocalStorage = (token: string): void => {
	localStorage.setItem('token', token);
};

export const getTokenFromLocalStorage = (): string | null => {
	return localStorage.getItem('token');
};

export const saveUserNameToLocalStorage = (username: string): void => {
	localStorage.setItem('username', username);
};

export const removeUsernameFromLocalStorage = (): void => {
	localStorage.removeItem('username');
};
export const saveImageToLocalStorage = (image: string): void => {
	localStorage.setItem('image', image);
};

export const removeImageFromLocalStorage = (): void => {
	localStorage.removeItem('image');
};

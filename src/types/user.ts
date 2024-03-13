export type Author = {
	username: string;
	bio: string | null;
	image: string;
	following: boolean;
};
export type User = {
	username: string;
	bio: string | null;
	image: string;
	following?: boolean;
	email?: string;
	password?: string | null;
	token: string;
};

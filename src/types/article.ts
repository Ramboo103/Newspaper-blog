export type Author = {
	username: string;
	bio: string | null;
	image: string;
	following: boolean;
};

export type Article = {
	slug?: string;
	title: string;
	description: string;
	body: string;
	tagList?: string[];
	createdAt?: string;
	updatedAt?: string;
	favorited?: boolean;
	favoritesCount: number;
	author?: Author;
};

export type Articles = {
	articles: Article[];
	articlesCount: number;
};

export type Filters = {
	tag?: string;
	author?: string;
	favorited?: string;
	limit?: number;
	offset?: number;
};

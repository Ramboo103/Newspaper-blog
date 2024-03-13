import { Author } from './user';

export type Comment = {
	id: number;
	createdAt: string;
	updatedAt: string;
	body: string;
	author: Author;
};

import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import { Article } from "../types/article";
import { Author } from "../types/user";

export type ArticlesState = {
  slug: string;
  articles: Article[];
  article: Article;
  articlesCount: number;
  isLoading: boolean;
  isFetchSuccess: boolean;
  isPostSuccess: boolean | null;
  isEditSuccess: boolean | null;
  error: string | null;
};

type ArticleFetch = {
  articles: Article[];
  articlesCount: number;
};

type ArticleFetchOne = {
  article: Article;
};

type ArticleEdit = {
  title: string;
  description: string;
  body: string;
  favoritesCount: number;
};

type ArticlePost = {
  title: string;
  description: string;
  body: string;
  favoritesCount: number;
  tagList: [string];
};

const initialState: ArticlesState = {
  articles: [],
  articlesCount: 0,
  article: {
    slug: "",
    title: "",
    description: "",
    body: "",
    tagList: [],
    createdAt: "",
    updatedAt: "",
    favorited: false,
    favoritesCount: 0,
    author: {
      username: "",
      bio: null,
      image: "",
      following: false,
    },
  },
  isLoading: false,
  isFetchSuccess: false,
  isPostSuccess: null,
  isEditSuccess: null,
  error: null,
  slug: "",
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    fetchArticleStart(state: ArticlesState) {
      state.error = null;
      state.isLoading = true;
      state.articles = [];
      state.articlesCount = 0;
    },
    fetchArticleSuccess(
      state: ArticlesState,
      action: PayloadAction<ArticleFetch>
    ) {
      const { articles, articlesCount } = action.payload;
      state.articles = articles;
      state.articlesCount = articlesCount;
      state.isLoading = false;
      state.isFetchSuccess = true;
    },
    fetchArticleFailure(state: ArticlesState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isLoading = false;
      state.isFetchSuccess = false;
      state.articles = [];
      state.articlesCount = 0;
    },
    fetchOneArticleStart(state: ArticlesState) {
      state.error = null;
      state.isLoading = true;
      state.article = {
        slug: "",
        title: "",
        description: "",
        body: "",
        tagList: [],
        createdAt: "",
        updatedAt: "",
        favorited: false,
        favoritesCount: 0,
        author: {
          username: "",
          bio: null,
          image: "",
          following: false,
        },
      };
    },
    fetchOneArticleSuccess(
      state: ArticlesState,
      action: PayloadAction<ArticleFetchOne>
    ) {
      const article = action.payload.article;
      state.article = article;
      state.isLoading = false;
      state.isFetchSuccess = true;
    },
    fetchOneArticleFailure(
      state: ArticlesState,
      action: PayloadAction<string>
    ) {
      state.error = action.payload;
      state.isLoading = false;
      state.isFetchSuccess = false;
    },
    postArticleStart(state: ArticlesState) {
      state.isPostSuccess = null;
      state.error = null;
      state.isLoading = true;
    },
    postArticleSuccess(
      state: ArticlesState,
      action: PayloadAction<ArticlePost>
    ) {
      state.article = action.payload;
      state.isPostSuccess = true;
      state.isLoading = false;
    },
    postArticleFailure(state: ArticlesState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isPostSuccess = false;
      state.isLoading = false;
    },
    editArticleStart(state: ArticlesState) {
      state.isEditSuccess = null;
      state.error = null;
      state.isLoading = true;
    },
    editArticleSuccess(
      state: ArticlesState,
      action: PayloadAction<ArticleEdit>
    ) {
      state.article = action.payload;
      state.isEditSuccess = true;
      state.isLoading = false;
    },
    editArticleFailure(state: ArticlesState, action: PayloadAction<string>) {
      state.error = action.payload;
      state.isEditSuccess = false;
      state.isLoading = false;
    },
    toggleFavorite(state: ArticlesState, action: PayloadAction<Article>) {
      const articles = current(state.articles);

      state.articles = articles.map((article) => {
        if (article.slug === action.payload.slug) {
          article = action.payload;
        }

        return article;
      });
    },
    toggleOneFavorite(state: ArticlesState, action: PayloadAction<Article>) {
      const article = current(state.article);
      if (article.slug === action.payload.slug) {
        state.article = action.payload;
      }
    },
    toggleFollow(state: ArticlesState, action: PayloadAction<Author>) {
      const author = current(state.article.author);
      if (author?.username === action.payload.username) {
        state.article.author = action.payload;
      }
    },
  },
});

export const {
  fetchArticleStart,
  fetchArticleSuccess,
  fetchArticleFailure,
  fetchOneArticleStart,
  fetchOneArticleSuccess,
  fetchOneArticleFailure,
  editArticleStart,
  editArticleSuccess,
  editArticleFailure,
  postArticleStart,
  postArticleSuccess,
  postArticleFailure,
  toggleFavorite,
  toggleOneFavorite,
  toggleFollow,
} = articleSlice.actions;

export default articleSlice.reducer;

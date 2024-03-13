import { takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosError } from "axios";
import queryString from "query-string";

import axiosInstance from "../service/request";
import {
  fetchArticleStart,
  fetchArticleSuccess,
  fetchArticleFailure,
  editArticleStart,
  editArticleSuccess,
  editArticleFailure,
  postArticleStart,
  postArticleSuccess,
  postArticleFailure,
  toggleFavorite,
  fetchOneArticleStart,
  fetchOneArticleSuccess,
  fetchOneArticleFailure,
  toggleOneFavorite,
  toggleFollow,
} from "../reducers/articlesSlice";
import { Article, Filters } from "../types/article";
import { ARTICLE } from "./actionTypes";
import { Author } from "../types/user";

type Action = {
  type: string;
  payload: {
    filter: Filters;
    slug: string;
  };
};

type ActionEdit = {
  type: string;
  payload: {
    slug: string;
    article: {
      title: string;
      description: string;
      body: string;
    };
  };
};

type ActionPost = {
  type: string;
  payload: {
    title: string;
    description: string;
    body: string;
    favoritesCount: number;
    tagList: [string];
  };
};

type ActionDelete = {
  type: string;
  payload: {
    slug: string;
  };
};

type ActionFavorite = {
  type: string;
  payload: {
    favorited: boolean;
    slug: string;
  };
};

type ActionFollowing = {
  type: string;
  payload: {
    username: string;
    following: boolean;
  };
};

type Response = {
  data: {
    articles: Article[];
    articlesCount: number;
  };
};

type ResponseOne = {
  data: {
    article: Article;
  };
};

type ResponseFollow = {
  data: {
    profile: Author;
  };
};

type ResponsePost = {
  data: {
    article: {
      title: string;
      description: string;
      body: string;
      favoritesCount: number;
      tagList: [string];
    };
  };
};

function* fetchFollowArticlesSaga(action: Action) {
  try {
    yield put(fetchArticleStart());

    let url = "/articles/feed";

    const filter = action.payload?.filter || null;

    if (filter && Object.keys(filter).length > 0) {
      const queryParams = queryString.stringify({
        offset: filter.offset,
        limit: filter.limit,
      });

      url += `?${queryParams}`;
    }

    const response: Response = yield axiosInstance.get(url);

    if (response) {
      yield put(fetchArticleSuccess(response.data));
    } else {
      yield put(fetchArticleFailure("Error"));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(fetchArticleFailure(error.message));
    }
  }
}

function* fetchAllArticlesSaga(action: Action) {
  try {
    yield put(fetchArticleStart());

    let url = "/articles";

    const filter = action.payload?.filter || null;

    if (filter && Object.keys(filter).length > 0) {
      const queryParams = queryString.stringify({
        tag: filter.tag,
        author: filter.author,
        favorited: filter.favorited,
        offset: filter.offset,
        limit: filter.limit,
      });

      url += `?${queryParams}`;
    }

    const response: Response = yield call(() => axiosInstance.get(url));

    if (response) {
      yield put(fetchArticleSuccess(response.data));
    } else {
      yield put(fetchArticleFailure("Error"));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(fetchArticleFailure(error.message));
    }
  }
}

function* fetchOneArticlesSaga(action: Action) {
  try {
    yield put(fetchOneArticleStart());

    const slug = action.payload.slug;

    const response: ResponseOne = yield axiosInstance.get(`/articles/${slug}`);

    yield put(fetchOneArticleSuccess(response.data));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(fetchOneArticleFailure(error.message));
    }
  }
}

function* editArticleSaga(action: ActionEdit) {
  try {
    yield put(editArticleStart());
    const slug = action.payload.slug;
    const response: ResponseOne = yield call(() =>
      axiosInstance.put(`/articles/${slug}`, action.payload)
    );

    if (response.data.article) {
      yield put(editArticleSuccess(response.data.article));
    } else {
      yield put(editArticleFailure("An Unexpected Error Occurred!!!"));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.isAxiosError && !error?.response) {
        yield put(
          editArticleFailure("Please Check Your Internet and Try Again.")
        );
      } else if (error.response?.data?.errors) {
        for (const key in error.response.data.errors) {
          const errorMessage = `${key.charAt(0).toUpperCase() + key.slice(1)} ${
            error.response.data.errors[key][0]
          }`;
          yield put(editArticleFailure(errorMessage));
        }
      } else {
        yield put(editArticleFailure("An Unexpected Error Occurred!!!"));
      }
    }
  }
}

function* postArticleSaga(action: ActionPost) {
  try {
    yield put(postArticleStart());
    const response: ResponsePost = yield call(() =>
      axiosInstance.post("/articles/", action.payload)
    );

    if (response.data.article) {
      yield put(postArticleSuccess(response.data.article));
    } else {
      yield put(postArticleFailure("An Unexpected Error Occurred!!!"));
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error?.isAxiosError && !error?.response) {
        yield put(
          postArticleFailure("Please Check Your Internet and Try Again.")
        );
      } else if (error.response?.data?.errors) {
        for (const key in error.response.data.errors) {
          const errorMessage = `${key.charAt(0).toUpperCase() + key.slice(1)} ${
            error.response.data.errors[key][0]
          }`;
          yield put(postArticleFailure(errorMessage));
        }
      } else {
        yield put(postArticleFailure("An Unexpected Error Occurred!!!"));
      }
    }
  }
}

function* deleteArticleSaga(action: ActionDelete) {
  const slug = action.payload.slug;
  yield axiosInstance.delete(`/articles/${slug}`);
}

function* toggleFavoriteSaga(action: ActionFavorite) {
  try {
    const { favorited, slug } = action.payload;

    const method: string = favorited ? "delete" : "post";

    const response: ResponseOne = yield call(() =>
      axiosInstance({
        method,
        url: `/articles/${slug}/favorite`,
      })
    );

    if (response.data.article) {
      yield put(toggleFavorite(response.data.article));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // yield put(setFavoritesError(error.message));
    }
  }
}

function* toggleOneFavoriteSaga(action: ActionFavorite) {
  try {
    const { favorited, slug } = action.payload;

    const method: string = favorited ? "delete" : "post";

    const response: ResponseOne = yield call(() =>
      axiosInstance({
        method,
        url: `/articles/${slug}/favorite`,
      })
    );

    if (response.data.article) {
      yield put(toggleOneFavorite(response.data.article));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // yield put(setFavoritesError(error.message));
    }
  }
}

function* toggleFollowSaga(action: ActionFollowing) {
  try {
    const { username, following } = action.payload;
    const method: string = following ? "delete" : "post";

    const response: ResponseFollow = yield call(() =>
      axiosInstance({
        method,
        url: `/profiles/${username}/follow`,
      })
    );

    if (response.data) {
      yield put(toggleFollow(response.data.profile));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      //   yield put(fetchProfileFailure(error.message));
    }
  }
}

export default function* watchArticles() {
  yield takeLatest(ARTICLE.FETCH_FOLLOW, fetchFollowArticlesSaga);
  yield takeLatest(ARTICLE.FETCH_ALL, fetchAllArticlesSaga);
  yield takeLatest(ARTICLE.FETCH, fetchOneArticlesSaga);
  yield takeLatest(ARTICLE.POST, postArticleSaga);
  yield takeLatest(ARTICLE.EDIT, editArticleSaga);
  yield takeLatest(ARTICLE.DELETE, deleteArticleSaga);
  yield takeLatest(ARTICLE.TOGGLE_FAVORITE, toggleFavoriteSaga);
  yield takeLatest(ARTICLE.TOGGLE_ONE_FAVORITE, toggleOneFavoriteSaga);
  yield takeLatest(ARTICLE.TOGGLE_FOLLOW, toggleFollowSaga);
}

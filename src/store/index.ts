import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../saga/rootSagaWatcher';
import authReducer from '../reducers/auth';
import profileReducer from '../reducers/profileSlice';
import tagsReducer from '../reducers/tagsSlice';
import articlesReducer from '../reducers/articlesSlice';
import commentsReducer from '../reducers/commentsSlice';

const sagaMiddleware = createSagaMiddleware();

export const rootStore = configureStore({
	reducer: {
		auth: authReducer,
		profile: profileReducer,
		tags: tagsReducer,
		article: articlesReducer,
		comment: commentsReducer,
	},
	middleware: (defaultMiddleware) => [
		...defaultMiddleware({ thunk: false }),
		sagaMiddleware,
	],
});

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootStore.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof rootStore.dispatch;

import { all, fork } from 'redux-saga/effects';
import watchFetchUserData from './profileSaga';
import watchUser from './auth';
import watchGetTags from './tagsSaga';
import watchCommentsSaga from './commentsSaga';
import watchArticles from './articlesSaga';

export default function* rootSaga() {
	yield all([
		fork(watchFetchUserData),
		fork(watchUser),
		fork(watchGetTags),
		fork(watchCommentsSaga),
		fork(watchArticles),
	]);
}

import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";

import axiosInstance from "../service/request";
import { Author } from "../types/user";
import {
  fetchProfileStart,
  fetchProfileSuccess,
  fetchProfileFailure,
  toggleFollowProfile,
} from "../reducers/profileSlice";
import { PROFILE } from "./actionTypes";

type Response = {
  status: number;
  data: {
    profile: Author;
  };
};

type ResponseFollow = {
  data: {
    profile: Author;
  };
};

type Action = {
  type: string;
  payload: Author;
};

type Following = {
  username: string;
  following: boolean;
};

type ActionFollowing = {
  type: string;
  payload: Following;
};

function* fetchProfileSaga(action: Action) {
  try {
    yield put(fetchProfileStart());

    const { username } = action.payload;

    const response: Response = yield call(
      axiosInstance.get,
      `/profiles/${username}`
    );

    yield put(fetchProfileSuccess(response.data.profile));
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(fetchProfileFailure(error.message));
      throw error;
    }
  }
}

function* toggleFlowProfileSaga(action: ActionFollowing) {
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
      yield put(toggleFollowProfile(response.data.profile));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(fetchProfileFailure(error.message));
    }
  }
}

export default function* watchFetchUserData() {
  yield takeLatest(PROFILE.FETCH, fetchProfileSaga);
  yield takeLatest(PROFILE.TOGGLE_FOLLOW, toggleFlowProfileSaga);
}

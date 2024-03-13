import { takeLatest, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  setTagsStart,
  setTagsSuccess,
  setTagsFailure,
} from "../reducers/tagsSlice";
import axiosInstance from "../service/request";
import { Tags } from "../types/tags";
import { TAGS } from "./actionTypes";

type ResponseTags = {
  data: {
    tags: Tags;
  };
};

function* getTagsSaga() {
  try {
    yield put(setTagsStart());

    const response: ResponseTags = yield call(() => axiosInstance.get("/tags"));

    if (response) {
      yield put(setTagsSuccess(response.data.tags));
    } else {
      yield put(setTagsFailure("Something went wrong!"));
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      yield put(setTagsFailure(error.message));
    }
  }
}

export default function* watchGetTags() {
  yield takeLatest(TAGS.GET, getTagsSaga);
}

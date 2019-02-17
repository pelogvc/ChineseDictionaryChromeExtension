import { all } from "redux-saga/effects";
import recently from './Recently';

export default function* root() {
    yield all([
        recently(),
    ]);
}
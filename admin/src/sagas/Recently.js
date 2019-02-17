import { takeLatest, put, call, all } from "redux-saga/effects";
import db from "lib/db";
//import { delay } from 'redux-saga';

import {
    LIST_REQUEST,
    LIST_SUCCESS,
    LIST_FAILURE,
    LIST_CURRENT_PAGE,
} from 'store/Recently';

// 리스트 읽어오기
export function* getList(action) {

    try{
        /*
        const [list, count] = yield all([
            call(db.getRecentlyList, action.payload),
            call(db.getRecentlyPages, action.payload)
        ]);
        */
       const [list, count] = yield all([
        call(db.getRecentlyListAll, action.payload),
        call(db.getRecentlyPages, action.payload)
       ]);
        
        yield put({ type: LIST_SUCCESS, payload : {list, count} });

    } catch (e) {
        console.log('단어장 리스트를 불러오는데 문제가 생겼습니다.');
        yield put({ type: LIST_FAILURE });
    }
}

// 현재 페이지 변경하기
export function* changeCurrentPage(action) {
    yield put({ type: LIST_REQUEST, payload: action.payload });
}

export default function* recently() {
    //yield takeLatest(LIST_REQUEST, getList);
    //yield takeEvery(LIST_CURRENT_PAGE, changeCurrentPage);
    yield all([
        takeLatest(LIST_REQUEST, getList),
        takeLatest(LIST_CURRENT_PAGE, changeCurrentPage),
    ]);
}
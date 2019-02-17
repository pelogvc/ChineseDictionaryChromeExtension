import produce from 'immer';
import { createAction, handleActions } from 'redux-actions';

export const LIST_REQUEST = 'recently/LIST_REQUEST';
export const LIST_SUCCESS = 'recently/LIST_SUCCESS';
export const LIST_FAILURE = 'recently/LIST_FAILURE';
export const LIST_CURRENT_PAGE = 'recnetly/LIST_CURRENT_PAGE'

export const listRequest = createAction(LIST_REQUEST);
export const listSuccess = createAction(LIST_SUCCESS);
export const listFailure = createAction(LIST_FAILURE);
export const listCurrentPage = createAction(LIST_CURRENT_PAGE);

const initialState = {
    loading: false,
    list: [],
    pageCount: 0,
    currentPage: 1,
}

export default handleActions({
    [LIST_REQUEST]: (state, action) => {
        return produce(state, draft => {
            draft.loading = true;
        });
    },
    [LIST_SUCCESS]: (state, action) => {
        return produce(state, draft => {
            draft.loading = false;
            draft.pageCount = action.payload.count;
            draft.list = action.payload.list;
        });
    },
    [LIST_FAILURE]: (state, action) => {
        return produce(state, draft => {
            draft.loading = false;
        });
    },
    [LIST_CURRENT_PAGE]: (state, action) => {
        return produce(state, draft => {
            draft.currentPage = action.payload;
        });
    }
}, initialState);
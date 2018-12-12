import {
    SET_SEX,
    SET_BIRTHDAY,
    SET_CITY
} from '../actions/actionTypes';

export default (state = [], action) => {
    switch (action.type) {
        case SET_SEX: {
            return Object.assign({}, state, {
                sex: action.sex
            });
        }
        case SET_BIRTHDAY: {
            return Object.assign({}, state, {
                birthday: action.birthday
            });
        }
        case SET_CITY: {
            return Object.assign({}, state, {
                city: action.city
            });
        }
        default:
            return state
    }
};
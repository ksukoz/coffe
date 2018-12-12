import {
    SET_CITY,
    SET_BIRTHDAY,
    SET_SEX
} from './actionTypes';

export const setCity = (city) => ({type: SET_CITY, city});
export const setBirthday = (birthday) => ({type: SET_BIRTHDAY, birthday});
export const setSex = (sex) => ({type: SET_SEX, sex});
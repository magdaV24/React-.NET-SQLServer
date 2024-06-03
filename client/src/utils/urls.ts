// User Management
const user = "/api/Users"
export const REGISTER = `${user}/register`;
export const LOGIN = `${user}/login`;

// Cards management
const card = "/api/Card"
export const CARD = card;
export const ADD_CARD = `${card}/addCard`;
export const FETCH_CARDS_PUBLIC_CATEGORIES = `${card}/getPublicCategories`;
export const FETCH_GAME_CATEGORIES = `${card}/fetchGameCategories`;
export const FETCH_USER_CARDS = `${card}/user`
export const EDIT_FIELD = `${card}/editField`;
export const CHANGE_PHOTO = `${card}/changePhoto`;
export const EDIT_PUBLIC = `${card}/editPublic`;
export const DELETE_CARD = `${card}/delete`;
export const DELETE_PHOTO = `${card}/deletePhoto`;
export const ADD_PHOTO = `${card}/addPhoto`;
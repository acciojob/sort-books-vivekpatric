import {
    FETCH_BOOKS_REQUEST,
    FETCH_BOOKS_SUCCESS,
    FETCH_BOOKS_FAILURE
  } from "./action";
  
  const initialState = {
    books: [],
    loading: false,
    error: null
  };
  
  function booksReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_BOOKS_REQUEST:
        return { ...state, loading: true, error: null };
      case FETCH_BOOKS_SUCCESS:
        return { ...state, books: action.payload, loading: false };
      case FETCH_BOOKS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  }
  
  export default booksReducer;
export const FETCH_BOOKS_REQUEST = "FETCH_BOOKS_REQUEST";
export const FETCH_BOOKS_SUCCESS = "FETCH_BOOKS_SUCCESS";
export const FETCH_BOOKS_FAILURE = "FETCH_BOOKS_FAILURE";

export function fetchBooks() {
  return async (dispatch) => {
    dispatch({ type: FETCH_BOOKS_REQUEST });

    try {
      const response = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=LVtPAnTjKn2fPpu3uU8G6ucbbAaQqCGV"
      );
      const data = await response.json();
      const books = data.results.books;
      dispatch({ type: FETCH_BOOKS_SUCCESS, payload: books });
    } catch (error) {
      dispatch({ type: FETCH_BOOKS_FAILURE, payload: error.message });
    }
  };
}
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchBooks } from "./action";
import 'regenerator-runtime/runtime';
import '../styles/App.css'

function BooksList(props) {
  const { books, loading, error, fetchBooks } = props;
  const [sortField, setSortField] = useState("title");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  function sortBooks(books) {
    let sortedBooks = [...books];

    if (sortField === "title") {
      sortedBooks = sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortField === "author") {
      sortedBooks = sortedBooks.sort((a, b) =>
        a.author.localeCompare(b.author)
      );
    } else if (sortField === "publisher") {
      sortedBooks = sortedBooks.sort((a, b) =>
        a.publisher.localeCompare(b.publisher)
      );
    }

    if (sortOrder === "desc") {
      sortedBooks = sortedBooks.reverse();
    }

    return sortedBooks;
  }

  return (
    <div>
      <h1>Books List</h1>
      <div class="dropdown-section">
        <label>
          Sort by:
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="publisher">Publisher</option>
          </select>
        </label>
        <label>
          Order:
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>
      {!loading && !error && (
        <table class="table-1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>ISBN</th>
            </tr>
          </thead>
          <tbody>
            {sortBooks(books).map((book) => (
              <tr key={book.primary_isbn10}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publisher}</td>
                <td>{book.primary_isbn10}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error
  };
}

const mapDispatchToProps = { fetchBooks };

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);

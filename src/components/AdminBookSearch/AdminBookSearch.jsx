/** @jsxImportSource @emotion/react */
import Select from "react-select";
import * as s from "./style";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput"
import { useQuery } from "react-query";
import { getBookCountRequest, searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import AdminBookSearchPageNumbers from "../AdminBookSearchPageNumbers/AdminBookSearchPageNumbers";
import { useRecoilState } from "recoil";
import { selectedBookState } from "../../atoms/adminSelectedBookAtom";

function AdminBookSearch({ selectStyle, bookTypeOptions, categoryOptions }) {

  const [searchParams, setSearchParams] = useSearchParams();
  const searchCount = 20;
  const selectedBookType = useReactSelect({ value: 0, label: "전체" });
  const selectedCategory = useReactSelect({ value: 0, label: "전체" });
  const selectedSearchType = useReactSelect({ value: 0, label: "전체" });
  const [books, setBooks] = useState([]);
  const page = searchParams.get("page");
  const checkAllBoxRef = useRef();
  const [selectedBook, setSelectedBook] = useRecoilState(selectedBookState);

  const searchBooksQuery = useQuery(
    ["searchBooksQuery", page],
    async () => await searchBooksRequest({
      retry: 0,
      page: page,
      count: searchCount,
      bookTypeId: selectedBookType.option.value,
      categoryId: selectedCategory.option.value,
      searchTypeId: selectedSearchType.option.value,
      searchText: searchText.value
    }),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        setBooks(() => response.data.map(book => {
          return {
            ...book,
            checked: false
          }
        }));
      },
    }
  );

  const getBookCountQuery = useQuery(
    ["getBookCountQuery", searchBooksQuery.data],
    async () => await getBookCountRequest({
      retry: 0,
      count: searchCount,
      bookTypeId: selectedBookType.option.value,
      categoryId: selectedCategory.option.value,
      searchTypeId: selectedSearchType.option.value,
      searchText: searchText.value
    }),
    {
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log(response);
      },
    }
  );

  const searchSubmit = () => {
    if (window.confirm(
      `책 타입: ${selectedBookType.option.label}, \n카테고리: ${selectedCategory.option.label}, \n세부검색: ${selectedSearchType.option.label}검색, \n검색어: ${searchText.value}
      \n로 검색하시겠습니까?`
    )) {
      setSearchParams({
        page: 1
      })
      searchBooksQuery.refetch();
    }

  }
  const searchText = useBookRegisterInput(searchSubmit);

  const searchTypeOptions = [
    { value: 0, label: "전체" },
    { value: 1, label: "도서명" },
    { value: 2, label: "저자명" },
    { value: 3, label: "출판사" },
    { value: 4, label: "ISBN" }
  ]

  const selectStyle2 = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: "0px",
      border: "none",
      fontSize: "13px",
      borderRight: "1px solid #dbdbdb",
      outline: "none",
      boxShadow: "none"
    })
  }

  const handleCheckClick = (id) => {
    const newBooks = [...books].map(book => {
      if (book.bookId === id) {
        return {
          ...book,
          checked: !book.checked
        }
      }
      return book;
    })
    setBooks(() => newBooks)
    const lastCheckedBook = books.filter(book => book.bookId === id)[0];
    if (lastCheckedBook === null) {
      setSelectedBook(() => lastCheckedBook)

    }
    setSelectedBook(() => ({
      bookId: 0,
      isbn: "",
      bookTypeId: 0,
      bookTypeName: "",
      categoryId: 0,
      categoryName: "",
      bookName: "",
      authorName: "",
      publisherName: "",
      coverImgUrl: ""
    }));
  }

  const handleCheckAllClick = () => {
    const newBooks = [...books].map(book => {
      return {
        ...book,
        checked: checkAllBoxRef.current.checked
      }
    })
    setBooks(() => newBooks)
  }

  useEffect(() => {
    const newBooks = [...books].filter(book => book.checked === false)
    if (newBooks.length !== 0) {
      checkAllBoxRef.current.checked = false;
    }
    if (newBooks.length === 0) {
      checkAllBoxRef.current.checked = true;
    }
  }, [books])

  return (
    <div>
      <div css={s.searchBar}>
        <Select
          options={[{ value: 0, label: "전체" }, ...bookTypeOptions]}
          styles={selectStyle2}
          defaultValue={selectedBookType.defaultValue}
          value={selectedBookType.option}
          onChange={selectedBookType.handleOnChange}
        />
        <Select
          options={[{ value: 0, label: "전체" }, ...categoryOptions]}
          styles={selectStyle2}
          defaultValue={selectedCategory.defaultValue}
          value={selectedCategory.option}
          onChange={selectedCategory.handleOnChange}
        />
        <Select
          options={searchTypeOptions}
          styles={selectStyle}
          defaultValue={searchTypeOptions.defaultValue}
          value={selectedSearchType.option}
          onChange={selectedSearchType.handleOnChange}
        />
        <input
          css={s.searchInput}
          type="text"
          value={searchText.value}
          onChange={searchText.handleOnChange}
          onKeyDown={searchText.handleOnKeyDown}
        />
        <button css={s.searchButton} onClick={searchSubmit}>검색</button>
      </div>
      <div css={s.tableLayout}>
        <table css={s.table}>
          <thead>
            <tr css={s.theadTr}>
              <th>
                <input
                  type="checkbox"
                  onClick={handleCheckAllClick}
                  ref={checkAllBoxRef}
                />
              </th>
              <th>코드번호</th>
              <th>도서명</th>
              <th>저자명</th>
              <th>출판사</th>
              <th>ISBN</th>
              <th>도서형식</th>
              <th>카테고리</th>
              <th>커버URL</th>
            </tr>
          </thead>
          <tbody>
            {books && books.length > 0 && books.map(book => {
              return (
                <tr key={book.bookId} css={s.tbodyTr(book.checked)}>
                  <td>
                    <input
                      type="checkbox"
                      id={book.bookId}
                      checked={book.checked}
                      onClick={() => handleCheckClick(book.bookId)}
                    />
                  </td>
                  <td onClick={() => handleCheckClick(book.bookId)}>{book.bookId}</td>
                  <td onClick={() => handleCheckClick(book.bookId)}>{book.bookName}</td>
                  <td onClick={() => handleCheckClick(book.bookId)}>{book.authorName}</td>
                  <td>{book.publisherName}</td>
                  <td>{book.isbn}</td>
                  <td>{book.bookTypeName}</td>
                  <td>{book.categoryName}</td>
                  <td>{book.coverImgUrl}</td>
                </tr>
              );
            })
            }
          </tbody>
        </table>
      </div>
      <div>
        {
          !getBookCountQuery.isLoading &&
          <AdminBookSearchPageNumbers bookCount={getBookCountQuery.data?.data} />
        }
      </div>
    </div>
  );
}

export default AdminBookSearch;
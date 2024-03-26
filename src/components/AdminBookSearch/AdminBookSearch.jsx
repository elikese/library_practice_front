/** @jsxImportSource @emotion/react */
import Select from "react-select";
import * as s from "./style";
import { useReactSelect } from "../../hooks/useReactSelect";
import { useBookRegisterInput } from "../../hooks/useBookRegisterInput"
import { useQuery } from "react-query";
import { searchBooksRequest } from "../../apis/api/bookApi";
import { useSearchParams } from "react-router-dom";

function AdminBookSearch({ selectStyle, bookTypeOptions, categoryOptions }) {

  const [searchParams] = useSearchParams();
  const selectedBookType = useReactSelect({ value: 0, label: "전체" });
  const selectedCategory = useReactSelect({ value: 0, label: "전체" });
  const selectedSearchType = useReactSelect({ value: 0, label: "전체" });

  const searchBooksQuery = useQuery(
    ["searchBooksQuery", searchParams.get("page")],
    async () => await searchBooksRequest({
      page: searchParams.get("page"),
      bookTypeId: selectedBookType.option.value,
      categoryId: selectedCategory.option.value,
      searchTypeId: selectedSearchType.option.value,
      searchText: searchText.value
    }),
    {
      retry: 0,
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
              <th><input type="checkbox" /></th>
              <th>코드번호</th>
              <th>도서명</th>
              <th>저자명</th>
              <th>출판사</th>
              <th>ISBN</th>
              <th>도서형식</th>
              <th>카테고리</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
            <tr>
              <td><input type="checkbox" /></td>
              <td>bookId</td>
              <td>bookName</td>
              <td>authorName</td>
              <td>publisherName</td>
              <td>isbn</td>
              <td>bookType</td>
              <td>category</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        페이지네이션
      </div>
    </div>
  );
}

export default AdminBookSearch;
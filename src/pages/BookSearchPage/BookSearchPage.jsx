/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Select from "react-select";
import BookCard from "../../components/BookCard/BookCard";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchBooksRequest } from "../../apis/api/bookApi";

function BookSearchPage(props) {
    const [searchBooks, setSearchBooks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchBook, setSearchBook] = useState({
        searchTypeId: -1,
        searchText: "",
    });
    const searchCount = 10;
    const page = searchParams.get("page");

    const searchBooksQuery = useQuery(
        ["searchBooksQuery", page],
        async () =>
            await searchBooksRequest({
                page: page,
                count: searchCount,
                searchTypeId: searchBook.searchTypeId,
                searchText: searchBook.searchText,
            }),
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: (response) => {},
        }
    );

    const selectStyle = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "14px",
            boxShadow: "none",
        }),
    };

    const selectOption = [
        { value: 0, label: "책이름" },
        { value: 1, label: "저자명" },
    ];

    return (
        <div css={s.layout}>
            <div css={s.header}>
                <div css={s.searchBar}>
                    <Select styles={selectStyle} options={selectOption} />
                    <input type="text" />
                    <button>검색</button>
                </div>
            </div>
            <div css={s.container}>
                <div css={s.resultPage}>
                    {searchBooks.map((book) => {
                        return (
                            <div key={book.bookId}>
                                <BookCard />
                            </div>
                        );
                    })}
                </div>
            </div>
            <div>페이지</div>
        </div>
    );
}

export default BookSearchPage;

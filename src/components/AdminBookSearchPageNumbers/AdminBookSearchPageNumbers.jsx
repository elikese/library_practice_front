/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

function AdminBookSearchPageNumbers({ bookCount }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const [numbers, setNumbers] = useState([]);
  const maxPageNumber = parseInt(bookCount.endPageNumber);
  const pageInputRef = useRef();

  useEffect(() => {
    const startPageNumber = page % 10 === 0 ? page - 9 : (page - (page % 10)) + 1;
    const endPageNumber = startPageNumber + 9 > maxPageNumber ? maxPageNumber : startPageNumber + 9
    let pageNumbers = [];
    for (let i = startPageNumber; i <= endPageNumber; i++) {
      pageNumbers = [...pageNumbers, i];
    }

    setNumbers(() => pageNumbers);
  }, [bookCount, page])

  return (
    <div css={s.layout}>
      <div css={s.pageNumbers}>
        {
          page !== 1 &&
          <Link
            css={s.pageButton(false)}
            to={`/admin/book/management?page=1`}
          >
            1
          </Link>
        }
        {
          (page / 10) > 1 &&
          <Link
            css={s.pageButton(false)}
            to={`/admin/book/management?page=${page - 10}`}
          >
            ◀◀
          </Link>
        }
        {
          <Link
            css={s.pageButton(false)}
            to={`/admin/book/management?page=${page - 1}`}
          >
            ◀
          </Link>
        }
        {
          numbers.map(number =>
            <Link
              key={number}
              css={s.pageButton(page === number)}
              to={`/admin/book/management?page=${number}`}
            >
              {number}
            </Link>
          )
        }
        {
          page !== maxPageNumber &&
          <Link
            css={s.pageButton(false)}
            to={`/admin/book/management?page=${page + 1}`}
          >
            ▶
          </Link>
        }
        {
          page / 10 !== maxPageNumber / 10 &&
          <Link
            css={s.pageButton(false)}
            to={`/admin/book/management?page=${page + 10}`}
          >
            ▶▶
          </Link>
        }
        {
          <Link
            css={s.pageButton(false)}
            to={`/admin/book/management?page=${maxPageNumber}`}
          >
            {maxPageNumber}
          </Link>
        }
      </div>
      <div css={s.pageCount}>
        <div>현재페이지 {bookCount.endPageNumber}중 {page}페이지</div>
        <div>검색결과: {bookCount.totalCount} 개</div>
        <div css={s.pageInputBox}>
          <input
            type="text"
            placeholder="이동할페이지입력"
            ref={pageInputRef}
          // onKeyDown={(e) => {
          //   if (e.target)
          // }}
          />
          <button
            onClick={() => setSearchParams({
              page: `${pageInputRef.current.value}`
            })}
          >
            이동
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminBookSearchPageNumbers;
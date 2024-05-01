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
    pageInputRef.current.value = "";
    pageInputRef.current.focus();
  }, [bookCount, page])

  const handleJumpPage = () => {
    const inputPage = pageInputRef.current.value;
    if(inputPage > maxPageNumber) {
      alert(`마지막페이지는 ${maxPageNumber}페이지 입니다. 다시 력해주세요`)
      return;
    } else if(inputPage < 1) {
      alert(`페이지는 0이하일 수 없습니다. 입력하신 페이지: ${inputPage}페이지`);
      return;
    }
    setSearchParams({
      page: inputPage
    });
  }

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
          page !== 1 &&
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
          page < maxPageNumber - 9 &&
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
            onKeyDown={({key}) => {
              if (key === 'Enter') {
                handleJumpPage();
              }
            }}
          />
          <button onClick={handleJumpPage}>
            이동
          </button>
        </div>

      </div>
    </div>
  );
}

export default AdminBookSearchPageNumbers;
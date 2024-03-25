/** @jsxImportSource @emotion/react */
import Select from "react-select";
import BookRegisterInput from "../../../components/BookRegisterInput/BookRegisterInput";
import * as s from "./style";
import { useQuery } from "react-query";
import { getAllBookTypeRequest, getAllCategoryRequest } from "../../../apis/api/options";
import { useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useBookRegisterInput } from "../../../hooks/useBookRegisterInput";

function BookManagement() {
  const [bookTypeOptions, setBookTypeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const fileRef = useRef();
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef()
  ];

  const bookId = useBookRegisterInput();
  const isbn = useBookRegisterInput(nextInput, inputRefs[1]);
  const bookName = useBookRegisterInput(nextInput, inputRefs[4]);
  const authorName = useBookRegisterInput(nextInput, inputRefs[5]);
  const publisherName = useBookRegisterInput(nextInput, inputRefs[6]);
  const imgUrl = useBookRegisterInput(nextInput, inputRefs[7]);

  const nextInput = (ref) => {
    ref.current.focus();
  }


  const selectStyle = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderRadius: "8px",
      border: "none",
      outline: "none",
      fontSize: "13px",
      boxShadow: "none"
    })
  }
  const categoryQuery = useQuery(
    ["categoryQuery"],
    getAllCategoryRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        setCategoryOptions(() => response.data.map(categoryType => {
          return ({
            value: categoryType.categoryId,
            label: categoryType.categoryName
          });
        }));

      },
      onError: error => {
        console.log(error.response.data);
      }
    }
  );
  const bookTypeQuery = useQuery(
    ["bookTypeQuery"],
    getAllBookTypeRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        setBookTypeOptions(() => response.data.map(bookType => {
          return ({
            value: bookType.bookTypeId,
            label: bookType.bookTypeName
          });
        }));
      },
      onError: error => {
        console.log(error.response.data);
      }
    }
  );

  const handleImgChange = (e) => {
    const reader = new FileReader();
    console.log(e.target)
    // reader.onload = (e) => {
    //   console.log(e);
    // }

    // reader.readAsDataURL(e.target.value);
  }



  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h1>도서통합관리</h1>
      </div>
      <div css={s.topLayout}>
        <table css={s.registerTable}>
          <tbody>
            <tr>
              <th css={s.registerTh}>도서코드</th>
              <td>
                <BookRegisterInput />
              </td>
              <th css={s.registerTh}>ISBN</th>
              <td>
                <BookRegisterInput />
              </td>
              <td rowSpan={5} css={s.preview}>
                <div css={s.imageBox}>
                  <img src="https://dispatch.cdnser.be/wp-content/uploads/2018/01/20180102190245_1.jpg" alt="표지사진" />
                </div>
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>도서형식</th>
              <td>
                <Select
                  styles={selectStyle}
                  options={bookTypeOptions} />
              </td>
              <th css={s.registerTh}>카테고리</th>
              <td >
                <Select
                  styles={selectStyle}
                  options={categoryOptions} />
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>도서명</th>
              <td colSpan={3}>
                <BookRegisterInput />
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>저자명</th>
              <td>
                <BookRegisterInput />
              </td>
              <th css={s.registerTh}>출판사</th>
              <td>
                <BookRegisterInput />
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>표지URL</th>
              <td colSpan={3}>
                <div css={s.imgUrl}>
                  <span css={s.imgUrlBox}>
                    <BookRegisterInput />
                  </span>
                  <input type="file" style={{ display: "none" }} ref={fileRef} onChange={handleImgChange} />
                  <button css={s.imgAddButton} onClick={() => fileRef.current.click()}>
                    <CiSquarePlus />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div></div>
      </div>
    </div>
  );
}

export default BookManagement;
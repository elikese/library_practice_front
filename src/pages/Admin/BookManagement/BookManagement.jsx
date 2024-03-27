/** @jsxImportSource @emotion/react */
import Select from "react-select";
import BookRegisterInput from "../../../components/BookRegisterInput/BookRegisterInput";
import * as s from "./style";
import { useMutation, useQuery } from "react-query";
import { getAllBookTypeRequest, getAllCategoryRequest } from "../../../apis/api/options";
import { useEffect, useRef, useState } from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useBookRegisterInput } from "../../../hooks/useBookRegisterInput";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../../apis/firebase/config/firebaseConfig";
import { v4 as uuid } from "uuid"
import RightTopButton from "../../../components/RightTopButton/RightTopButton";
import { registerBook } from "../../../apis/api/bookApi";
import AdminBookSearch from "../../../components/AdminBookSearch/AdminBookSearch";
import { useRecoilState } from "recoil";
import { selectedBookState } from "../../../atoms/adminSelectedBookAtom";


function BookManagement() {
  const [bookTypeOptions, setBookTypeOptions] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  const fileRef = useRef();
  const inputRefs = [
    useRef(), // bookId
    useRef(), // isbn
    useRef(), // 도서형식
    useRef(), // 카테고리
    useRef(), // 도서명
    useRef(), // 저자명
    useRef(), // 출판사명
    useRef()  // 표지url
  ];

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

  const nextInput = (ref) => {
    ref.current.focus();
  }

  const bookRegisterMutation = useMutation({
    mutationKey: "bookRegisterMutation",
    mutationFn: registerBook,
    onSuccess: response => {

    },
    onError: error => {

    }
  });

  const submit = () => {
    if (window.confirm("저장하시겠습니까?")) {
      bookRegisterMutation.mutate({
        isbn: isbn.value,
        bookTypeId: bookTypeId.value,
        categoryId: categoryId.value,
        bookName: bookName.value,
        authorName: authorName.value,
        publisherName: publisherName.value,
        coverImgUrl: imgUrl.value
      });
    }
  }

  const bookId = useBookRegisterInput(nextInput, inputRefs[1]);
  const isbn = useBookRegisterInput(nextInput, inputRefs[2]);
  const bookTypeId = useBookRegisterInput(nextInput, inputRefs[3]);
  const categoryId = useBookRegisterInput(nextInput, inputRefs[4]);
  const bookName = useBookRegisterInput(nextInput, inputRefs[5]);
  const authorName = useBookRegisterInput(nextInput, inputRefs[6]);
  const publisherName = useBookRegisterInput(nextInput, inputRefs[7]);
  const imgUrl = useBookRegisterInput(submit);

  const [selectedBook] = useRecoilState(selectedBookState);

  useEffect(() => {
    bookId.setValue(() => selectedBook.bookId)
    isbn.setValue(() => selectedBook.isbn)
    bookTypeId.setValue(() => ({ value: selectedBook.bookTypeId, label: selectedBook.bookTypeName }))
    categoryId.setValue(() => ({ value: selectedBook.categoryId, label: selectedBook.categoryName }))
    bookName.setValue(() => selectedBook.bookName)
    authorName.setValue(() => selectedBook.authorName)
    publisherName.setValue(() => selectedBook.publisherName)
    imgUrl.setValue(() => selectedBook.coverImgUrl)
  }, [selectedBook])

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



  const handleImgChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) {
      e.target.value = "";
      return;
    }

    if (!window.confirm("파일을 업로드 하시겠습니까?")) {
      e.target.value = "";
      return;
    }

    const storageRef = ref(storage, `library/book/cover/${uuid()}_${files[0].name}`);
    const uploadTask = uploadBytesResumable(storageRef, files[0]);
    uploadTask.on(
      "state_changed",
      snapshot => { },
      error => { },
      () => {
        alert("업로드 완료")
        getDownloadURL(storageRef)
          .then(url => {
            imgUrl.setValue(() => url);
          });
      }
    )
  }



  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h1>도서통합관리</h1>
        <RightTopButton children={"저장하기"} onClick={submit} />
      </div>
      <div css={s.topLayout}>
        <table css={s.registerTable}>
          <tbody>
            <tr>
              <th css={s.registerTh}>도서코드</th>
              <td>
                <BookRegisterInput
                  value={bookId.value}
                  ref={inputRefs[0]}
                  onChange={bookId.handleOnChange}
                  onKeyDown={bookId.handleOnKeyDown}
                />
              </td>
              <th css={s.registerTh}>ISBN</th>
              <td>
                <BookRegisterInput
                  value={isbn.value}
                  ref={inputRefs[1]}
                  onChange={isbn.handleOnChange}
                  onKeyDown={isbn.handleOnKeyDown}
                />
              </td>
              <td rowSpan={5} css={s.preview}>
                <div css={s.imageBox}>
                  <img src={
                    !imgUrl.value
                      ? "https://cdn.icon-icons.com/icons2/2483/PNG/512/image_file_icon_149928.png"
                      : imgUrl.value
                  } alt="표지사진" />
                </div>
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>도서형식</th>
              <td>
                <Select
                  styles={selectStyle}
                  options={bookTypeOptions}
                  ref={inputRefs[2]}
                  value={bookTypeId.value.value}
                  inputValue={bookTypeId.value.label}
                  onKeyDown={bookTypeId.handleOnKeyDown}
                  onChange={bookTypeId.handleOnChange}
                />
              </td>
              <th css={s.registerTh}>카테고리</th>
              <td >
                <Select
                  styles={selectStyle}
                  options={categoryOptions}
                  ref={inputRefs[3]}
                  value={categoryId.value.value}
                  inputValue={categoryId.value.label}
                  onKeyDown={categoryId.handleOnKeyDown}
                  onChange={categoryId.handleOnChange}
                />
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>도서명</th>
              <td colSpan={3}>
                <BookRegisterInput
                  value={bookName.value}
                  ref={inputRefs[4]}
                  onChange={bookName.handleOnChange}
                  onKeyDown={bookName.handleOnKeyDown}
                />
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>저자명</th>
              <td>
                <BookRegisterInput
                  value={authorName.value}
                  ref={inputRefs[5]}
                  onChange={authorName.handleOnChange}
                  onKeyDown={authorName.handleOnKeyDown}
                />
              </td>
              <th css={s.registerTh}>출판사</th>
              <td>
                <BookRegisterInput
                  value={publisherName.value}
                  ref={inputRefs[6]}
                  onChange={publisherName.handleOnChange}
                  onKeyDown={publisherName.handleOnKeyDown}
                />
              </td>
            </tr>
            <tr>
              <th css={s.registerTh}>표지URL</th>
              <td colSpan={3}>
                <div css={s.imgUrl}>
                  <span css={s.imgUrlBox}>
                    <BookRegisterInput
                      value={imgUrl.value}
                      ref={inputRefs[7]}
                      onChange={imgUrl.handleOnChange}
                      onKeyDown={imgUrl.handleOnKeyDown}
                    />
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
      </div>
      <AdminBookSearch
        bookTypeOptions={bookTypeOptions}
        categoryOptions={categoryOptions}
        selectStyle={selectStyle}
      />
    </div>
  );
}

export default BookManagement;
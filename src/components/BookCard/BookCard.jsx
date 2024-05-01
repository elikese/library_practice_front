/** @jsxImportSource @emotion/react */
import * as s from "./style";

function BookCard({book}) {
    return (
        <div css={s.bookCard}>
            <div css={s.leftBox}>
                <img src={
                        ! false
                        ? "https://cdn.icon-icons.com/icons2/2483/PNG/512/image_file_icon_149928.png"
                        : <></>
                    } alt="표지사진" />
            </div>
            <div css={s.middleBox}>
                <div css={s.textBox}>
                    <span>책이름 :{book?.bookName}</span>
                    <span>저자명 :{book?.authorName}</span>
                    <span>출판사 :{book?.publisherName}</span>
                </div>
                <div css={s.textBox}>
                    <span>책유형 :{book?.bookTypeName}</span>
                    <span>카테고리 :{book?.categoryName}</span>
                    <span>isbn :{book?.isbn}</span>
                </div>
            </div>
            <div css={s.rightBox}>
                <div>좋아요 {} 💗</div>
                <button>의견 남기기</button>
            </div>
        </div>
    );
}

export default BookCard;
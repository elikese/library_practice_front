/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { motion } from 'framer-motion';
import bookImg from '../../assets/book.png';
import BookModal from "../../components/BookModal/BookModal";
import { useState } from "react";

function HomePage() {
    const [test, setTest] = useState(false);
    return (
        <div css={s.layout}>
            <motion.div
                css={s.pageContainer}
                transition={{ "duration": 1 }}
                initial={{ "opacity": 0 }}
                animate={{ "opacity": 1 }}
                exit={{ "opacity": 0 }}
            >
                <h1>책읽는사이트</h1>
            </motion.div>
            <motion.div
                css={s.imgBox}
                transition={{ "duration": 1, delay: 0.5 }}
                initial={{ "opacity": 0, }}
                animate={{ "opacity": 1 }}
                exit={{ "opacity": 0 }}>
                <img src={bookImg} onClick={() => setTest(() => !test)}/>
            </motion.div>
            <motion.div
                css={s.pageContainer}
                transition={{ "duration": 1, delay: 1 }}
                initial={{ "opacity": 0 }}
                animate={{ "opacity": 1 }}
                exit={{ "opacity": 0 }}
            >
                <h1 >읽으면 사야됨</h1>
            </motion.div>
            {/* {
                test ? 
                <motion.div
                    css={s.pageContainer}
                    transition={{ "duration": 0.3 }}
                    initial={{ "opacity": 0 }}
                    animate={{ "opacity": 1 }}
                    exit={{ "opacity": 0 }}
                >
                    <BookModal />
                </motion.div>
                
                : <></>
            } */}
        </div>
    );
}

export default HomePage;
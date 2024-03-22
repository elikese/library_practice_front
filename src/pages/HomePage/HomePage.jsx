/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { motion } from 'framer-motion';

function HomePage() {
    return (
        <motion.div
            initial={{ "opacity": 0 }}
            animate={{ "opacity": 1 }}
            exit={{ "opacity": 1 }}
            css={s.layout}
        >
            <h1>MainPage</h1>
        </motion.div>
    );
}

export default HomePage;
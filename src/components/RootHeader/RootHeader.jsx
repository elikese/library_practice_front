/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style";
import { HiMenu } from "react-icons/hi";
import { FiUser } from "react-icons/fi";
import { menuState } from "../../atoms/menuAtom";
import { useCallback, useEffect } from "react";
import { getPrincipalRequest } from "../../apis/api/principal";
import { Link } from "react-router-dom";

function RootHeader() {
    const [ show, setShow ] = useRecoilState(menuState);

    useEffect(()=>{
        getPrincipal();
    },[])

    const getPrincipal = useCallback(() => {
        getPrincipalRequest()
        .then(response => {
            console.log(response);
        }).catch(error => {
            console.log(error);
        })
    },[]);

    const handleOpenClick = () => {
        setShow(() => true);
    }

    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={handleOpenClick}>
                <HiMenu />
            </button>
            <Link css={s.account} to={"/auth/signin"}>
                <FiUser />
            </Link>
        </div>
    );
}

export default RootHeader;
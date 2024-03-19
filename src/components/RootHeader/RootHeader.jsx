/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style";
import { HiMenu } from "react-icons/hi";
import { FiUser, FiLogOut } from "react-icons/fi";
import { loginState, menuState } from "../../atoms/menuAtom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "react-query";
import instance from "../../apis/utils/instance";

function RootHeader() {
    const [show, setShow] = useRecoilState(menuState);
    const [isLogin, setLogin] = useRecoilState(loginState);
    const queryClient = useQueryClient();
    const principalQueryState = queryClient.getQueryState("PrincipalQuery");

    useEffect(() => {
        setLogin(() => principalQueryState.status === "success");
    }, [principalQueryState.status]);


    const handleOpenClick = (e) => {
        e.stopPropagation();
        setShow(() => true);
    }

    const handleLogoutClick = () => {
        localStorage.removeItem("AccessToken")
        instance.interceptors.request.use((config) => {
            config.headers.Authorization = null;
            return config;
        });
        queryClient.refetchQueries("PrincipalQuery");
    }


    return (
        <div css={s.header}>
            <button css={s.menuButton} onClick={handleOpenClick}>
                <HiMenu />
            </button>
            {
                !isLogin
                    ? (
                        <Link css={s.account} to={"/auth/signin"}>
                            <FiUser />
                        </Link>
                    )
                    : (
                        <div css={s.accountItems}>
                            <button css={s.logout} onClick={handleLogoutClick}>
                                <FiLogOut />
                            </button>
                            <Link css={s.account} to={"/account/mypage"}>
                                <FiUser />
                            </Link>
                        </div>
                    )
            }
        </div>
    );
}

export default RootHeader;
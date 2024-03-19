/** @jsxImportSource @emotion/react */
import { useRecoilState } from "recoil";
import * as s from "./style copy";
import { HiMenu } from "react-icons/hi";
import { loginState, menuState } from "../../atoms/menuAtom";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { FiUser, FiSettings } from "react-icons/fi";

function RootSideMenuLeft() {
    const [show, setShow] = useRecoilState(menuState);
    const [isLogin, setLogin] = useRecoilState(loginState);

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: "",
        userEmail: ""
    })

    const queryClient = useQueryClient();
    const principalQueryState = queryClient.getQueryState("PrincipalQuery");


    useEffect(() => {
        setLogin(() => principalQueryState.status === "success");
        const data = principalQueryState?.data?.data;
        setUser(() => {
            return (
                {
                    username: data?.username,
                    userEmail: data?.email
                }
            );
        });

    }, [principalQueryState.status]);

    const handleCloseClick = () => {
        setShow(() => false);
    }

    const handleLoginClick = () => {
        setShow(() => false);
        navigate("/auth/signin");
    }

    return (
        <div css={s.layout(show)}>
            <div css={s.header}>
                <button css={s.menuButton} onClick={handleCloseClick}>
                    <HiMenu />
                </button>
            </div>
            <div css={s.profile}>
                {!isLogin
                    ?
                    <div css={s.authButtons}>
                        <button>로그인</button>
                        <button>회원가입</button>
                    </div>
                    :
                    <>
                        <div css={s.settings}>
                            <FiSettings />
                        </div>
                        <div css={s.profileBox}>
                            <div css={s.profileImg}>
                                <FiUser />
                            </div>
                            <div css={s.usernameAndEmail}>
                                <span>{user.username}</span>
                                <span>{user.userEmail}</span>
                            </div>
                        </div>
                    </>
                }
            </div>
            <div css={s.menuList}>
                <Link css={s.menuLink}>
                    도서 검색
                </Link>
            </div>
        </div>
    );
}

export default RootSideMenuLeft;
import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import AuthPage from "../pages/Authpage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import { getPrincipalRequest } from '../apis/api/principal';
import RootSideMenuLeft from '../components/RootSideMenuLeft/RootSideMenuLeft copy';
import RootHeader from '../components/RootHeader/RootHeader';
import FullSizeLoader from '../components/FullSizeLoader/FullSizeLoader';
import MyPage from '../pages/MyPage/MyPage';
import PageContainer from '../components/PageContainer/PageContainer';
import { AnimatePresence } from 'framer-motion';
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage';
import BookManagement from '../pages/Admin/BookManagement/BookManagement';


// useQuery => GET 요청시 사용
// 첫번째 매개변수 => 배열["key값", dependency]
// 두번째 매개변수 => 요청메소드(async, await)
/* 세번째 매개변수 => 옵션객체(
 *  {
 *    retry: 0, 
 *    refetchOnWindowFocous: false
 *    onSuccess: 함수,
 *    onError: 함수,
 *    enabled: true or false
 *  }
 */


function AuthRoute(props) {

  const PrincipalQuery = useQuery(["PrincipalQuery"], getPrincipalRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log("서버통신");
      },
      onError: error => {
        console.log(error)
      }
    });

  return (
    <>
      <RootSideMenuLeft />
      <RootHeader />
      <PageContainer>
        {
          PrincipalQuery.isLoading
            ? <FullSizeLoader size={"30px"} />
            :
            <AnimatePresence>
              <Routes>
                <Route path='auth/*' element={<AuthPage />} />
                <Route path='/' element={<HomePage />} />
                <Route path='/account/mypage' element={<MyPage />} />
                <Route path='/account/edit/password' element={<PasswordEditPage />} />
                <Route path='/admin/book/management' element={<BookManagement />} />
              </Routes>
            </AnimatePresence>
        }
      </PageContainer>
    </>
  );
}

export default AuthRoute;
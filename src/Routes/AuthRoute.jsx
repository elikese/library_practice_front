import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes } from 'react-router-dom';
import AuthPage from "../pages/Authpage/AuthPage";
import HomePage from "../pages/HomePage/HomePage";
import { getPrincipalRequest } from '../apis/api/principal';
import RootSideMenuLeft from '../components/RootSideMenuLeft/RootSideMenuLeft';
import RootHeader from '../components/RootHeader/RootHeader';


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
        console.log(response);
      },
      onError: error => {
        console.log(error)
      }
    });

  return (
    <>
      <RootSideMenuLeft />
      <RootHeader />
      {
        PrincipalQuery.isLoading
          ? <h1>로딩중...</h1>
          : <Routes>
            <Route path='auth/*' element={<AuthPage />}></Route>
            <Route path='/' element={<HomePage />}></Route>
          </Routes>
      }
    </>
  );
}

export default AuthRoute;
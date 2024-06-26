import { Route, Routes } from "react-router-dom";
import RootContainer from "./components/RootContainer/RootContainer";
import RootHeader from "./components/RootHeader/RootHeader";
import RootLayout from "./components/RootLayout/RootLayout";
import RootSideMenuLeft from "./components/RootSideMenuLeft/RootSideMenuLeft";
import AuthPage from "./pages/Authpage/AuthPage";
import HomePage from "./pages/HomePage/HomePage";
import AuthRoute from "./Routes/AuthRoute";
import "./apis/firebase/config/firebaseConfig";

function App() {
    return (
        <RootLayout>
            <RootContainer>
                <AuthRoute />
            </RootContainer>
        </RootLayout>
    );
}

export default App;

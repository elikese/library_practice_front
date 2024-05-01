import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getMessaging, getToken } from "firebase/messaging";
import instance from "../../utils/instance";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const messaging = getMessaging(app);

export const requestForFCMToken = async () => {
    console.log("requestForFCMToken 호출");
    try {
        const currentToken = await getToken(messaging, {
            vapidKey: process.env.REACT_APP_VAPID_KEY,
        });

        console.log(currentToken);

        if (!!currentToken) {
            instance.post("/notification/register", {
                fcmToken: currentToken,
            });
        } else {
            alert("토큰을 찾을 수 없습니다");
        }
    } catch (error) {
        console.error(error);
    }
};

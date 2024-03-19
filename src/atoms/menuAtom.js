import { atom } from "recoil";

export const menuState = atom({
    key: "menuState",
    default: false
});

export const loginState = atom({
    key: "loginState",
    default: false
})
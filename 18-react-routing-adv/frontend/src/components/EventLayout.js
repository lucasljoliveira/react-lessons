import { Outlet } from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function RootLayout(children) {
    return (
        <>
            <HomePage />
            <main>
                <Outlet />
            </main>
        </>
    )
}
import { Outlet } from "react-router-dom";
import MainNav from "./MainNav";

export default function RootLayout(children) {
    return (
        <>
            <MainNav />
            <main>
                <Outlet />
            </main>
        </>
    )
}
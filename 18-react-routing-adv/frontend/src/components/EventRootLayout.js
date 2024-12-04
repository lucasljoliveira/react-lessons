import { Outlet } from "react-router-dom";
import EventNavigation from "./EventsNavigation";

export default function EventRootLayout(children) {
    return (
        <>
            <EventNavigation />
            <Outlet />
        </>
    )
}
import { NavLink } from "react-router-dom";
import cssClasses from "./MainNavigation.module.css"

export default function MainNav(){
    return <header className={cssClasses.header}>
        <nav>
            <ul className={cssClasses.list}>
                <li>
                    <NavLink 
                        to="/" 
                        className={({isActive}) => isActive ? cssClasses.active : undefined}
                    >Home</NavLink>
                </li>
                <li>
                    <NavLink
                        to="/events"
                        className={({isActive}) => isActive ? cssClasses.active : undefined}
                    >Events</NavLink></li>
            </ul>
        </nav>
    </header>
}
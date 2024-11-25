import { Link } from "react-router-dom"

const EVENTS = [
    {id: "1", name: "Event 1"},
    {id: "2", name: "Event 2"},
    {id: "3", name: "Event 3"},
    {id: "4", name: "Event 4"},
    {id: "5", name: "Event 5"},
]

export default function EventsPage() {
    return (
        <>
            <h1>Events Page</h1>
            <p><Link to="new">New</Link></p>
            {EVENTS.map((event) => {
                return <li><Link to={event.id}>{event.id} - {event.name}</Link></li>
            })}
        </>
    )
}
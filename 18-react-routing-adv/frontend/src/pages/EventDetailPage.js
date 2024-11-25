import { Link, useParams } from "react-router-dom"

export default function EventDetailPage() {
    const params = useParams();

    return (
        <>
            <h1>Event Detail Page</h1>
            <p>id: {params.id}</p>
            <p><Link to="edit">edit</Link></p>
        </>
    )
}
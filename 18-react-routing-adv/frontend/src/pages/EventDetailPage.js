import { Await, redirect, useRouteLoaderData } from "react-router-dom";
import EventItem from "../components/EventItem";
import { loadEvents } from "./Events";
import { Suspense } from "react";
import EventsList from "../components/EventsList";

export default function EventDetailPage() {
    const {eventData, eventsData} = useRouteLoaderData("event-detail");

    return <>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading Event...</p>}>
            <Await resolve={eventData}>
                {(loadedEventData) => <EventItem event={loadedEventData.event} />}
            </Await>
        </Suspense>
        <Suspense fallback={<p style={{textAlign: "center"}}>Loading Event List...</p>}>
            <Await resolve={eventsData}>
                {(loadedEventsData) => <EventsList events={loadedEventsData.events} />}
            </Await>
        </Suspense>
    </>
}

async function loadEvent(id){
    const response = await fetch('http://localhost:8080/events/' + id);

    if (!response.ok) {
        throw Response(JSON.stringify({message: "Could not fetch details for selected event."}, {status: 500}))
    } else {
        const responseData = await response.json();
        return responseData;
    }
}

export async function loader({request, params}) {
    const id = params.id;
    return {
        eventData: await loadEvent(id), // Await here make sure that eventData is loaded before the page is loaded, and eventsData after the page is loaded
        eventsData: loadEvents(),
    }
}

export async function action({ request, params }) {
    const id = params.id;
    const method = request.method;
    const response = await fetch("http://localhost:8080/events/" + id, {method: method});

    if (!response.ok) {
        throw Response(JSON.stringify({message: "Could not delete event."}, {status: 500}))
    } 

    return redirect("/events")
}

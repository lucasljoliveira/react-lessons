import { useLoaderData, Await } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { Suspense } from 'react';

function EventsPage() {
  const { data } = useLoaderData();
  
  return (
    <Suspense fallback={<p style={{textAlign: "center"}}>Loading...</p>}>
      <Await resolve={data}>
        {(loadedData) => <EventsList events={loadedData.events} />}
      </Await>
    </Suspense>
  )
  // Handling error with data from the object
  // if ( data.isError ){
    //   return <p>{data.errorMessage}</p>
    // }

}

export default EventsPage;

export async function loadEvents() {
      // We CANT'T use hooks on loaders, like useState, useFetch, etc..
      const response = await fetch('http://localhost:8080/events');
  
      if (!response.ok) {
        // Handling error with data from the object
        // return { isError: true, errorMessage: "An error occured"}
    
        // we can throw an Error or an Response here to return data for error handling, with Response it's better because we can include data, like the message bellow
        // throw new Response(JSON.stringify({ message: "Could not fetch events."}), {status: 500});
    
        // but react router dom provides an function called json that does the same as throw new Response.
        // this function was removed on version 7
        throw Response(JSON.stringify({ message: "Could not fetch events."}, {status: 500}))
      } else {
        const responseData = await response.json();
        return responseData
      }
}

export function loader() {
  return {data: loadEvents()}
}

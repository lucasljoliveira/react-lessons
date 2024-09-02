import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';
import { useFetch } from '../hooks/useFetch.js';

async function fetchSortedAvailablePlaces(){
  const places = await fetchAvailablePlaces();

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude);
      
      resolve(sortedPlaces);
    });
  })
  
}


export default function AvailablePlaces({ onSelectPlace }) {
  const {
    fetchedData: availablePlaces,
    setfetchedData: setAvailablePlaces,
    isFetching,
    error: errors
  } = useFetch(fetchSortedAvailablePlaces, [])

  if (errors) {
    return <Error title="An error ocurred!" message={errors.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      isLoadingText="Loading available places."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}

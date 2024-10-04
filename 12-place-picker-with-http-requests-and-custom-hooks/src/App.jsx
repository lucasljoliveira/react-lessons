import { useRef, useState, useCallback } from 'react';

import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { fetchUserPlaces, updateUserPlaces } from './http.js';
import Error from './components/Error.jsx';
import { useFetch } from './hooks/useFetch.js';

function App() {
  const selectedPlace = useRef();

  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const {
    fetchedData: userPlaces,
    setfetchedData: setUserPlaces,
    isFetching,
    error: errors
   } = useFetch(fetchUserPlaces, [])

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      return [selectedPlace, ...prevPickedPlaces];
    });

    try{
      await updateUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({message: error.message || "Failed to update user picked places."})
    };
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

    try {
      await updateUserPlaces(userPlaces.filter((place) => place.id !== selectedPlace.current.id));
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to delete user picked place."
      });
    }
    setModalIsOpen(false);
  }, [userPlaces, setUserPlaces]);

  return (
    <>
    <Modal open={errorUpdatingPlaces} onClose={() => setErrorUpdatingPlaces(null)}>
      {errorUpdatingPlaces && (<Error
        title="An error occurred!"
        message={errorUpdatingPlaces.message}
        onConfirm={() => setErrorUpdatingPlaces(null)}
      />)}
    </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {!errors && <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          isLoading={isFetching}
          isLoadingText="Fetching your places..."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../../util/http.js';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate()
  
  const params = useParams();
  const id = params.id

  const { data: event, isPending, isError, error} = useQuery({
    queryKey: ["events", {id}],
    queryFn: ({signal}) => fetchEvent({signal, id})
  });

  const { mutate, isPending: deleteIsPending, isError: deleteIsError, error: deleteError } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["events"],
        refetchType: 'none' // not trigger refetch automatic to the pages with these keys, in this case we can't refetch because the page doesn't exists anymore, we just deleted it.
      });
      navigate("/events");
    }
  })

  function handleDelete() {
    mutate({id})
  }

  function handleStartDelete() {
    setIsDeleting(true);
  }

  function handleStopDelete() {
    setIsDeleting(false);
  }

  const formattedDate = event ? new Date(event.date).toLocaleDateString('en-US', {
    day: "numeric",
    month: "short",
    year: "numeric"
  }) : null

  return (
    <>
      {isDeleting && (
        <Modal onClose={handleStopDelete}>
          <h2>Are you sure?</h2>
          <p>Do you really want to delete this event? This action cannot be undone.</p>
          {deleteIsPending && <p className='center'>Deleting Event, please wait...</p>}
          {!deleteIsPending &&<div className='form-actions'>
            <button onClick={handleStopDelete} className='button-text'>Cancel</button>
            <button onClick={handleDelete} className='button'>Delete</button>
          </div>}
          {deleteIsError && <ErrorBlock title="Failed to delete event" message={deleteError.info?.message || "Failed to delete event, please try again later."} />}
        </Modal>
      )}
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      {isPending && <p className='center'>Loading Event...</p>}
      {isError && <ErrorBlock title="An error occurred" message={error.info?.message || "Failed to fetch event data"} />}
      <article id="event-details">
      {event && <>
        <header>
          <h1>{event.title}</h1>
          <nav>
            <button onClick={handleStartDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3000/${event.image}`} alt={event.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{event.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {event.time}</time>
            </div>
            <p id="event-details-description">{event.description}</p>
          </div>
        </div>
      </>}
      </article>
    </>
  );
}

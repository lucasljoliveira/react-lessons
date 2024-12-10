import { Link, redirect, useNavigate, useParams } from 'react-router-dom';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchEvent, queryClient, updateEvent } from '../../util/http.js';
// import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();
  const id = params.id;

  // Loader is used to get data before the screen is full loaded
  // we are using loader with the same useQuery below, and we could use useLoaderData to get the data from the loader, but if we do that
  // we'll lose the advantages of using useQuery, and because of that we keep useQuery here and on the loader.
  const {data: event, isError, error} = useQuery({
    queryKey: ["events", {id}],
    queryFn: ({signal}) => fetchEvent({signal, id}),
    // staleTime: 10000
  })

  const {mutate} = useMutation({
    mutationFn: updateEvent,
    // onSuccess: () => {
    //   queryClient.invalidateQueries({
    //     queryKey: ["events", {id}]
    //   })
    // } // we are not using onSuccess here because bellow we wrote the optimistic update that is better than onSuccess in this case.
    onMutate: async (data) => {
      const newEvent = data.event;
      await queryClient.cancelQueries({queryKey: ["events", {id}]})
      const previousEvent = queryClient.getQueryData(["events", {id}])

      queryClient.setQueryData(["events", {id}], newEvent);
      
      return { previousEvent }
    }, // Optimistic Update, changing data here instead of wait the backend result
    onError: (error, data, context) => {
      queryClient.setQueryData(["events", {id}], context.previousEvent);
    }, // the onError is triggered if the mutationFn gets an error, and it receives the data returmed from onMutate, this way we can rollback the cache if something went wrong on the process.
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: ["events", {id}]}) // this make sure that the data is updated
    } // is always called after finishes the mutation, with error or not.
  });

  function handleSubmit(formData) {
    mutate({
      id: id,
      event: formData
    });
    navigate("../");
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  // Once we are using loader in this function, we don't need this state here because the data will be loaded before the screen is loaded
  // if (isPending) {
  //   content = (
  //     <div className='center'>
  //       <LoadingIndicator />
  //     </div>
  //   )
  // }

  if (isError) {
    content = (
      <>
        <ErrorBlock title="Failed to load event" message={error.info?.message || "Failed to load event. Please check your inputs and try again later."}/>
        <div className='form-actions'>
          <Link to="../" className='button'>
            Okay
          </Link>
        </div>
      </>
    )
  }

  if (event) {
    content = (
      <EventForm inputData={event} onSubmit={handleSubmit}>
        <Link to="../" className="button-text">
          Cancel
        </Link>
        <button type="submit" className="button">
          Update
        </button>
      </EventForm>
    )
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}

export function loader({params}) {
  const id = params.id;

  return queryClient.fetchQuery({
    queryKey: ["events", {id}],
    queryFn: ({signal}) => fetchEvent({signal, id}),
    staleTime: 10000
  })
}

// This action can be used with react-router instead of using mutate, it has it's up and downsides but maybe we wanna use it.
// If we use it, we gotta remove the mutate from the code, we can see how this work in the "React Query & React Router" class of section 25
// export async function action({request, params}){
//   const formData = await request.formData();

//   const updatedEventData = Object.fromEntries(formData);
//   const id = params.id;
//   await updateEvent({id: id, event: updatedEventData});

//   await queryClient.invalidateQueries(["events", {id}]);

//   return redirect("../");
// }

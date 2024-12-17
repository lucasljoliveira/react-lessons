import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';

export default function NewMeetup(){
    const router = useRouter();

    async function addMeetupHandler(enteredMeetupData){

        console.log(enteredMeetupData);
        const response = await fetch("/api/meetups-new", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(enteredMeetupData)
        })

        const data = await response.json();

        console.log(data);

        router.replace("/")
    }

    return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}
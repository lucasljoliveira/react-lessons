import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb'
import { Fragment } from 'react';

export default function Home(props) {
    return <Fragment>
        <Head>
            <title>React Meetups</title>
            <meta name="description" content="Browse  a huge list of highly active React meetups" /> 
        </Head>
        <MeetupList meetups={props.meetups} />
    </Fragment>
}

export async function getStaticProps(context) {
    // here we can do anything like fetching data.

    const client = await MongoClient.connect("mongodb+srv://<username>:<password>@next-app-test.llta7.mongodb.net/?retryWrites=true&w=majority&appName=next-app-test")

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();

    client.close();

    console.log(meetups);

    return {
        props: {
            meetups: meetups.map( meetup => ({title: meetup.title, address: meetup.address, image: meetup.image, description: meetup.description, id: meetup._id.toString()})),
            revalidate: 10
        }
    }
}

// export async function getServerSideProps(context) {
//     const request = context.req; // You can use this to get data for authentication and check session or cookies.
//     const response = context.res;

//     // here we can do anything like fetching data.
//     return {props: {
//         meetups: MEETUPS
//     }}
// }

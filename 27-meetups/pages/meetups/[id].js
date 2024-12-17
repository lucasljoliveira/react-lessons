import MeetupDetail from '../../components/meetups/MeetupDetail';
import { MongoClient, ObjectId } from 'mongodb'
import Head from 'next/head';
import { Fragment } from 'react';

export default function MeetupDetails(props) {
    const meetup = props.meetup
    return <Fragment>
        <Head>
            <title>{meetup.title}</title>
            <meta name="description" content={meetup.description} />
        </Head>
        <MeetupDetail 
            title={meetup.title}
            image={meetup.image}
            address={meetup.address}
            description={meetup.description}
        />
    </Fragment>
}

export async function getStaticPaths() {
    // get the id's on the database

    const client = await MongoClient.connect("mongodb+srv://<username>:<password>@next-app-test.llta7.mongodb.net/?retryWrites=true&w=majority&appName=next-app-test")

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray(); // Second argument is the field filter, which field should be retrived

    client.close();

    return {
        fallback: false,
        paths: meetups.map((meetup) => {
            return {
                params: {
                    id: meetup._id.toString()
                }
            }
        })
    }
}


export async function getStaticProps(context) {
    const id = context.params.id;

    const client = await MongoClient.connect("mongodb+srv://<username>:<password>@next-app-test.llta7.mongodb.net/?retryWrites=true&w=majority&appName=next-app-test")

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const ameetup = await meetupsCollection.findOne({_id: new ObjectId(id)});

    client.close();
    // fetch data for single meetup
    console.log(ameetup);

    return {
        props: {
            meetup: {
                id: ameetup._id.toString(),
                title: ameetup.title,
                image: ameetup.image,
                address: ameetup.address,
                description: ameetup.description
            }
        }
    }
}

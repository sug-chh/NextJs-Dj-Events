import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import axios from "axios";
import EventItem from "@/components/EventItem";
import qs from 'qs'
import {useRouter} from 'next/router'
import Link from 'next/link'

export default function SearchPage({ events }) {
    const router = useRouter()
  return (
    <Layout title='Search Results'>
    <Link href='/events'>Go Back</Link>
      <h1>Search Result for {router.query.term}</h1>
      {events.length === 0 && <h3>No Events Found</h3>}
      {events.map((evt) => (
        <EventItem evt={evt} key={evt.id}></EventItem>
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {

    const query = qs.stringify({
        _where: {
            _or:[
                {name_contains: term},
                {performers_contains: term},
                {description_contains: term},
                {venue_contains: term}
            ]
        }
    })
  const { data: events } = await axios.get(
    `${API_URL}/events?${query}`
  );
  console.log(events)
  return {
    props: { events: events },
  };
}

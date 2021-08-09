import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import axios from "axios";
import EventItem from "@/components/EventItem";
import Link from "next/link";

export default function Home({ events }) {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem evt={evt} key={evt.id}></EventItem>
      ))}
      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View all Events</a>
        </Link>
      )}
    </Layout>
  );
}

export async function getStaticProps() {
  const { data: events } = await axios.get(
    `${API_URL}/events?_sort=date:ASC&_limit=3`
  );
  return {
    props: { events },
    revalidate: 1,
  };
}

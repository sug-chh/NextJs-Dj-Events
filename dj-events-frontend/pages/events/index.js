import Layout from "@/components/Layout";
import { API_URL, PER_PAGE } from "@/config/index";
import axios from "axios";
import EventItem from "@/components/EventItem";
import Pagination from "@/components/Pagination";


export default function EventsPage({ events, total, page }) {

  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((evt) => (
        <EventItem evt={evt} key={evt.id}></EventItem>
      ))}
      <Pagination total={total} page={page} PER_PAGE={PER_PAGE} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  // Calculate start Page
  const start = Number(page) === 1 ? 0 : (Number(page) - 1) * PER_PAGE;

  // GET total/count

  const { data: eventCount } = await axios.get(`${API_URL}/events/count`);

  // GET events
  const { data: events } = await axios.get(
    `${API_URL}/events?_sort=date:ASC&_limit=${PER_PAGE}&_start=${start}`
  );
  return {
    props: { events: events, page: Number(page), total: eventCount },
  };
}

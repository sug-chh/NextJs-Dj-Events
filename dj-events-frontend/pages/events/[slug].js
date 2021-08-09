import Layout from "@/components/Layout";
import axios from "axios";
import { API_URL } from "@/config/index.js";
import styles from "@/styles/Event.module.css";
import Link from "next/dist/client/link";
import Image from "next/dist/client/image";
import "react-toastify/dist/ReactToastify.css";

export default function EventPage({ evt }) {
  return (
    <Layout>
      <div className={styles.event}>
        <span>
          {new Date(evt.date).toLocaleDateString("en-US")} {evt.time}
        </span>
        <h1>{evt.name}</h1>

        {evt.image && (
          <div className={styles.image}>
            <Image src={evt.image.formats.large.url} width={960} height={600} />
          </div>
        )}
        <h3>Performers :</h3>
        <p>{evt.performers}</p>
        <h3>Description :</h3>
        <p>{evt.description}</p>
        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>Go Back</a>
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const { data: events } = await axios.get(`${API_URL}/events/`);
  const paths = events.map((evt) => ({
    params: {
      slug: evt.slug,
    },
  }));
  console.log(paths);
  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params: { slug } }) {
  const { data: evts } = await axios.get(`${API_URL}/events/?slug=${slug}`);

  return {
    props: {
      evt: evts[0],
    },
    revalidate: 1,
  };
}

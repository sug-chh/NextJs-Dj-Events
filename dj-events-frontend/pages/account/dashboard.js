import { parseCookies } from "@/helpers/index";
import Layout from "@/components/Layout";
import { useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/config/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "@/styles/Dashboard.module.css";
import DashboardEvent from "@/components/DashboardEvent";
import { useRouter } from "next/router";
export default function Dashboard({ events, token }) {
  const router = useRouter();

  useEffect(() => {
    if (!token && !events) {
      router.push("/account/login");
    }
  }, []);
  console.log(events);
  const deleteEvent = async (id) => {
    if (confirm("Are you sure ?")) {
      try {
        const res = await axios.delete(`${API_URL}/events/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        router.push("/events");
      } catch (err) {
        console.log(err.message);
        toast.error("Something Went Wrong!");
      }
    }
  };

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>DashBoard</h1>
        <ToastContainer />
        <h3>My Events</h3>
        {!events ? (
          <p>No events to show</p>
        ) : (
          events.map((evt) => (
            <DashboardEvent evt={evt} handleDelete={deleteEvent} />
          ))
        )}
      </div>
    </Layout>
  );
  ˀ;
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  try {
    const res = await axios.get(`${API_URL}/events/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const events = await res.data;
    return {
      props: {
        events: events,
        token: token,
      },
    };
  } catch (err) {
    return {
      props: {
        events: null,
        token: null,
      },
    };
  }
}

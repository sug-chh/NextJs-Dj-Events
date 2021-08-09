import Head from "next/head";
import styles from "@/styles/Layout.module.css";
import { useRouter } from "next/router";
import Header from "./Header";
import Footer from "./Footer";
import ShowCase from "./ShowCase";

export default function Layout({ title, description, keywords, children }) {
    const router = useRouter()
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>
      </Head>
      <Header />
      {router.pathname === '/' && <ShowCase />}
      <div className={styles.container}>{children}</div>
      <Footer />
    </>
  );
}
Layout.defaultProps = {
  title: "DJ Events | Find the hottest parties",
  description: "Find the latest latest DJ and other musical events",
  keywords: "music, dj, edm, events",
};

import { useState } from "react";
import axios from "axios";
import { API_URL } from "../config/index";
import styles from "@/styles/Form.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageUpload({ token, evtId, imageUploaded }) {
  const [image, setImage] = useState("null");

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "events");
    formData.append("refId", evtId);
    formData.append("field", "image");
    toast.info("Image Uploading Please Wait!");
    try {
      const res = await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.statusText === "OK") {
        imageUploaded();
      }
    } catch (err) {
      toast.error("Error uploading Image");
    }
  }

  function handleFileChange(e) {
    setImage(e.target.files[0]);
  }
  return (
    <div className={styles.form}>
      <h3>Upload Event Image</h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <input type="file" onChange={handleFileChange} />
        </div>
        <input type="submit" value="Upload" className="btn" />
        <ToastContainer />
      </form>
    </div>
  );
}

import { API_URL } from "@/config/index";
import axios from "axios";
import cookie from "cookie";

export default async function (req, res) {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorized" });
      return;
    }
    const { token } = cookie.parse(req.headers.cookie);
    try {
      const strapiRes = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      res.status(200).json({ user: strapiRes.data });
    } catch (err) {
      res.status(403).json({ message: "User is forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} now allowed` });
  }
}

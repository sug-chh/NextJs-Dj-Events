import { API_URL } from "@/config/index";
import axios from "axios";
import cookie from "cookie";

export default async function (req, res) {
  if (req.method === "POST") {
    const { username , email, password } = req.body;
    console.log(username, email, password)
    try {
      const strapiRes = await axios.post(
        `${API_URL}/auth/local/register`,
        {username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (strapiRes.statusText === "OK") {
        //  Set cookie
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("token", strapiRes.data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 Week
            sameSite: "strict",
            path: "/",
          })
        );
        res.status(200).json({ user: strapiRes.data.user });
      }
    } catch (err) {
      res
        .status(err.response.data.statusCode)
        .json({ message: err.response.data.message[0].messages[0].message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).json({ message: `Method ${req.method} now allowed` });
  }
}

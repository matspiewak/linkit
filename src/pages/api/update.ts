import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req,res) => {
  const session = await unstable_getServerSession(req, res, authOptions)
  if (session) {
    // Signed in
    console.log("Session", JSON.stringify(session, null, 2))
  } else {
    // Not Signed in
    res.status(401)
  }
  res.end()
}
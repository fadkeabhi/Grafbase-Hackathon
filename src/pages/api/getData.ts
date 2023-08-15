// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type response = {
  userId: string;
  email: string;
  chats: chats [];
};

type chats = {
    id: number;
    chatName:string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<response>
) {
  const { method } = req;

  if (method === "POST") {
    const { session } = req.body;
    let query = `
      query User {
        user(by: {email: "${session?.user?.email}"}){
          id
          email
          chats(first: 20){
            edges{
              node{
                id
                chatName
              }
            }
          }
        }
      }
        `;
     
    await axios
      .post(process.env.NEXT_GRAPH_ENDPOINT!, { query })
      .then(async(resp) => {
        if (resp === null) {
          return res.status(500);
        }
    
        if (resp.data.user === null) {
          return res.status(404);
        }

        res.json(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

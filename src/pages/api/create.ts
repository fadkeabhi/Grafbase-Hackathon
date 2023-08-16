// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  // process.env.NEXT_GRAPH_ENDPOINT!
  const { session } = req.body;
  if (method === "POST") {
    let query = `
        mutation UserCreate {
            userCreate(input: {
              email: "${session?.user?.email}"
            }) {
              user{
                id,
                email
              }
            }
          }`;
    await axios
      .post(process.env.NEXT_GRAPH_ENDPOINT!, { query })
      .then(async(resp) => {
        if (resp === null) return res.status(500);
        if (
          resp.data.errors?.length &&
          resp.data.errors[0]?.message ==
            `The value "${session?.user?.email}" is already taken on field "email"`
        ) {
          res.json({ response: "Email Exists" });
        }else{
          let query2 = `
          mutation ChatCreate {
            chatCreate(input: {
              chatName:"Admin"
            }) {
              chat {
                chatName
                conversations (last: 50, orderBy: {createdAt:ASC}){
                  edges {
                    node {
                      request
                      response
                      id
                      updatedAt
                      createdAt
                    }
                  }
                }
              }
            }
          }
          `
          await axios.post(process.env.NEXT_GRAPH_ENDPOINT!, { query2 }).then((result)=>{});
        }
      })
      .catch((err) => {
        if (
          err.errors?.length &&
          err.errors[0]?.message ==
            `The value "${session?.user?.email}" is already taken on field "email"`
        ) {
          res.json({ response: "Email Exists" });
        }
      });
      

      

  }
}

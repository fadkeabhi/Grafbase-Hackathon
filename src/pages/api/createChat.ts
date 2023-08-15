// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type Data = {
  response: string;
};

//will return new created chat id in format 
//  {response: chatId;};
//return  status 500

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  // process.env.NEXT_GRAPH_ENDPOINT!
  const { session } = req.body;
  if (method === "POST") {
    let query = `
    mutation UserUpdate {
        userUpdate(by: {email : "${session?.user?.email}"} input: {chats:{create: {
          chatName:"${session?.chatName}"
          
        }}}) {
          user {
            email
            chats(last: 1){
              edges{
                node{
                  id
                  chatName
                }
              }
            }
          }
        }
      }
    `;
    await axios
      .post(process.env.NEXT_GRAPH_ENDPOINT!, { query })
      .then(async(resp) => {
        if (resp === null) return res.status(500);
        res.json({ response: `${resp?.data?.userUpdate?.user?.chats?.edges[0]?.node?.id}` });

      })
      .catch((err) => {
        console.log(err)
        res.status(500)
      });
  }
}

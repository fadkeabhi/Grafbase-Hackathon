// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

type response = {
    chatId: string;
    chatName: string;
    conversations: conversations[];
};

type conversations = {
    conversationsId: number;
    request: string;
    response: string;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<response>
) {
    const { method } = req;

    if (method === "POST") {
        const { chatId } = req.body;
        console.log(chatId);
        let query = `
    query Chat {
        chat(by: {id: "${chatId}"}) {
          id
          chatName
          conversations(last: 50, orderBy: {createdAt:ASC}){
            edges{
              node{
                id
                request
                response
                createdAt
              }
            }
          }
        }
      }
        `;

        await axios
            .post(process.env.NEXT_GRAPH_ENDPOINT!, { query })
            .then((resp) => {
                console.log(resp.data.data.chat);
                if (resp === null) {
                    return res.status(500);
                }

                if (resp.data.data.chat === null) {
                    return res.status(404);
                }

                res.json(resp.data.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

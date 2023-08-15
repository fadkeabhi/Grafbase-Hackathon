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
        const { session } = req.body;
        let query = `
    query Chat {
        chat(by: {id: "${session?.chatId}"}) {
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
            .then(async (resp) => {
                console.log(resp.data.chat);
                if (resp === null) {
                    return res.status(500);
                }

                if (resp.data.chat === null) {
                    return res.status(404);
                }


                var conversations: response["conversations"]  = []

                resp.data.user.chats.edges.forEach(function (element: conversations) {
                    conversations.push(element)
                });

                const response = {
                    chatId: resp?.data?.chat?.id,
                    chatName: resp?.data?.chat?.chatName,
                    conversations: conversations
                }


                res.json(resp.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }
}

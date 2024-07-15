import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { text, session, chatId } = req.body;
  if (!text) res.status(400).json({ response: "Please provide a prompt !!" });
  if (!session)
    res.status(400).json({ response: "Please provide a prompt !!" });

  const configuration = new Configuration({
    apiKey: process.env.NEXT_OPEN_AI_KEY!,
  });
  const openai = new OpenAIApi(configuration);
  let resString: string | undefined;

  await openai
    .createCompletion({
      model: "text-davinci-003",
      prompt: text,
      temperature: 0.9,
      max_tokens: 2048,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    })
    .then((result) => {
      resString = result.data.choices[0].text
        ?.split('"')
        .join("$")
        .replace(/\s+/g, " ");
    });

  let query = `
  mutation ChatUpdate {
    chatUpdate(by: {id: "${chatId}"} input: {conversations : {create : {request:"${text}", response: "${resString}"} }}){
    chat{
      id
      conversations(last: 1){
        edges{
          node{
            id
            request
          response
          }
        }
      }
      }
    }
  }
      `;

  const result = await axios.post(process.env.NEXT_GRAPH_ENDPOINT!, { query });

  // await axios.post(process.env.NEXT_GRAPH_ENDPOINT!,)

  res.status(200).json({ response: "Success !!" });
}

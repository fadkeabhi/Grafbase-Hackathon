import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";
import axios from "axios";

type Data = {
  response: string;
};

type MSG = {

}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {text,session} = req.body;
  if(!text) res.status(400).json({response:"Please provide a prompt !!"});
  if(!session) res.status(400).json({response:"Please provide a prompt !!"});
  console.log(text)
  console.log(session);
  // const configuration = new Configuration({
  //   apiKey: process.env.NEXT_OPEN_AI_KEY!,
  // });
  // const openai = new OpenAIApi(configuration);

  // const response = await openai.createCompletion({
  //   model: "text-davinci-003",
  //   prompt: "who is carryminati ?",
  //   temperature: 0.9,
  //   max_tokens: 2048,
  //   frequency_penalty: 0.5,
  //   presence_penalty: 0,
  // });
  // const message : MSG 

  let query = `
  mutation MessageCreate {
    messageCreate(input: {
      request:"hii,
      response:"hlw",
    }) {
      message {
        request
        response
        id
      }
    }
  }
          `
  const result = await axios.post(process.env.NEXT_GRAPH_ENDPOINT!, { query });
  console.log(result.data);

  // await axios.post(process.env.NEXT_GRAPH_ENDPOINT!,)

  res.status(200).json({ response: "success"});
}

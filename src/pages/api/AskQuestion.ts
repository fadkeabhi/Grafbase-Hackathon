import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

type Data = {
  response: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    const configuration = new Configuration({
        apiKey: process.env.NEXT_OPEN_AI_KEY!,
      });
      const openai = new OpenAIApi(configuration);
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Hii",
        temperature: 0.9,
        max_tokens: 2048,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
      console.log(response);
      
      res.status(200).json({ response: "Success !!" });
    // console.log('hii');
    // res.status(200).json({response:"Done !!"})
}

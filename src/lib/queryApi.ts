import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPEN_AI_KEY!,
});

const openai = new OpenAIApi(configuration);

const query = async () => {
  try {
    const res = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: "Hii",
        temperature: 0.9,
        max_tokens: 2048,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default query;

import { Request, Response } from 'express';
import axios from 'axios';
import { OPENAI_KEY, OPENAI_API_URL } from './../util/constant';

interface OpenAiQuestionRequestInput {
  question: string;
}

const openAiQuestionRequest = async (req: Request, res: Response): Promise<void | Response> => {
  try {
    const requestInput: OpenAiQuestionRequestInput = req.body;
    const response = await axios.post(
      `${OPENAI_API_URL}/chat/completions`, {
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: requestInput.question}],
        temperature: 0.7,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_KEY}`,
        }
      }
    )
    // console.log (response.data);
    const reply = response.data.choices[0]['message']['content'];
    res.status(200).json({ message: reply }); 
  } catch (error: any) {
    console.error(`Error making OpenAI request ${error?.message}`)
    res.status(422).json({ error: `Error making OpenAI request ${error?.message}` }); 
  }
}

export default openAiQuestionRequest;
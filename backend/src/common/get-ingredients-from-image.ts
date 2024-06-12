import { OpenAI } from 'openai';
import { ChatCompletion } from 'openai/resources';

const openai = new OpenAI();

export async function getIngredientsFromImage(baseImage: string) {
  const response: ChatCompletion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "list the ingredients shown in the photo, list the ingredients and nothing else, do not add any content, use Polish language. If there are no ingredients in the photo, simply write 'no ingredients'"
          },
          {
            type: "image_url",
            image_url: {
              url: baseImage
            }
          }
        ]
      }
    ]
  });
  return response.choices[0].message.content;
}
import { NextResponse } from 'next/server';
import { OpenAI } from 'openai';

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    return NextResponse.json({ error: 'OpenAI API key is not set' }, { status: 500 });
  }

  const openai = new OpenAI({ apiKey });

  const { topic } = await req.json();

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { 
          role: "system", 
          content: "You are a quote generator. Generate a quote and its author based on the given topic. Always return a JSON object with 'quote' and 'author' keys."
        },
        { 
          role: "user", 
          content: `Generate a quote about ${topic}.` 
        }
      ],
      max_tokens: 100,
    });

    const result = JSON.parse(completion.choices[0].message.content || '{}');
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error generating quote:', error);
    return NextResponse.json({ error: 'Failed to generate quote' }, { status: 500 });
  }
}
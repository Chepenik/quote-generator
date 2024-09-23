declare module 'openai' {
  interface ChatCompletionMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
  }

  interface ChatCompletionOptions {
    model: string;
    messages: ChatCompletionMessage[];
    max_tokens?: number;
  }

  interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
      index: number;
      message: ChatCompletionMessage;
      finish_reason: string;
    }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }

  class OpenAI {
    constructor(config: { apiKey: string });
    chat: {
      completions: {
        create(options: ChatCompletionOptions): Promise<ChatCompletion>;
      };
    };
  }

  export { OpenAI };
}
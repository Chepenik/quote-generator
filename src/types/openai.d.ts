declare module 'openai' {
  interface ChatCompletionCreateParams {
    model: string;
    messages: Array<{ role: string; content: string }>;
    max_tokens?: number;
    // Add other possible parameters as needed
  }

  interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
      index: number;
      message: {
        role: string;
        content: string;
      };
      finish_reason: string;
    }>;
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  }

  class OpenAI {
    constructor(config: { apiKey: string | undefined, dangerouslyAllowBrowser?: boolean });
    chat: {
      completions: {
        create: (params: ChatCompletionCreateParams) => Promise<ChatCompletion>;
      };
    };
  }
  export default OpenAI;
}
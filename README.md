# Quote Generator

This is a Next.js application that generates quotes using OpenAI's GPT-3.5 model. Users can get random quotes, generate AI-powered quotes based on topics, and save their favorite quotes.

## Features

- Generate random quotes from a curated list
- Create AI-generated quotes based on user-provided topics
- Save favorite quotes
- Dark mode support
- Responsive design

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn
- An OpenAI API key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/quote-generator.git
   cd quote-generator
   ```

2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

4. Run the development server:
   ```
   npm run dev
   ```
   or
   ```
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application can be easily deployed on platforms like Vercel or Netlify. Make sure to set the `OPENAI_API_KEY` environment variable in your deployment settings.

## Built With

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI API](https://openai.com/api/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

- OpenAI for providing the GPT-3.5 model
- The Next.js team for the amazing framework

# Automated Tech News Blog with Next.js and OpenAI

This project is an automated tech news blog built with Next.js. It fetches news articles from the web, parses them using Mozilla's Readability, classifies them using OpenAI's embeddings model, and publishes them on the blog.

## Features

- **News Article Fetching**: Uses Brave Search API to find and extract relevant news articles.
- **Content Parsing**: Utilizes Mozilla's Readability to parse and clean up news content.
- **Content Classification**: Classifies news articles using OpenAI's embeddings model.
- **Automated Publishing**: Automatically publishes classified news articles on the Next.js blog.

## Technologies Used

- **Next.js**: Framework for building the blog.
- [**Brave Search API**](https://api.search.brave.com/): For fetching relevant news articles and images. We have 2,000 monthly requests and 1 per second in the free tier. So we can pull news every 30 minutes for free
- **Mozilla Readability**: For parsing and cleaning up news content.
- **OpenAI Embeddings Model**: For classifying the news articles.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/luisignaciocc/tech-news
   cd tech-news
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables in a `.env` file:

   ```env
   POSTGRES_DATABASE=""
   POSTGRES_HOST=""
   POSTGRES_PASSWORD=""
   POSTGRES_PRISMA_URL=""
   POSTGRES_URL=""
   POSTGRES_URL_NON_POOLING=""
   POSTGRES_URL_NO_SSL=""
   POSTGRES_USER=""

   OPENAI_API_KEY=""

   CLOUDINARY_CLOUD_NAME=""
   CLOUDINARY_API_KEY=""
   CLOUDINARY_API_SECRET=""
   CLOUDINARY_URL=""

   BRAVE_SEARCH_API_KEY=""

   API_KEY=""
   ```

## Usage

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Access the blog in your browser at `http://localhost:3000`.

## Functionalities

- **News Article Fetching**: Integration with Brave API can be found in `/lib/brave.js`.
- **Content Parsing**: Mozilla's Readability logic is in `/lib/readability.js`.
- **Content Classification**: OpenAI integration is in `/lib/openai.js`.
- **Automated Publishing**: The script for automating publication is in `/scripts/publish.js`.

## Contributing

Contributions are welcome. To contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to your fork (`git push origin feature/new-feature`).
5. Open a Pull Request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For questions or support, please open an issue in the repository or contact [me@luisignacio.cc].

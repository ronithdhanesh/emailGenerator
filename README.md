# Ronith-AI-MailGen

An AI-powered email generator that helps you create professional, friendly, urgent, or persuasive emails using Google's Gemini AI model. This project consists of a React frontend and a FastAPI backend.

## Features

- **AI-Powered Email Generation**: Uses Google's Gemini Flash model to generate emails based on your input.
- **Customizable Tone**: Choose from Professional, Friendly, Urgent, or Persuasive tones.
- **Real-time Preview**: See the generated email subject and content instantly.
- **Modern UI**: Built with React and styled with Tailwind CSS for a sleek, responsive interface.
- **CORS Enabled**: Backend configured to allow requests from the frontend.

## Tech Stack

### Backend

- **FastAPI**: High-performance web framework for building APIs.
- **LangChain**: Framework for building applications with LLMs.
- **Google Generative AI**: Gemini Flash model for email generation.
- **Pydantic**: Data validation and serialization.

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: HTTP client for making API requests.

## Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- Google AI API Key (for Gemini model)

## Installation

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a virtual environment:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:

   ```bash
   pip install fastapi uvicorn langchain-google-genai python-dotenv pydantic
   ```

4. Create a `.env` file in the backend directory and add your Google API key:
   ```
   GOOGLE_API_KEY=your_google_api_key_here
   ```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Start the backend server:

   ```bash
   cd backend
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

2. In a new terminal, start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and go to `http://localhost:5173`.

4. Fill in the form with:

   - **To Email**: Recipient's email address
   - **Detail**: Main points to cover in the email
   - **Tone**: Desired tone (Professional, Friendly, Urgent, Persuasive)

5. Click "GENERATE EMAIL" to create your email.

## API Endpoints

### POST /generate-email/

Generates an email based on the provided parameters.

**Request Body:**

```json
{
  "toEmail": "recipient@example.com",
  "detail": "Details to include in the email",
  "tone": "Professional"
}
```

**Response:**

```json
{
  "subject": "Generated Subject",
  "content": "Generated email content"
}
```

## Project Structure

```
email-Generator/
├── backend/
│   ├── main.py          # FastAPI application
│   ├── llm_utils.py     # LLM configuration and prompt template
│   ├── models.py        # Pydantic models (if any)
│   └── .env             # Environment variables
├── frontend/
│   ├── src/
│   │   ├── App.jsx      # Main React component
│   │   ├── main.jsx     # React entry point
│   │   ├── App.css      # Component styles
│   │   └── index.css    # Global styles
│   ├── api.js           # Axios configuration
│   ├── package.json     # Frontend dependencies
│   ├── vite.config.js   # Vite configuration
│   └── index.html       # HTML template
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Google Generative AI for the powerful Gemini model
- LangChain for simplifying LLM integration
- FastAPI and React communities for excellent documentation and support

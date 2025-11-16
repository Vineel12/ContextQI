
  # ContextIQ Mobile UI Design

  This is a code bundle for ContextIQ Mobile UI Design. The original project is available at https://www.figma.com/design/3Uy8QUl6bjYdzaQ18YruQN/ContextIQ-Mobile-UI-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
  ## Getting Started

  ### Prerequisites
  - Node.js 18+
  - npm 9+
  - Python 3.10+ (for the FastAPI backend)

  ### Install dependencies
  ```bash
  npm install
  ```

  ### Run the web app
  ```bash
  npm run dev
  ```

  ### Configure and run the backend (FastAPI)
  1. Copy `.env.example` to `.env` and set values:
    - `VITE_API_BASE_URL` for the frontend (e.g., `http://127.0.0.1:8000`)
    - Backend env like `GEMINI_API_KEY`, `DISCORD_*`, `SUPABASE_*` as needed
  2. Install Python deps and start the server (example):
  ```bash
  pip install fastapi uvicorn supabase google-generativeai requests soundfile python-dotenv openai-whisper torch --upgrade
  uvicorn new_backend:app --reload --host 127.0.0.1 --port 8000
  ```

  The backend has CORS enabled for localhost Vite dev servers.

  ### Connect the chat UI to backend
  Set `VITE_API_BASE_URL` in a `.env.local` or `.env` file. The AI Assistant screen will send queries to `POST /chat` and render replies. If the variable is not set, the UI will show a hint.

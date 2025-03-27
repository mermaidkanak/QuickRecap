# QuickRecap

QuickRecap is a responsive web application that allows users to input a YouTube video link and receive a summarized version of the video's content in either bullet points or a paragraph format.

## Features

- **YouTube Video Summarization**: Get concise summaries of any YouTube video with transcripts available
- **Multiple Summary Formats**: Choose between bullet points or paragraph format
- **Responsive Design**: Works on mobile, tablet, and desktop devices
- **Dark Mode**: Toggle between light and dark themes
- **Copy to Clipboard**: Easily copy the generated summary
- **Download Summary**: Save the summary as a text file
- **Shareable Links**: Share your summarized content with others

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- Axios for API requests

### Backend
- FastAPI (Python)
- OpenAI API for summarization (with fallback to local model)
- youtube-transcript-api for transcript extraction
- pytube for video information

## Getting Started

### Prerequisites
- Node.js (v14+)
- Python (v3.8+)
- npm or yarn

### Quick Start

The easiest way to start the application is to use one of the provided start scripts:

#### Windows (PowerShell) - Recommended
```
.\start.ps1
```

#### Windows (Command Prompt)
```
start.bat
```

This will launch both the frontend and backend servers.

### Troubleshooting Scripts

If you encounter connection issues, we provide several troubleshooting scripts:

#### Debug Script
```
.\debug.ps1
```
This script checks your environment, dependencies, and server connectivity to help identify issues.

#### Start Backend Only
```
.\start_backend.ps1
```
This script starts only the backend server, which is useful for troubleshooting API issues.

#### Start Frontend Only
```
.\start_frontend.ps1
```
This script starts only the frontend server, assuming the backend is already running.

### Manual Installation and Setup

#### Frontend

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

#### Backend

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Create a virtual environment:
   ```
   python -m venv venv
   ```

3. Activate the virtual environment:
   - Windows:
     ```
     venv\Scripts\activate
     ```
   - Mac/Linux:
     ```
     source venv/bin/activate
     ```

4. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

5. Copy the example environment file:
   ```
   cp .env.example .env
   ```

6. Edit the `.env` file and add your OpenAI API key (optional)

7. Start the backend server:
   ```
   python run.py
   ```

## Troubleshooting

### "Failed to connect to server" Error
If you see a "Failed to connect to server" error:
1. Make sure the backend is running (check if http://localhost:5000 is accessible)
2. Run the `.\debug.ps1` script to diagnose connectivity issues
3. Try starting the backend separately using `.\start_backend.ps1`
4. Check that your firewall isn't blocking the connection

### PowerShell Command Errors
If you encounter errors with the `&&` operator in PowerShell, use semicolons instead:
```
cd frontend; npm start
```

### Backend Not Starting
If the backend fails to start due to model loading errors, you can:
1. Provide an OpenAI API key in the `.env` file
2. Or use a smaller local model by editing `backend/app/services/summary_service.py`

### Frontend API Connection Issues
If the frontend can't connect to the backend API:
1. Check that both servers are running
2. Verify that the `.env` file in the frontend directory has `REACT_APP_API_URL=http://localhost:5000/api`
3. Run the frontend and backend in separate terminals using the individual start scripts

## Usage

1. Open your browser and navigate to `http://localhost:3000`
2. Paste a YouTube URL in the search box
3. Select your preferred summary format (bullet points or paragraph)
4. Click "Generate Summary"
5. View, copy, or download the generated summary

## License

MIT

## Acknowledgements

- OpenAI for providing the summarization API
- YouTube for the video content
- All the open-source libraries that made this project possible 
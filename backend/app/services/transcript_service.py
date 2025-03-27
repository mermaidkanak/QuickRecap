from youtube_transcript_api import YouTubeTranscriptApi, NoTranscriptFound, TranscriptsDisabled, VideoUnavailable
import re

class TranscriptError(Exception):
    """Exception raised for errors in the transcript service."""
    pass

def extract_video_id(url: str) -> str:
    """Extract YouTube video ID from URL."""
    # Regular expression patterns for different YouTube URL formats
    patterns = [
        r'(?:youtube\.com\/watch\?v=|youtu.be\/)([a-zA-Z0-9_-]{11})',
        r'(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})',
        r'(?:youtube\.com\/v\/)([a-zA-Z0-9_-]{11})'
    ]
    
    for pattern in patterns:
        match = re.search(pattern, url)
        if match:
            return match.group(1)
    
    raise TranscriptError(f"Could not extract video ID from URL: {url}")

def get_transcript(youtube_url: str) -> str:
    """Extract transcript from YouTube video URL."""
    try:
        video_id = extract_video_id(youtube_url)
        
        # Get the transcript
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Combine all text parts
        transcript_text = " ".join([item['text'] for item in transcript_list])
        
        if not transcript_text:
            raise TranscriptError("The transcript is empty.")
        
        return transcript_text
        
    except NoTranscriptFound:
        raise TranscriptError("No transcript found for this video. It might not have captions or automatic transcription available.")
    except TranscriptsDisabled:
        raise TranscriptError("Transcripts are disabled for this video.")
    except VideoUnavailable:
        raise TranscriptError("The video is unavailable. It might be private or deleted.")
    except Exception as e:
        raise TranscriptError(f"An error occurred while getting the transcript: {str(e)}") 
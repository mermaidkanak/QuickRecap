from pytube import YouTube
from typing import Dict, Any
from .transcript_service import extract_video_id

class VideoInfoError(Exception):
    """Exception raised for errors in the video info service."""
    pass

def get_video_info(youtube_url: str) -> Dict[str, Any]:
    """Extract video information from a YouTube URL."""
    try:
        # Attempt to extract video ID
        video_id = extract_video_id(youtube_url)
        
        # Create a YouTube object
        yt = YouTube(youtube_url)
        
        # Extract information
        info = {
            "id": video_id,
            "title": yt.title,
            "author": yt.author,
            "length": yt.length,
            "thumbnail_url": yt.thumbnail_url,
            "description": yt.description
        }
        
        return info
        
    except Exception as e:
        raise VideoInfoError(f"Failed to extract video information: {str(e)}") 
import os
from typing import Literal
from openai import OpenAI
import traceback
from transformers import pipeline, BartForConditionalGeneration, BartTokenizer

class SummaryError(Exception):
    """Exception raised for errors in the summary service."""
    pass

# Initialize OpenAI client if API key is available
USE_OPENAI = False
client = None
try:
    openai_api_key = os.getenv("OPENAI_API_KEY")
    if openai_api_key:
        client = OpenAI(api_key=openai_api_key)
        USE_OPENAI = True
        print("OpenAI client initialized successfully.")
except Exception as e:
    print(f"Failed to initialize OpenAI client: {e}")
    USE_OPENAI = False

# Initialize local model if OpenAI is not available
summarizer = None
if not USE_OPENAI:
    try:
        print("Attempting to initialize local summarization model...")
        model_name = "facebook/bart-large-cnn"
        summarizer = pipeline("summarization", model=model_name)
        print("Local summarization model initialized successfully.")
    except Exception as e:
        print(f"Warning: Failed to initialize local summarization model: {str(e)}")
        # We don't raise here to allow the app to start, but summarization will use fallback

# Fallback summarization function that doesn't require a model
def fallback_summarize(text: str, format_type: Literal["bullets", "paragraph"]) -> str:
    """Provides a simple fallback summarization method when no model is available."""
    MAX_WORDS = 200
    
    # Split the text into sentences and take a subset
    import re
    sentences = re.split(r'(?<=[.!?]) +', text)
    
    if len(sentences) <= 5:
        result = " ".join(sentences)
    else:
        # Take first 2 sentences, middle sentence, and last 2 sentences
        result = " ".join([
            sentences[0], 
            sentences[1],
            sentences[len(sentences)//2],
            sentences[-2],
            sentences[-1]
        ])
    
    # Further truncate if too long
    words = result.split()
    if len(words) > MAX_WORDS:
        result = " ".join(words[:MAX_WORDS]) + "..."
    
    # Format as bullets if requested
    if format_type == "bullets":
        sentences = re.split(r'(?<=[.!?]) +', result)
        return "\n• " + "\n• ".join(filter(None, sentences))
    
    return result

def generate_summary(
    text: str, 
    format_type: Literal["bullets", "paragraph"] = "bullets",
    max_length: int = 500
) -> str:
    """Generate a summary of the given text using the appropriate model."""
    try:
        if not text:
            raise SummaryError("No text provided to summarize.")
        
        # Truncate input text if needed
        max_input_length = 4000  # Reasonable maximum for most models
        if len(text) > max_input_length:
            text = text[:max_input_length]
        
        # Generate summary using OpenAI model if available
        if USE_OPENAI and client:
            try:
                return _generate_openai_summary(text, format_type, max_length)
            except Exception as e:
                print(f"OpenAI summarization failed: {e}")
                print("Falling back to local model...")
        
        # Otherwise use local transformers model
        if summarizer:
            try:
                return _generate_local_summary(text, format_type, max_length)
            except Exception as e:
                print(f"Local model summarization failed: {e}")
                print("Falling back to basic summarization...")
        
        # If all else fails, use the fallback method
        print("Using fallback summarization method (no models available)")
        return fallback_summarize(text, format_type)
    
    except Exception as e:
        print("Summarization error:", e)
        traceback.print_exc()
        if isinstance(e, SummaryError):
            raise
        raise SummaryError(f"Failed to generate summary: {str(e)}")

def _generate_openai_summary(
    text: str, 
    format_type: Literal["bullets", "paragraph"],
    max_length: int
) -> str:
    """Generate summary using OpenAI API."""
    try:
        format_prompt = "in bullet points" if format_type == "bullets" else "in a concise paragraph"
        prompt = f"Summarize the following transcript {format_prompt}, capturing the key points and main ideas:\n\n{text}"
        
        response = client.completions.create(
            model="gpt-3.5-turbo-instruct",  # or a different model
            prompt=prompt,
            max_tokens=max_length,
            temperature=0.5
        )
        
        return response.choices[0].text.strip()
    
    except Exception as e:
        raise SummaryError(f"OpenAI API error: {str(e)}")

def _generate_local_summary(
    text: str, 
    format_type: Literal["bullets", "paragraph"],
    max_length: int
) -> str:
    """Generate summary using local Transformers model."""
    try:
        if not summarizer:
            raise SummaryError("Local summarization model is not initialized.")
            
        # Generate raw summary
        summary = summarizer(text, max_length=max_length, min_length=min(100, max_length//2), do_sample=False)[0]['summary_text']
        
        # Format as bullets if requested
        if format_type == "bullets":
            # Split into sentences and format as bullets
            import re
            sentences = re.split(r'(?<=[.!?]) +', summary)
            return "\n• " + "\n• ".join(filter(None, sentences))
        
        return summary
    
    except Exception as e:
        raise SummaryError(f"Local model error: {str(e)}") 
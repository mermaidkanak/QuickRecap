import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

interface SummaryResponse {
  summary: string;
  videoTitle: string;
  videoUrl: string;
  error?: string;
}

interface ApiError {
  message: string;
  error?: string;
}

export const generateSummary = async (
  youtubeUrl: string, 
  format: 'bullets' | 'paragraph'
): Promise<SummaryResponse> => {
  try {
    console.log(`Connecting to API at: ${API_URL}`);
    const response = await axios.post<SummaryResponse>(`${API_URL}/summarize`, {
      youtube_url: youtubeUrl,
      format: format
    });
    
    return response.data;
  } catch (error: any) {
    console.error('API error:', error);
    
    // If we have a response with data, use that for the error
    if (error?.response?.data) {
      throw new Error(
        error.response.data.detail || 
        error.response.data.message || 
        'An error occurred while processing your request.'
      );
    }
    
    // Specific handling for connection errors
    if (error?.message?.includes('Network Error')) {
      throw new Error(
        'Failed to connect to the server. Please make sure the backend is running.'
      );
    }
    
    // Default error
    throw new Error('Failed to connect to the server. Please try again later.');
  }
};

// Create a named constant for the default export
const apiService = {
  generateSummary
};

export default apiService; 
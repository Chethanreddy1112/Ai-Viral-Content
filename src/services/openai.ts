
// OpenAI Service configuration
const TEXT_MODEL = "gpt-4o-mini";
const IMAGE_MODEL = "dall-e-3";
const API_BASE_URL = "https://api.openai.com/v1";

// Store the API key in localStorage for demo purposes
// In production, this should be handled through a backend service
const STORAGE_KEY = "openai_api_key";

// Function to get the API key from storage
const getApiKey = () => {
  return localStorage.getItem(STORAGE_KEY);
};

// Function to set the API key in storage
export const setApiKey = (key: string) => {
  localStorage.setItem(STORAGE_KEY, key);
};

// Initialize with the provided API key
setApiKey("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");

// Check if we have an API key
const hasApiKey = () => {
  const key = getApiKey();
  return key != null && key !== "";
};

/**
 * Generate text from OpenAI API
 * @param prompt The text prompt to send to OpenAI
 * @returns The generated text
 */
const generateText = async (prompt: string): Promise<string> => {
  if (!hasApiKey()) {
    throw new Error("OpenAI API key not found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getApiKey()}`
      },
      body: JSON.stringify({
        model: TEXT_MODEL,
        messages: [
          { role: "system", content: "You are a helpful content creation assistant. Generate concise, engaging content based on user prompts." },
          { role: "user", content: prompt }
        ],
        max_tokens: 500
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate text');
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error generating text:', error);
    throw error;
  }
};

/**
 * Generate an image from OpenAI API
 * @param prompt The text prompt to generate an image from
 * @returns The URL of the generated image
 */
const generateImage = async (prompt: string): Promise<string> => {
  if (!hasApiKey()) {
    throw new Error("OpenAI API key not found");
  }

  try {
    const response = await fetch(`${API_BASE_URL}/images/generations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getApiKey()}`
      },
      body: JSON.stringify({
        model: IMAGE_MODEL,
        prompt: prompt,
        n: 1,
        size: "1024x1024"
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to generate image');
    }

    const data = await response.json();
    return data.data[0].url;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

export const openai = {
  generateText,
  generateImage,
  setApiKey
};

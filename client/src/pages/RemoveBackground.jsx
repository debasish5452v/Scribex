import { Eraser, Sparkles, Download } from "lucide-react";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  /*
    RemoveBackground component provides an AI-powered background removal tool for uploaded images.
    LOGIC EXPLANATION:
    - Uses useState to manage the uploaded image file (input state stores the File object)
    - File input accepts various image formats (JPG, PNG, etc.) specified by accept="image/*"
    - onSubmitHandler prevents default form submission and would process the uploaded image
    - Left side contains file upload form with validation and submit button
    - Right side shows placeholder for processed image (would display result after background removal)
    - Form uses controlled component pattern where input state manages the selected file
    - In production, would send image to AI service API and display processed result
  */

  // State to store the uploaded image file (File object from file input)
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const fileInputRef = React.useRef(null);

  // Clerk hook to get authentication token for API requests
  const { getToken } = useAuth();

  // Download processed image function
  const downloadImage = async () => {
    if (content) {
      try {
        const response = await fetch(content);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'background-removed-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        toast.success('Image downloaded successfully!');
      } catch (error) {
        toast.error('Failed to download image');
      }
    }
  };

  // Form submission handler - processes the uploaded image for background removal
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!input) {
        toast.error('Please select an image first');
        return;
      }

      setLoading(true); // Show loading spinner
      console.log('Starting image upload...', { fileName: input.name, fileSize: input.size });

      // Create FormData object and append uploaded image file
      const formData = new FormData();
      formData.append('image', input);

      // Log FormData content for debugging
      console.log('FormData created:', {
        hasFile: formData.has('image'),
        contentLength: input.size,
        fileName: input.name
      });

      // Get authentication token
      const token = await getToken();
      console.log('Auth token obtained:', token ? 'Yes' : 'No');

      // Make API call to backend to remove image background using AI
      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          // Add timeout and show upload progress
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        }
      );

      // Handle API response
      if (data.success) {
        setContent(data.content); // Store the processed image URL/content
      } else {
        toast.error(data.message); // Show error message if processing failed
      }
    } catch (error) {
      
      console.error('Upload failed:', error);
      if (error.response) {
        // The server responded with a status code outside the 2xx range
        console.error('Server error:', error.response.data);
        toast.error(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Network error:', error.request);
        toast.error('Network error - please check your connection');
      } else {
        // Something happened in setting up the request
        console.error('Request setup error:', error.message);
        toast.error('Error uploading image');
      }
    } finally {
      setLoading(false); // Hide loading spinner after processing
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column: File upload form for background removal */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        {/* Form header with sparkles icon and title */}
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Remover</h1>
        </div>
        
        {/* File upload section */}
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <form 
          onSubmit={onSubmitHandler}
          className="w-full"
        >
          <div className="mt-2 space-y-4">
            <input
              type="file"
              name="image"
              id="bgRemovalInput"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;

                if (file.size > 10 * 1024 * 1024) {
                  toast.error('File size should be less than 10MB');
                  e.target.value = '';
                  setInput(null);
                  return;
                }

                const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
                if (!validTypes.includes(file.type)) {
                  toast.error('Please select a valid image (JPEG, PNG, or WebP)');
                  e.target.value = '';
                  setInput(null);
                  return;
                }

                setInput(file);
                toast.success('Image selected successfully!');
              }}
              className="hidden"
            />
            
            <button
              type="button"
              onClick={() => document.getElementById('bgRemovalInput').click()}
              className="w-full h-12 px-4 bg-red-50 text-red-700 rounded-lg
                border-2 border-dashed border-red-200 hover:bg-red-100
                flex items-center justify-center gap-2 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
              Choose an Image
            </button>

            {/* Show selected file name if any */}
            {input && (
              <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
                <span className="text-sm text-gray-600 truncate">
                  {input.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setInput(null);
                    document.getElementById('bgRemovalInput').value = '';
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            )}

          {/* Helper text showing supported file formats */}
          <p className="text-xs text-gray-500 font-light mt-1">
            Supports: JPG, PNG, and WebP formats
          </p>

          {/* Submit button with gradient background and eraser icon */}
          <button 
            type="submit"
            disabled={loading || !input} 
            className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg ${(!input || loading) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? (
              <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            ) : (
              <Eraser className="w-5" />
            )}
            Remove Background
          </button>
        </form>
      </div>

      {/* Right column: Results display area for processed image */}
      <div className="w-full max-w-xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[28rem] ">
        {/* Results section header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Eraser className="w-5 h-5 text-[#FF4938]" />
            <h1 className="text-xl font-semibold">Processed Image</h1>
          </div>
          {content && (
            <button
              onClick={downloadImage}
              className="flex items-center gap-2 px-3 py-1.5 bg-red-50 text-red-600 text-xs rounded-md hover:bg-red-100 transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Download
            </button>
          )}
        </div>

        {/* 
          Results container: uses flex-1 to take remaining space and centers content
          In production, this would conditionally render:
          - Loading spinner while processing the image
          - Processed image with transparent background when complete
          - Download button for the processed image
          - Error message if processing fails
          - Empty state (current) when no processing has been attempted
        */}

        {
          !content ? 
          (
            <div className="flex-1 flex justify-center items-center">
              {/* Empty state: shows placeholder when no image has been processed yet */}
              <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
                <Eraser className="w-9 h-9 " />
                <p>Upload an image and click "Remove Background" to get started</p>
              </div>
            </div>
          ) :
          <img src={content} alt="image" className="mt-3 w-full h-full"/>
        }
      </div>
    </div>
  );
};

export default RemoveBackground;

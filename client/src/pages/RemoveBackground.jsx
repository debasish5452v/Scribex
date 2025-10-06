import { Eraser, Sparkles, Download } from "lucide-react";
import React, { useState, useRef } from "react";
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const fileInputRef = useRef(null);

  const { getToken } = useAuth();

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
        console.error('Download error:', error);
        toast.error('Failed to download image');
      }
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    
    if (!input) {
      toast.error('Please select an image first');
      return;
    }

    try {
      setLoading(true);
      console.log('Starting upload:', { fileName: input.name, fileSize: input.size });

      const formData = new FormData();
      formData.append('image', input);

      console.log('FormData created:', {
        hasFile: formData.has('image'),
        fileName: input.name
      });

      const token = await getToken();
      console.log('Auth token obtained:', token ? 'Yes' : 'No');

      const { data } = await axios.post(
        "/api/ai/remove-image-background",
        formData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percent}%`);
          }
        }
      );

      if (data.success) {
        setContent(data.content);
        toast.success('Background removed successfully!');
      } else {
        toast.error(data.message || 'Failed to process image');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      if (error.response) {
        console.error('Server error:', error.response.data);
        toast.error(error.response.data.message || 'Server error occurred');
      } else if (error.request) {
        console.error('Network error:', error.request);
        toast.error('Network error - please check your connection');
      } else {
        console.error('Error:', error.message);
        toast.error('Error uploading image');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Remover</h1>
        </div>
        
        {/* Upload section */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-2">Upload Image</p>
          
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                try {
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
                } catch (error) {
                  console.error('File selection error:', error);
                  toast.error('Error selecting file');
                  e.target.value = '';
                  setInput(null);
                }
              }}
              className="hidden"
            />

            {/* Custom upload button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-12 flex items-center justify-center gap-2 
                bg-red-50 text-red-700 rounded-lg border-2 border-dashed border-red-200 
                hover:bg-red-100 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Choose an Image
            </button>

            {/* Selected file info */}
            {input && (
              <div className="p-2 bg-gray-50 rounded-lg flex items-center justify-between">
                <span className="text-sm text-gray-600 truncate max-w-[80%]">
                  {input.name}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    if (fileInputRef.current) fileInputRef.current.value = '';
                    setInput(null);
                  }}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            <p className="text-xs text-gray-500">
              Supports: JPG, PNG, and WebP formats (max 10MB)
            </p>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !input}
              className={`w-full flex justify-center items-center gap-2 
                bg-gradient-to-r from-[#F6AB41] to-[#FF4938] text-white 
                px-4 py-3 rounded-lg transition-all
                ${!input || loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md cursor-pointer'}`}
            >
              {loading ? (
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Eraser className="w-5" />
              )}
              Remove Background
            </button>
          </form>
        </div>
      </div>

      {/* Right column: Results display */}
      <div className="w-full max-w-xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[28rem]">
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

        {!content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Eraser className="w-9 h-9" />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="Processed" className="mt-3 w-full h-full object-contain" />
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
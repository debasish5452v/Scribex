import { Eraser, Sparkles, Download } from "lucide-react";
import React from "react";
import { useState } from "react";
import axios from 'axios';
import { useAuth } from "@clerk/clerk-react";
import toast from 'react-hot-toast';

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveBackground = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
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
        toast.error('Failed to download image');
      }
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (!input) {
        toast.error('Please select an image first');
        return;
      }

      setLoading(true);
      console.log('Starting image upload...', { fileName: input.name, fileSize: input.size });

      const formData = new FormData();
      formData.append('image', input);

      console.log('FormData created:', {
        hasFile: formData.has('image'),
        contentLength: input.size,
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
          timeout: 30000,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percentCompleted}%`);
          }
        }
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
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
        console.error('Request setup error:', error.message);
        toast.error('Error uploading image');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      <div className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#FF4938]" />
          <h1 className="text-xl font-semibold">Background Remover</h1>
        </div>
        
        <p className="mt-6 text-sm font-medium">Upload Image</p>
        <form 
          onSubmit={onSubmitHandler}
          className="w-full"
        >
          <div className="relative mt-2">
            <input
              type="file"
              name="image"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) {
                  toast.error('Please select an image');
                  return;
                }

                if (file.size > 10 * 1024 * 1024) {
                  toast.error('File size should be less than 10MB');
                  e.target.value = '';
                  return;
                }

                setInput(file);
                toast.success('Image selected successfully!');
              }}
              className="w-full h-12 p-2 border border-gray-300 rounded-lg
                text-sm text-gray-700 cursor-pointer
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-red-50 file:text-red-700"
              style={{
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none'
              }}
            />
          </div>

          {input && (
            <p className="mt-2 text-sm text-gray-600">
              Selected: {input.name}
            </p>
          )}

          <p className="text-xs text-gray-500 font-light mt-1">
            Supports: JPG, PNG, and WebP formats
          </p>

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

      <div className="w-full max-w-xl p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-[28rem] ">
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
              <Eraser className="w-9 h-9 " />
              <p>Upload an image and click "Remove Background" to get started</p>
            </div>
          </div>
        ) : (
          <img src={content} alt="image" className="mt-3 w-full h-full"/>
        )}
      </div>
    </div>
  );
};

export default RemoveBackground;
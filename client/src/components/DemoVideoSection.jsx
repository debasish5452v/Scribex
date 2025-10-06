import React, { useState } from 'react';
import { Play, X, Sparkles, Zap, FileText, Image as ImageIcon } from 'lucide-react';

const DemoVideoSection = () => {
  /*
    DemoVideoSection component displays a video demo section with modal popup.
    Features:
    - Eye-catching video thumbnail with play button
    - Modal popup for full-screen video playback
    - Feature highlights around the video
    - Responsive design for all screen sizes
  */

  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // You can replace this with your actual demo video URL
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ"; // Replace with your demo video

  const features = [
    {
      icon: Sparkles,
      title: "AI-Powered Writing",
      description: "Generate articles in seconds"
    },
    {
      icon: ImageIcon,
      title: "Image Generation",
      description: "Create stunning visuals"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant results every time"
    },
    {
      icon: FileText,
      title: "Multiple Formats",
      description: "Articles, blogs, titles & more"
    }
  ];

  return (
    <div id="demo-video-section" className="w-full px-4 sm:px-20 xl:px-32 py-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4">
          <Play className="w-4 h-4" />
          Watch Demo
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          See Scribex in Action
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Watch how easy it is to create amazing content with our AI-powered tools. 
          From idea to publication in minutes.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Video Thumbnail/Player */}
          <div className="relative group">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Video Thumbnail */}
              <div 
                className="relative cursor-pointer"
                onClick={() => setIsVideoOpen(true)}
              >
                {/* Placeholder thumbnail - replace with your actual thumbnail */}
                <div className="aspect-video bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                      <Play className="w-10 h-10 ml-1" fill="white" />
                    </div>
                    <p className="text-lg font-semibold">Click to Play Demo</p>
                    <p className="text-sm opacity-90">2:30 minutes</p>
                  </div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300"></div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl"></div>
          </div>

          {/* Features List */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              What You'll See in the Demo
            </h3>
            
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4">
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                <Play className="w-5 h-5" />
                Watch Full Demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setIsVideoOpen(false)}
        >
          <div 
            className="relative w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsVideoOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Video container */}
            <div className="relative rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={videoUrl}
                  title="Scribex Demo Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoVideoSection;

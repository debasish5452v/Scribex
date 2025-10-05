import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  /*
    useNavigate is a React Router hook that lets you programmatically change the page (route) in your app.
    Here, we use it to send the user to a different page when they click a button.
  */
  const navigate = useNavigate();

  /*
    This component returns the main hero section of your homepage.
    The hero section is the big, eye-catching area at the top of a website that introduces what your app does.
    It includes:
      - A headline and description to explain your app's value
      - Two buttons for user actions (start using the app or watch a demo)
      - A trust indicator showing how many users trust your app
    The layout uses Tailwind CSS utility classes for styling and responsiveness.
  */
  return (
    <div
      className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full items-center justify-start bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen pt-28 pb-8 sm:pt-24 sm:pb-16"
    >
      {/* Animated badge */}
      <div className="mb-5 sm:mb-4 inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-full border border-purple-200 shadow-sm">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
        <span className="text-xs font-medium text-gray-700">✨ AI-Powered Content Creation</span>
      </div>

      {/*
        Headline and description area with new gradient text effect
      */}
      <div className="text-center mb-6 sm:mb-5 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold mx-auto leading-tight mb-3">
          Create amazing content
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-clip-text text-transparent animate-gradient">
            with AI tools
          </span>
        </h1>
        <p className="mt-3 sm:mt-2 max-w-2xl mx-auto text-sm text-gray-600 leading-relaxed px-2">
          Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
        </p>
      </div>

      {/*
        Action buttons with enhanced design and icons
      */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        <button
          onClick={() => navigate("/ai")}
          className="group relative bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-xl hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-sm font-medium flex items-center gap-1.5"
        >
          <span>Start creating now</span>
          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </button>
        <button 
          onClick={() => navigate("/ai")}
          className="bg-white px-5 py-2 rounded-xl border-2 border-gray-200 hover:border-purple-500 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer text-sm font-medium text-gray-700 hover:text-purple-600 flex items-center gap-1.5"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>Explore tools</span>
        </button>
      </div>

      {/*
        Trust indicator with enhanced styling
      */}
      <div className="flex items-center justify-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm mb-8 sm:mb-0 sm:mt-3">
        <div className="flex -space-x-2">
          <img src={assets.user_group} alt="" className="h-6" />
        </div>
        <div className="h-3 w-px bg-gray-300"></div>
        <span className="text-xs font-medium text-gray-700">
          Trusted by <span className="text-purple-600">10k+</span> people
        </span>
      </div>

      {/* Animated company logos section - infinite scrolling marquee */}
      <div className="mt-16 w-full overflow-hidden relative">
        <div className="flex w-full flex-nowrap overflow-hidden">
          <div className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
              alt="LinkedIn"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
              alt="Instagram"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
              alt="Facebook"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
              alt="X (Twitter)"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
              alt="Slack"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
              alt="Framer"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex items-center justify-center md:justify-start [&_img]:max-w-none animate-infinite-scroll" aria-hidden="true">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png"
              alt="LinkedIn"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg"
              alt="Instagram"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg"
              alt="Facebook"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/ce/X_logo_2023.svg"
              alt="X (Twitter)"
              className="mx-10 h-6 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
              alt="Slack"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg"
              alt="Framer"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
              alt="Netflix"
              className="mx-10 h-8 object-contain hover:scale-110 transition-transform"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

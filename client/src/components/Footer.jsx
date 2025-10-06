import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";


const Footer = () => {
  // useNavigate is a React Router hook that lets you change the page programmatically
  const navigate = useNavigate();

  /*
    The Footer component displays the bottom section of your website.
    It provides:
      - Branding and a short description of your app
      - Company navigation links (Home, About, Contact, Privacy)
      - A newsletter subscription form (UI only, not functional yet)
      - Copyright notice
    The layout is responsive and styled using Tailwind CSS utility classes.
  */
  return (
    <footer className="px-4 sm:px-6 md:px-16 lg:px-24 xl:px-32 pt-8 w-full text-gray-500 mt-12 sm:mt-20">
      {/*
        The main content area of the footer is split into two columns on desktop:
          - Left: Logo and app description
          - Right: Company links and newsletter form
        On mobile, these stack vertically.
      */}
      <div className="flex flex-col md:flex-row justify-between w-full gap-6 sm:gap-10 border-b border-gray-500/30 pb-6">
        {/* Branding and app description */}
        <div className="md:max-w-96">
          <img className="h-8 sm:h-9" src={assets.logo} alt="Scribex Logo" />
          <p className="mt-4 sm:mt-6 text-xs sm:text-sm leading-relaxed">
            Experience the power of AI with Scribex. Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
          </p>
        </div>
        {/* Company navigation links and newsletter form */}
        <div className="flex-1 flex flex-col sm:flex-row items-start md:justify-end gap-8 sm:gap-20">
          {/*
            Company navigation links: clicking scrolls to top and navigates home (can be customized)
            All links currently navigate to the homepage and scroll to the top smoothly.
            You can update the navigate() path for real About, Contact, Privacy pages in the future.
          */}
          <div className="w-full sm:w-auto">
            <h2 className="font-semibold mb-3 sm:mb-5 text-gray-800 text-sm sm:text-base">Company</h2>
            <ul className="text-xs sm:text-sm space-y-2">
              <li>
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  className="cursor-pointer"
                  onClick={() => {
                    navigate("/");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
          {/*
            Newsletter subscription form (UI only, not connected to backend)
            This is just for display; you can add real functionality later.
          */}
          <div className="w-full sm:w-auto">
            <h2 className="font-semibold text-gray-800 mb-3 sm:mb-5 text-sm sm:text-base">
              Subscribe to our newsletter
            </h2>
            <div className="text-xs sm:text-sm space-y-2">
              <p className="leading-relaxed">
                The latest news, articles, and resources, sent to your inbox
                weekly.
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-3 sm:pt-4">
                <input
                  className="border border-gray-500/30 placeholder-gray-500 text-xs sm:text-sm focus:ring-2 ring-indigo-600 outline-none w-full sm:max-w-64 h-9 rounded px-2"
                  type="email"
                  placeholder="Enter your email"
                />
                <button className="bg-primary w-full sm:w-24 h-9 text-white text-xs sm:text-sm rounded cursor-pointer hover:bg-purple-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*
        Copyright and legal notice:
        - Shows the year and app name
        - Clicking the app name scrolls to top and navigates home
      */}
      <p className="pt-3 sm:pt-4 text-center text-[10px] sm:text-xs md:text-sm pb-4 sm:pb-5">
        Copyright 2025 ©{" "}
        <a
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="cursor-pointer hover:text-purple-600 transition-colors"
        >
          Scribex
        </a>
        . All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;

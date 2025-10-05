import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { ArrowRight, User } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";

const Navbar = () => {
    // Initialize navigation hook
    const navigate = useNavigate();
    // Get current user info from Clerk
    const {user} = useUser();
    // Get sign-in function from Clerk
    const {openSignIn} = useClerk();

    // Render the navigation bar
    return (
        <div className="fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer">
            {/* Logo, navigates to home on click */}
            <img
                src={assets.logo}
                alt="logo"
                className='w-36 sm:w-48 cursor-pointer'
                onClick={() => navigate("/")}
            />

            {/* Show user button if logged in, else show Get Started button */}
            {
                user ? <UserButton /> : 
                (
                    <button 
                        onClick={openSignIn} 
                        className='group relative flex items-center gap-2 rounded-full text-sm font-medium cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/50 hover:scale-105 active:scale-95'
                    >
                        <span className="relative z-10">Get Started</span>
                        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                )
            }
        </div>
    );
};


// Exporting Navbar component as default
export default Navbar;

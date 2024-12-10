

import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="text-center px-4 sm:px-6 md:px-8 py-10 sm:py-12 lg:py-16">
            <div className="flex flex-col gap-5 my-10">
                {/* Tagline */}
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
                    No. 1 Job Hunt Website
                </span>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
                </h1>

                {/* Description */}
                <p className="text-lg sm:text-xl text-gray-600">
                "Your life does not get better by chance, it gets better by change." — Jim Rohn
                </p>

                {/* Search Bar */}
                <div className="flex flex-col sm:flex-row w-full sm:w-[60%] md:w-[50%] lg:w-[40%] mx-auto mt-6">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#6A38C2] sm:rounded-l-lg"
                    />
                    <Button
                        onClick={searchJobHandler}
                        className="w-full sm:w-20 rounded-r-full bg-[#6A38C2] text-white flex items-center justify-center sm:rounded-r-lg mt-3 sm:mt-0 sm:ml-2"
                    >
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection;

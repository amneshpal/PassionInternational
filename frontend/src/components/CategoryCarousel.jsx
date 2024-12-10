

import React, { useRef } from 'react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "FullStack Developer",
    "Data Scientist",
    "Graphic Designer",
    "UI/UX Designer",
    "Product Manager",
    "Software Engineer",
    "Digital Marketing Specialist",
    "Web Designer",
    "DevOps Engineer",
    "Mobile App Developer",
    "System Administrator",
    "Quality Assurance Engineer",
    "Business Analyst",
    "Cloud Engineer",
    // Non-technical roles
    "Project Manager",
    "HR Specialist",
    "Content Writer",
    "Sales Executive",
    "Customer Support",
    "Marketing Strategist",
    "Accountant",
    "Operations Manager",
    "Public Relations Specialist",
    "Legal Advisor",
    "Recruiter",
    "Event Coordinator",
    "Administrative Assistant",
    "Finance Manager",
    "Business Executive",
    "Compliance Officer"
];

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const carouselRef = useRef(null); // Create a ref for the carousel content

    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    // Manual scroll handlers
    const handleNext = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: 300, // Scroll 300px to the right
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };

    const handlePrevious = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({
                left: -300, // Scroll 300px to the left
                behavior: 'smooth', // Smooth scrolling
            });
        }
    };

    return (
        <div className="w-full max-w-screen-xl mx-auto my-12 px-4 sm:px-6 lg:px-8">
            <div className="relative">
                {/* Carousel Content - Add the ref here */}
                <div 
                    ref={carouselRef} 
                    className="flex gap-4 overflow-x-auto pb-8"
                >
                    {
                        category.map((cat, index) => (
                            <div key={index} className="flex-shrink-0 w-36 sm:w-44 md:w-52 lg:w-60 xl:w-72">
                                <Button
                                    onClick={() => searchJobHandler(cat)}
                                    variant="outline"
                                    className="w-full h-12 sm:h-14 lg:h-16 rounded-full text-xs sm:text-sm lg:text-base xl:text-lg border-[#6A38C2] text-[#6A38C2] hover:bg-[#6A38C2] hover:text-white transition-all"
                                >
                                    {cat}
                                </Button>
                            </div>
                        ))
                    }
                </div>

                {/* Carousel Navigation Buttons */}
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-4">
                    <Button 
                        onClick={handlePrevious} 
                        className="bg-[#6A38C2] text-white rounded-full p-2 shadow-lg hover:bg-[#5b30a6]"
                    >
                        <span className="text-lg">‹</span>
                    </Button>
                    <Button 
                        onClick={handleNext} 
                        className="bg-[#6A38C2] text-white rounded-full p-2 shadow-lg hover:bg-[#5b30a6]"
                    >
                        <span className="text-lg">›</span>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CategoryCarousel;



import React, { useState, useEffect, useCallback } from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'; // AvatarFallback for missing images
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({ job }) => {
    const navigate = useNavigate();

    // State to manage bookmark and save for later status
    const [isBookmarked, setIsBookmarked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Check localStorage for the job's saved/bookmarked status
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        const bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];

        setIsSaved(savedJobs.includes(job?._id));
        setIsBookmarked(bookmarkedJobs.includes(job?._id));
    }, [job?._id]);

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    };

    const handleBookmark = useCallback(() => {
        const updatedStatus = !isBookmarked;
        setIsBookmarked(updatedStatus);

        let bookmarkedJobs = JSON.parse(localStorage.getItem('bookmarkedJobs')) || [];
        if (updatedStatus) {
            bookmarkedJobs.push(job?._id);
        } else {
            bookmarkedJobs = bookmarkedJobs.filter(id => id !== job?._id);
        }
        localStorage.setItem('bookmarkedJobs', JSON.stringify(bookmarkedJobs));
    }, [isBookmarked, job?._id]);

    const handleSaveForLater = useCallback(() => {
        const updatedStatus = !isSaved;
        setIsSaved(updatedStatus);

        let savedJobs = JSON.parse(localStorage.getItem('savedJobs')) || [];
        if (updatedStatus) {
            savedJobs.push(job?._id);
        } else {
            savedJobs = savedJobs.filter(id => id !== job?._id);
        }
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
    }, [isSaved, job?._id]);

    return (
        <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full">
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button 
                    variant="outline" 
                    className="rounded-full" 
                    size="icon" 
                    onClick={handleBookmark}
                >
                    <Bookmark color={isBookmarked ? '#FBBF24' : 'gray'} />
                </Button>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 my-3">
                <Button className="p-3 sm:p-4" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage 
                            src={job?.company?.logo || "https://via.placeholder.com/50"} // Default image for missing logos
                        />
                        <AvatarFallback>{job?.company?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-lg sm:text-xl">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            <div>
                <h1 className="font-bold text-lg sm:text-xl my-3">{job?.title}</h1>
                <p className="text-sm text-gray-600">{job?.description}</p>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-4 flex-wrap">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                    {job?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            <div className="flex items-center gap-3 sm:gap-4 mt-5 flex-col sm:flex-row">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto mb-3 sm:mb-0"
                >
                    Details
                </Button>
                <Button 
                    onClick={handleSaveForLater}
                    className={`w-full sm:w-auto ${isSaved ? 'bg-[#7209b7]' : 'bg-gray-500'}`}
                >
                    {isSaved ? "Saved" : "Save For Later"}
                </Button>
            </div>
        </div>
    );
};

export default Job;

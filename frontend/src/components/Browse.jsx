


import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, isLoading, error } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [savedJobs, setSavedJobs] = useState([]);

    useEffect(() => {
        // Retrieve saved job IDs from localStorage
        const savedJobIds = JSON.parse(localStorage.getItem('savedJobs')) || [];
        console.log('Saved job IDs in localStorage:', savedJobIds);

        // Filter saved jobs based on savedJobIds and allJobs
        const savedJobDetails = allJobs.filter((job) => savedJobIds.includes(job._id));
        console.log('Saved job details:', savedJobDetails);

        setSavedJobs(savedJobDetails);
    }, [allJobs]); // This useEffect will run whenever allJobs are updated.

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery("")); // Clear search query on unmount
        };
    }, [dispatch]);

    // Conditional rendering based on job list state
    const renderJobs = () => {
        if (isLoading) {
            return <div className="text-center">Loading...</div>; // Display a loading message or spinner
        }

        if (error) {
            return <div className="text-center text-red-500">Error loading jobs: {error}</div>; // Handle errors if any
        }

        if (allJobs.length === 0) {
            return <div className="text-center">No jobs found based on your search criteria.</div>;
        }

        return allJobs.map((job) => <Job key={job._id} job={job} />);
    };

    return (
        <div>
            <Navbar />
            <div className="max-w-7xl mx-auto my-10 px-4">
                <h1 className="font-bold text-xl my-5 sm:text-2xl lg:text-3xl">
                    Search Results ({allJobs.length})
                </h1>

                <h2 className="font-bold text-lg my-5 sm:text-xl lg:text-2xl">
                    Saved Jobs ({savedJobs.length})
                </h2>
                {/* Display saved jobs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                    {savedJobs.length > 0 ? (
                        savedJobs.map((job) => <Job key={job._id} job={job} />)
                    ) : (
                        <div>No saved jobs yet!</div>
                    )}
                </div>

                {/* Display all jobs */}
                <h2 className="font-bold text-lg my-5 sm:text-xl lg:text-2xl">
                    All Jobs ({allJobs.length})
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderJobs()}
                </div>
            </div>
        </div>
    );
}

export default Browse;



import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/description/${job._id}`)}
            className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer transition-all hover:shadow-2xl hover:border-gray-300'>
            
            <div>
                <h1 className='font-medium text-lg sm:text-xl'>{job?.company?.name}</h1>
                <p className='text-sm text-gray-500 sm:text-base'>India</p>
            </div>

            <div className='my-3'>
                <h1 className='font-bold text-lg sm:text-xl my-2'>{job?.title}</h1>
                <p className='text-sm text-gray-600 sm:text-base truncate sm:whitespace-normal'>{job?.description}</p>
            </div>

            <div className='flex flex-wrap gap-2 mt-4'>
                <Badge className='text-blue-700 font-bold' variant="ghost">{job?.position} Positions</Badge>
                <Badge className='text-[#F83002] font-bold' variant="ghost">{job?.jobType}</Badge>
                <Badge className='text-[#7209b7] font-bold' variant="ghost">{job?.salary} LPA</Badge>
            </div>
        </div>
    );
}

export default LatestJobCards;

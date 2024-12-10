
import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error('Error creating company.');
        }
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
                {/* Heading Section */}
                <div className='my-5'>
                    <h1 className='font-bold text-2xl sm:text-3xl'>Your Company Name</h1>
                    <p className='text-gray-500 text-sm sm:text-base'>What would you like to give your company name? You can change this later.</p>
                </div>

                {/* Input Section */}
                <div>
                    <Label className="text-sm">Company Name</Label>
                    <Input
                        type="text"
                        className="my-2 w-full"
                        placeholder="JobHunt, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>

                {/* Button Section */}
                <div className='flex flex-col sm:flex-row items-center gap-4 my-10'>
                    <Button variant="outline" onClick={() => navigate("/admin/companies")}>Cancel</Button>
                    <Button onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;



import { setSingleCompany } from '@/redux/companySlice';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

// Custom Hook to get a company by ID
const useGetCompanyById = (companyId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleCompany = async () => {
            try {
                // Ensure you're using the correct URL and endpoint
                const res = await axios.get(`${COMPANY_API_END_POINT}/get/${companyId}`, { withCredentials: true });
                
                if (res.data.success) {
                    dispatch(setSingleCompany(res.data.company));  // Dispatch to Redux
                }
            } catch (error) {
                console.log("Error fetching company:", error);
            }
        };

        if (companyId) {
            fetchSingleCompany();
        }
    }, [companyId, dispatch]);  // Dependency on companyId

};

export default useGetCompanyById;

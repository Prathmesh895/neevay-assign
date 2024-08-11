import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";

const cities = [
    "Pune",
    "Mumbai",
    "Nashik",
    "Kolhapur",
    "Nagpur",
    "Aurangabad",
    "Sangli",
    "Solapur",
    "Jalgaon",
    "Latur",
    "Beed"
];

function Navbar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [city, setCity] = useState(searchParams.get("city") || '');
    const [vendorType, setVendorType] = useState(searchParams.get("vendorType") || '');
    const [services, setServices] = useState(searchParams.get("services") || '');

    const handleSelectChange = (setter, value) => {
        setter(value);
        const newParams = new URLSearchParams(searchParams);
        if (value) {
            newParams.set("vendorType", value);
        } else {
            newParams.delete("vendorType");
        }
        setSearchParams(newParams);
    };

    const handleCityChange = (e) => {
        setCity(e.target.value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("city", e.target.value);
        setSearchParams(newParams);
    };

    const handleSearchChange = (e) => {
        setServices(e.target.value);
        const newParams = new URLSearchParams(searchParams);
        newParams.set("services", e.target.value);
        setSearchParams(newParams);
    };

    useEffect(() => {
        // Sync the component's state with the URL parameters
        setCity(searchParams.get("city") || '');
        setVendorType(searchParams.get("vendorType") || '');
        setServices(searchParams.get("services") || '');
    }, [searchParams]);

    return (
        <nav className='bg-cover fixed top-0 w-full shadow p-5 bg-white z-20 flex justify-between items-center'>
            <div>
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/homepage_4_neevayLogo.svg" alt="Neevay" className=' w-[112px] h-[34px] md:h-[39px] md:w-full' />
            </div>
            {/* search bar content */}
            <div className='bg-gray-100 p-1 flex rounded-full border items-center basis-1/2'>
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/user_icon_searchbar.svg" alt="Vendor Type" className='pl-3' />
                {/* select verified vendor */}
                <select
                    id="vendor-type"
                    name="vendor-type"
                    value={vendorType}
                    onChange={(e) => handleSelectChange(setVendorType, e.target.value)}
                    className="basis-[20%] w-full p-2 border-r bg-gray-100 text-gray-700 focus:outline-none focus:border-transparent"
                >
                    <option value="">Vendor Type</option>
                    <option value="Material Only (Trader)">Material Only (Trader)</option>
                    <option value="Material Only (Manufacturer)">Material Only (Manufacturer)</option>
                    <option value="Labour Only (Labour Contractor)">Labour Only (Labour Contractor)</option>
                    <option value="Labour with Material (Providing and Fixing)">Labour with Material (Providing and Fixing)</option>
                    <option value="Consultant">Consultant</option>
                </select>
                {/* search by service or material */}
                <div className="w-full basis-1/2">
                    <div className="relative">
                        <input
                            type="search"
                            id="search"
                            name="search"
                            value={services}
                            onChange={handleSearchChange}
                            className="w-full p-2 pl-10 border-r bg-gray-100 text-gray-700 focus:outline-none focus:border-transparent"
                            placeholder="Search by service or material"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-500" />
                        </div>
                    </div>
                </div>
                {/* select vendor by city */}
                <img
                    src="https://storagereponeevaydevcdn.blob.core.windows.net/business/searchbar_location_nn.svg"
                    alt="Location"
                    className="ml-[12px]"
                />
                <select
                    id="city"
                    name="city"
                    value={city}
                    onChange={handleCityChange}
                    className="basis-[20%] w-full p-2 bg-gray-100 text-gray-700 focus-none focus:outline-none focus:border-transparent"
                >
                    <option value="">City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            {/* signup and login button */}
            <div className='flex items-center space-x-10'>
                <p className='text-orange-600 font-medium cursor-pointer'>Join as Vendor</p>
                <button className='h-[43px] px-6 md:h-[44px] md:px-0 md:w-[108px] xs:text-sm md:text-base mx-4 border hover:font-bold border-black'>Login</button>
                <button className='flex items-center justify-around md:text-sm xs:text-sm  md:h-[44px] md:w-[135px] w-[100px] h-[43px] hover:font-bold text-white bg-gradient-to-r from-[#24242D] to-[#0B0B1A] border-l-4 border-[#F16500]'>
                    Signup
                </button>
            </div>
        </nav>
    );
}

export default Navbar;

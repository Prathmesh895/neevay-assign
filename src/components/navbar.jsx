import React from 'react'
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
function navbar() {

    return (
        <nav className='bg-cover fixed top-0 w-full shadow p-5 bg-white z-20 flex justify-between items-center'>
            <div>
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/homepage_4_neevayLogo.svg" alt="Neevay" className=' w-[112px] h-[34px] md:h-[39px] md:w-full' />
            </div>
            {/* search bar content */}
            <div className='bg-gray-100 p-1 flex rounded-full border items-center basis-1/2'>
                <img src="https://storagereponeevaydevcdn.blob.core.windows.net/business/user_icon_searchbar.svg" alt="Vendor Type"
                    className='pl-3' />
                {/* select verified vender*/}
                <select
                    id="vendor-type"
                    name="vendor-type"
                    className=" basis-[20%] w-full p-2 border-r   bg-gray-100 text-gray-700 focus:outline-none focus:border-transparent"
                >
                    <option value="" >Vendor Type</option>
                    <option value="verified">Material Only (Trader)</option>
                    <option value="verified">Material Only (Manufacturer)</option>
                    <option value="verified">Labour Only (Labour Contractor)</option>
                    <option value="verified">Labour with Material (Providing and Fixing)</option>
                    <option value="Consultant">Consultant</option>
                </select>
                {/* select vender by service or material*/}
                <div className="w-full basis-1/2">
                    <div className="relative">
                        <input
                            type="search"
                            id="search"
                            name="search"
                            className="w-full p-2 pl-10 border-r  bg-gray-100 text-gray-700 focus:outline-none focus:border-transparent"
                            placeholder="Search by service or material"
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-500" />
                        </div>
                    </div>
                </div>
                {/* select vender by city*/}
                <img
                    src="https://storagereponeevaydevcdn.blob.core.windows.net/business/searchbar_location_nn.svg"
                    alt="Location"
                    className="ml-[12px]"
                />
                <select
                    id="vendor-type" name="vendor-type"
                    className=" basis-[20%] w-full p-2  bg-gray-100 text-gray-700 focus-none focus:outline-none focus:border-transparent"
                >
                    <option value="" >City</option>
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            {/* signup and login button */}
            <div className='flex items-center space-x-10'>
                <p className='text-orange-600 font-medium cursor-pointer'>Join as Vender</p>
                <button className=' h-[43px] px-6 md:h-[44px] md:px-0 md:w-[108px] xs:text-sm md:text-base mx-4 border hover:font-bold border-black'>Login</button>
                <button className='flex items-center justify-around md:text-sm xs:text-sm  md:h-[44px] md:w-[135px] w-[100px] h-[43px] hover:font-bold text-white bg-gradient-to-r from-[#24242D] to-[#0B0B1A] border-l-4 border-[#F16500]'>
                    Signup
                </button>
            </div>


        </nav>
    )
}

export default navbar

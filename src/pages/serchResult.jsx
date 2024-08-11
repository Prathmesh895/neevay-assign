import React, { useState } from 'react';
import venderData from '../venderData.json';
import { RiVerifiedBadgeFill, RiCloseLine, RiContactsBook3Line } from "react-icons/ri";
import { BsCurrencyRupee, BsBuildingCheck } from "react-icons/bs";
import { PiUsersThreeLight, PiCalendarDotsLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineContacts } from "react-icons/md";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";


function SearchResult() {
    const [currentPage, setCurrentPage] = useState(1)
    const perpage = 5;
    const totalPages = Math.ceil(venderData.length / perpage);

    const currentpageItems = venderData.slice((currentPage - 1) * perpage, currentPage * perpage)
    // Handle page change
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    return (
        <section className='mt-32'>
{/* show contact details */}
            <div className='bg-white w-1/2 shadow'>
                <div className='flex justify-between items-center bg-black text-gray-200 text-sm p-3 px-5'>
                    <div className='flex items-center '>
                        <div className='w-5 h-5 border-l-orange-900 mr-2 border-orange-400 border-4 rounded-full'></div><span className='font-semibold'>4/10</span>
                        contact views remaining
                    </div>
                    <h1> <span className='font-semibold text-white border-b cursor-pointer'>Upgrade</span> to view more</h1>
                </div>
                <div className='flex justify-between items-center py- px-5'>
                    <h1 className='flex justify-between items-center text-2xl font-semibold space-x-3' ><RiContactsBook3Line /> <span>Contact Info</span></h1>
                    <p className='flex justify-between items-center space-x-3 bg-gray-100 px-5 py-2 rounded-full' >Close <RiCloseLine size={20} /></p>
                </div>
                {/* Bussiness contact Details */}
                <div className='bg-gray-100 py-5 px-10 space-y-2'>
                    <h1 className='font-semibold text-gray-600'>Bussiness contact Details</h1>
                    <div className='flex space-x-2 items-center'>
                        <MdOutlineContacts size={50} />
                        <div>
                            <p className='font-semibold'>PS Engineerign</p>
                            <p className='text-gray-600 text-sm'> Support@gmail.com</p>
                            <p className='text-gray-600 text-sm'>89898999</p>
                        </div>
                    </div>
                </div>
                {/* Bussiness contact Details */}
                <div className='bg-gray-100 py-5 px-10 space-y-2'>
                    <h1 className='font-semibold text-gray-600'>Team contact Details</h1>
                    <div className='flex space-x-2 items-center'>
                        <div className='bg-black text-white font-semibold flex items-center justify-center w-10 h-10 rounded-full'>PS</div>
                        <div>
                            <p className='font-semibold'>Name</p>
                            <p className='text-gray-600 text-sm'> Support@gmail.com</p>
                            <p className='text-gray-600 text-sm'>89898999</p>
                        </div>
                    </div>
                </div>

            </div>
            <div className=''>
                {currentpageItems.map((vender) => (
                    <div className='bg-white w-full my-5 p-8' key={vender.vendorId}>
                        {/* First Section */}
                        <div className='flex space-x-10'>
                            <div className='bg-gray-200 p-1'>
                                <img src="/gallery-icon.svg" alt="gallery-icon" className='w-44' />
                            </div>
                            <div>
                                <h1 className='text-lg font-semibold'>{vender.vendorName}</h1>
                                {/* Section */}
                                <div className='flex justify-between items-center my-2'>
                                    <div>
                                        {vender.verifiedStatus && (
                                            <div className='flex items-center space-x-2 my-1'>
                                                <RiVerifiedBadgeFill className='text-blue-500' size={16} />
                                                <p className='text-xs font-semibold text-gray-400'>Verified Vendor</p>
                                            </div>
                                        )}
                                        <p className='text-md font-semibold text-gray-500'>{vender.services}</p>
                                    </div>
                                    <p className='flex items-center space-x-1 border rounded-full py-1 px-3 h-9 font-semibold text-sm'>
                                        <CiLocationOn size={16} />
                                        <span>{vender.officeAddress.City}, MH</span>
                                    </p>
                                </div>
                                <div className='bg-gray-100 p-2 grid grid-cols-2 gap-5 px-5'>
                                    <div className='flex items-center'>
                                        <BsCurrencyRupee />
                                        <p className='text-gray-700 text-md'>Turnover: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vender.turnover}</p>
                                    </div>
                                    <div className='flex items-center space-x-1'>
                                        <PiUsersThreeLight size={20} />
                                        <p className='text-gray-700 text-md'>Labor Strength: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vender.laborStrength}</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <PiCalendarDotsLight size={18} />
                                        <p className='text-gray-700 text-md'>Business Age: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vender.businessAge}</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <BsBuildingCheck />
                                        <p className='text-gray-700 text-md'>Projects Completed: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vender.projectsCompleted}</p>
                                    </div>
                                </div>
                            </div>
                            {/* View Profile */}
                            <div className=''>
                                <h1 className='text-black font-bold underline cursor-pointer'>View Profile</h1>
                            </div>
                        </div>
                        <div className='mt-3 flex justify-between mr-5'>
                            <p className='text-sm text-gray-600 basis-[75%]'>{vender.vendorDescription}... <span className='text-blue-500 underline font-semibold cursor-pointer'>see more</span></p>
                            <div className='bg-black text-white font-semibold py-2 px-5 text-sm cursor-pointer'>
                                View Contact
                            </div>
                        </div>
                        {/* on click view contact */}
                        {/* <div className='bg-black'>
                            <h1>4/10 contact views remaining</h1>
                            <h1> <span className='font-semibold text-white'>upgrade</span> to view more</h1>
                            
                        </div> */}
                    </div>
                ))}
            </div>
            {/* pagination  */}
            <div className='flex justify-end space-x-2 my-4 '>
                <button
                    className='bg-black text-white  px-3 py-2 flex items-center justify-center'
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <MdOutlineKeyboardArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`w-10 px-3 py-2 flex items-center justify-center ${currentPage === index + 1 ? 'bg-black text-white' : 'border bg-white text-black'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className='bg-black text-white  px-3 py-2 flex items-center justify-center'
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <MdOutlineKeyboardArrowRight />
                </button>
            </div>
        </section>
    );
}

export default SearchResult;

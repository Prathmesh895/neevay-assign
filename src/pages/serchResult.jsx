import React, { useEffect, useState } from 'react';
import venderData from '../venderData.json';
import { RiVerifiedBadgeFill, RiCloseLine, RiContactsBook3Line } from "react-icons/ri";
import { BsCurrencyRupee, BsBuildingCheck } from "react-icons/bs";
import { PiUsersThreeLight, PiCalendarDotsLight } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci";
import { MdOutlineContacts, MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useSearchParams } from 'react-router-dom';

function SearchResult() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedVendorId, setSelectedVendorId] = useState(null);
    const city = searchParams.get("city");
    const vendorType = searchParams.get("vendorType");
    const services = searchParams.get("services");
    const isVerifiedOnly = searchParams.get("verifiedStatus") === "true" || false;
    const isOfficeAddressOnly = searchParams.get("officeAddress")
    const turnoverRange = searchParams.get("turnover");
    const projectCompletion = searchParams.get("projectsCompleted");
    const marketSector = searchParams.get("marketSector");
    const laborStrength = searchParams.get("laborStrength");
    const businessAge = searchParams.get("businessAge");
    console.log(city, vendorType, services, isVerifiedOnly, isOfficeAddressOnly, marketSector, laborStrength, turnoverRange, projectCompletion, businessAge)


    useEffect(() => {
        const filterVendors = () => {
            let filtered = venderData;

            if (city) {
                filtered = filtered.filter(vendor =>
                    vendor.officeAddress.City.toLowerCase() === city.toLowerCase() ||
                    vendor.serviceLocations.Selectedcities.map(c => c.toLowerCase()).includes(city.toLowerCase())
                );
            }

            if (vendorType) {
                filtered = filtered.filter(vendor =>
                    vendor.vendorType.toLowerCase() === vendorType.toLowerCase()
                );
            }

            if (services) {
                const serviceArray = services.split(',');
                filtered = filtered.filter(vendor =>
                    vendor.services.some(service =>
                        serviceArray.includes(service.toLowerCase())
                    )
                );
            }

            if (isVerifiedOnly) {
                filtered = filtered.filter(vendor =>
                    vendor.verifiedStatus === isVerifiedOnly
                );
            }

            if (isOfficeAddressOnly) {
                filtered = filtered.filter(vendor =>
                    vendor.officeAddress.City.trim().length > 0
                );
            }

            if (turnoverRange) {
                const threshold = parseInt(turnoverRange.replace(/[^\d]/g, ''), 10);

                if (!isNaN(threshold)) {
                    filtered = filtered.filter(vendor => {
                        const vendorTurnover = parseInt(vendor.turnover.replace(/[^\d]/g, ''), 10);
                        return !isNaN(vendorTurnover) && vendorTurnover < threshold;
                    });
                }
            }

            if (projectCompletion) {
                filtered = filtered.filter(vendor =>
                    vendor.projectsCompleted >= parseInt(projectCompletion, 10)
                );
            }

            if (marketSector) {
                const marketSectorArray = marketSector.split(',').map(sector => sector.trim().toLowerCase());
                filtered = filtered.filter(vendor => {
                    // Debugging output
                    console.log('Market Sector Filter:', vendor.marketSector.map(sector => sector.toLowerCase()), marketSectorArray);
                    return vendor.marketSector.some(sector =>
                        marketSectorArray.includes(sector.toLowerCase())
                    );
                });
            }

            if (laborStrength) {
                console.log(`Filtering by laborStrength: ${laborStrength}`);
                const [minStrength, maxStrength] = laborStrength.split('-').map(val => val.replace(/\D/g, '')).map(Number);

                filtered = filtered.filter(vendor => {
                    let vendorStrength;

                    if (vendor.laborStrength.includes('+')) {
                        vendorStrength = parseInt(vendor.laborStrength.replace(/\D/g, ''), 10);
                    } else if (vendor.laborStrength.includes('-')) {
                        const [low, high] = vendor.laborStrength.split('-').map(val => parseInt(val.replace(/\D/g, ''), 10));
                        vendorStrength = high;  // Use the upper range value for comparison
                    } else {
                        vendorStrength = parseInt(vendor.laborStrength.replace(/[^0-9]/g, ''), 10);
                    }

                    console.log(`Vendor Strength: ${vendorStrength}`);

                    if (isNaN(vendorStrength)) return false;

                    if (maxStrength) {
                        return vendorStrength >= minStrength && vendorStrength <= maxStrength;
                    }
                    return vendorStrength >= minStrength;
                });
            }

            console.log(`Filtered vendors count: ${filtered.length}`);

            if (businessAge) {
                filtered = filtered.filter(vendor =>
                    vendor.businessAge.toLowerCase().includes(businessAge.toLowerCase())
                );
            }

            return filtered;
        };

        setFilteredVendors(filterVendors());
    }, [searchParams]);

    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 5;
    const totalPages = Math.ceil(filteredVendors.length / perPage);

    const currentPageItems = filteredVendors.slice((currentPage - 1) * perPage, currentPage * perPage);

    // Handle page change
    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Toggle contact details visibility
    const handleOnShowContact = (vendorId) => {
        setSelectedVendorId(selectedVendorId === vendorId ? null : vendorId);
    };


    return (
        <section className='mt-32 min-h-screen'>
            {/* Vendors List */}
            <div className={selectedVendorId ? 'blur-sm' : ''}>
                {currentPageItems.length > 0 ? (currentPageItems.map((vendor) => (
                    <div className='bg-white w-full my-5 p-8 shadow-md relative' key={vendor.vendorId}>
                        {/* First Section */}
                        <div className='flex space-x-10'>
                            <div className='bg-gray-200 p-1'>
                                <img src="/gallery-icon.svg" alt="gallery-icon" className='w-44' />
                            </div>
                            <div>
                                <h1 className='text-lg font-semibold'>{vendor.vendorName}</h1>
                                {/* Section */}
                                <div className='flex justify-between items-center my-2'>
                                    <div>
                                        {vendor.verifiedStatus && (
                                            <div className='flex items-center space-x-2 my-1'>
                                                <RiVerifiedBadgeFill className='text-blue-500' size={16} />
                                                <p className='text-xs font-semibold text-gray-400'>Verified Vendor</p>
                                            </div>
                                        )}
                                        <p className='text-md font-semibold text-gray-500'>{vendor.services}</p>
                                    </div>
                                    <p className='flex items-center space-x-1 border rounded-full py-1 px-3 h-9 font-semibold text-sm'>
                                        <CiLocationOn size={16} />
                                        <span>{vendor.officeAddress.City}, MH</span>
                                    </p>
                                </div>
                                <div className='bg-gray-100 p-2 grid grid-cols-2 gap-5 px-5'>
                                    <div className='flex items-center'>
                                        <BsCurrencyRupee />
                                        <p className='text-gray-700 text-md'>Turnover: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vendor.turnover}</p>
                                    </div>
                                    <div className='flex items-center space-x-1'>
                                        <PiUsersThreeLight size={20} />
                                        <p className='text-gray-700 text-md'>Labor Strength: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vendor.laborStrength}</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <PiCalendarDotsLight size={18} />
                                        <p className='text-gray-700 text-md'>Business Age: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vendor.businessAge}</p>
                                    </div>
                                    <div className='flex items-center'>
                                        <BsBuildingCheck />
                                        <p className='text-gray-700 text-md'>Projects Completed: &nbsp;</p>
                                        <p className='text-black font-semibold'>{vendor.projectsCompleted}</p>
                                    </div>
                                </div>
                            </div>
                            {/* View Profile */}
                            <div className=''>
                                <h1 className='text-black font-bold underline cursor-pointer'>View Profile</h1>
                            </div>
                        </div>
                        <div className='mt-3 flex justify-between'>
                            <p className='text-sm text-gray-600 flex-1'>{vendor.vendorDescription}... <span className='text-blue-500 underline font-semibold cursor-pointer'>see more</span></p>
                            <div onClick={() => handleOnShowContact(vendor.vendorId)} className='bg-black text-white font-semibold py-2 px-5 text-sm cursor-pointer'>
                                View Contact
                            </div>
                        </div>
                    </div>
                ))) : 
                (
                <>
                <div className='mb-[50%] bg-white p-5 min-h-44 flex items-center justify-center font-semibold text-2xl'>No Vendor Found for this result</div>
                </>
            )}
            </div>

            {/* Contact Details Overlay */}
            {selectedVendorId && (
                <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <div className='bg-white w-1/3 shadow-lg pb-7'>
                        {/* Header */}
                        <div className='flex justify-between items-center bg-black text-gray-200 text-sm p-3 px-5'>
                            <div className='flex items-center'>
                                <div className='w-5 h-5 border-4 border-l-orange-800 border-orange-500 rounded-full'></div>
                                <span className='font-semibold ml-2'>4/10</span>
                                <span className='ml-1'>contact views remaining</span>
                            </div>
                            <h1>
                                <span className='font-semibold text-white border-b cursor-pointer'>Upgrade</span> to view more
                            </h1>
                        </div>
                        {/* Contact Info */}
                        <div className='flex justify-between items-center py-3 px-5 border-b my-1'>
                            <h1 className='flex items-center text-2xl font-semibold space-x-3'>
                                <RiContactsBook3Line /> <span>Contact Info</span>
                            </h1>
                            <p className='flex items-center space-x-3 bg-gray-100 px-5 py-2 rounded-full cursor-pointer' onClick={() => handleOnShowContact(selectedVendorId)}>
                                Close <RiCloseLine size={20} />
                            </p>
                        </div>
                        {/* Business Contact Details */}
                        <div className='bg-gray-100 py-5 px-10 space-y-2 m-5'>
                            <h1 className='font-semibold text-gray-600'>Business Contact Details</h1>
                            <div className='flex space-x-2 items-center'>
                                <MdOutlineContacts size={50} />
                                <div>
                                    <p className='font-semibold'>{venderData.find(vendor => vendor.vendorId === selectedVendorId).vendorName}</p>
                                    <p className='text-gray-600 text-sm'>{venderData.find(vendor => vendor.vendorId === selectedVendorId).vendorContact.email}</p>
                                    <p className='text-gray-600 text-sm'>{venderData.find(vendor => vendor.vendorId === selectedVendorId).vendorContact.phone}</p>
                                </div>
                            </div>
                        </div>
                        {/* Team Contact Details */}
                        <div className='bg-gray-100 py-5 px-10 space-y-2 mx-5'>
                            <h1 className='font-semibold text-gray-600'>Team Contact Details</h1>
                            <div className='flex space-x-2 items-center'>
                                <div className='bg-black text-white font-semibold flex items-center justify-center w-10 h-10 rounded-full'>PS</div>
                                <div>
                                    <p className='font-semibold'>{venderData.find(vendor => vendor.vendorId === selectedVendorId)?.vendorTeam[0]?.Name}</p>
                                    <p className='text-gray-600 text-sm'>{venderData.find(vendor => vendor.vendorId === selectedVendorId)?.vendorTeam[0]?.Email}</p>
                                    <p className='text-gray-600 text-sm'>{venderData.find(vendor => vendor.vendorId === selectedVendorId)?.vendorTeam[0]?.Phone}</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center'>
                                <div className='bg-black text-white font-semibold flex items-center justify-center w-10 h-10 rounded-full'>GS</div>
                                <div>
                                    <p className='font-semibold'>{venderData.find(vendor => vendor.vendorId === selectedVendorId)?.vendorTeam[1]?.Name}</p>
                                    <p className='text-gray-600 text-sm'>{venderData.find(vendor => vendor.vendorId === selectedVendorId)?.vendorTeam[1]?.Email}</p>
                                    <p className='text-gray-600 text-sm'>{venderData.find(vendor => vendor.vendorId === selectedVendorId)?.vendorTeam[1]?.Phone}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <div className='flex justify-end space-x-2 my-4'>
                <button
                    className='bg-black text-white px-3 py-2 flex items-center justify-center rounded'
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <MdOutlineKeyboardArrowLeft />
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        className={`w-10 px-3 py-2 flex items-center justify-center rounded ${currentPage === index + 1 ? 'bg-black text-white' : 'border'}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    className='bg-black text-white px-3 py-2 flex items-center justify-center rounded'
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

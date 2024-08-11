import React, { useEffect, useState } from 'react';
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { BsFillQuestionCircleFill } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { useSearchParams } from 'react-router-dom';


function SearchSidebar() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isVerifiedOnly, setIsVerifiedOnly] = useState(searchParams.get("verifiedStatus") === "true" || false);
    const [isOfficeAddressOnly, setIsOfficeAddressOnly] = useState(searchParams.get("officeAddress") === "true" || false);
    const [turnoverRange, setTurnoverRange] = useState(searchParams.get("turnover") || '50'); // Default to 50
    const [projectCompletion, setProjectCompletion] = useState(searchParams.get("projectsCompleted") || 0);
    const [marketSector, setMarketSector] = useState(searchParams.get("marketSector") || '');
    const [laborStrength, setLaborStrength] = useState(searchParams.get("laborStrength") || '');
    const [businessAge, setBusinessAge] = useState(searchParams.get("businessAge") || '');

    const handleToggleVerified = () => setIsVerifiedOnly(!isVerifiedOnly);
    const handleToggleOfficeAddress = () => setIsOfficeAddressOnly(!isOfficeAddressOnly);
    const handleTurnoverChange = (e) => setTurnoverRange(e.target.value);
    const handleProjectCompletionChange = (e) => setProjectCompletion(e.target.value);
    const handleSelectChange = (setter, value) => setter(value);

    useEffect(() => {
        const params = {
            verifiedStatus: isVerifiedOnly ? "true" : '',
            officeAddress: isOfficeAddressOnly ? "true" : '',
            turnover: turnoverRange !== '50' ? turnoverRange : '', // Only set turnover if it's not the default
            projectsCompleted: projectCompletion,
            marketSector: marketSector || '', // Ensure market sector is only set if selected
            laborStrength,
            businessAge
        };

        const newSearchParams = new URLSearchParams();
        Object.keys(params).forEach(key => {
            if (params[key]) {
                newSearchParams.set(key, params[key]);
            }
        });

        setSearchParams(newSearchParams);
    }, [isVerifiedOnly, isOfficeAddressOnly, turnoverRange, projectCompletion, marketSector, laborStrength, businessAge]);

    const turnoverThumbPosition = Math.min(Math.max((turnoverRange / 100) * 100, 5), 95);
    const projectCompletionThumbPosition = Math.min(Math.max((projectCompletion / 100) * 100, 5), 95);

    // Reset all filters
    const resetAll = () => {
        setIsVerifiedOnly(false);
        setIsOfficeAddressOnly(false);
        setTurnoverRange('50');
        setProjectCompletion(0);
        setMarketSector('');
        setLaborStrength('');
        setBusinessAge('');
    };

    return (
        <div className='mt-24 min-h-screen '>
            <aside className='m-5 space-y-5 pb-10'>
                <h1 className='font-bold text-2xl ' title='filter'>Filters</h1>
                {/* Verified Vendors Only */}
                <div className='flex items-center space-x-2 w-full justify-between'>
                    <div className='flex items-center space-x-2'>
                        <RiVerifiedBadgeFill size={20} className='text-blue-600 ' />
                        <p>Verified vendors Only</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isVerifiedOnly}
                                onChange={handleToggleVerified}
                                className="sr-only"
                            />
                            <div className={`w-11 h-6 rounded-full flex items-center pl-1 transition-colors duration-300 ease-in-out ${isVerifiedOnly ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${isVerifiedOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Search by Office Address Only */}
                {/* Search by Office Address Only */}
                <div className='flex items-center space-x-2  w-full justify-between'>
                    <div className='flex items-center space-x-2'>
                        <p>Search by Office Address Only</p>
                        <div className="relative group inline-block">
                            <BsFillQuestionCircleFill size={14} className='text-gray-700' />
                            <div className="z-50 absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white text-gray-800 text-sm font-bold rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-pre-wrap">
                                Only show vendors with office location in the selected city
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isOfficeAddressOnly}
                                onChange={handleToggleOfficeAddress}
                                className="sr-only"
                            />
                            <div className={`w-11 h-6 rounded-full flex items-center pl-1 transition-colors duration-300 ease-in-out ${isOfficeAddressOnly ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out ${isOfficeAddressOnly ? 'translate-x-5' : 'translate-x-0'}`}></div>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Market Sector */}
                <div>
                    <h1 className='font-semibold flex justify-between items-center mr-5 cursor-pointer'>
                        <p>Market Sector</p>
                        <IoIosArrowDown />
                    </h1>
                    <ul className='space-y-1 mt-2'>
                        <li className='space-x-2 flex items-center'>
                            <input type="radio" name="marketSector" value="Healthcare" onChange={(e) => setMarketSector(e.target.value)} /><p>Healthcare</p>
                        </li>
                        <li className='space-x-2 flex items-center'>
                            <input type="radio" name="marketSector" value="Industrial" onChange={(e) => setMarketSector(e.target.value)} /><p>Industrial</p>
                        </li>
                        <li className='space-x-2 flex items-center'>
                            <input type="radio" name="marketSector" value="Infrastructure" onChange={(e) => setMarketSector(e.target.value)} /><p>Infrastructure</p>
                        </li>
                        <li className='space-x-2 flex items-center'>
                            <input type="radio" name="marketSector" value="Residential" onChange={(e) => setMarketSector(e.target.value)} /><p>Residential</p>
                        </li>
                        <li className='space-x-2 flex items-center'>
                            <input type="radio" name="marketSector" value="Commercial" onChange={(e) => setMarketSector(e.target.value)} /><p>Commercial</p>
                        </li>
                        <li className='space-x-2 flex items-center'>
                            <input type="radio" name="marketSector" value="Hospitals" onChange={(e) => setMarketSector(e.target.value)} /><p>Hospitals</p>
                        </li>
                    </ul>
                </div>

                {/* Turnover */}
                <div className="relative">
                    <h1 className='font-semibold flex justify-between items-center mr-5 cursor-pointer'>
                        <p>Turnover</p>
                        <IoIosArrowDown />
                    </h1>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={turnoverRange}
                        onChange={handleTurnoverChange}
                        className="w-full appearance-none bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    {/* Tick Marks */}
                    <div className="absolute top-12 left-0 right-0 flex justify-between text-gray-600">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </div>
                    <div
                        className="absolute text-gray-800"
                        style={{
                            top: '48px',
                            left: `${turnoverThumbPosition}%`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {turnoverRange}
                    </div>
                    <div className="flex justify-between mt-7">
                        <div className="bg-white border py-1 px-4">
                            <p className="text-gray-600">Minimum</p>
                            <p className="font-semibold">₹ 0 Lakh</p>
                        </div>
                        <div className="bg-white border py-1 px-4">
                            <p className="text-gray-600">Maximum</p>
                            <p className="font-semibold">₹ {turnoverRange} Lakh</p>
                        </div>
                    </div>
                </div>

                {/* Labor Strength */}
                <div>
                    <h1 className='font-semibold flex justify-between items-center mr-5 mb-2 cursor-pointer'>
                        <p>Labor Strength</p>
                        <IoIosArrowDown />
                    </h1>
                    <ul className='space-y-1 mt-2'>
                        <li className='space-x-2 flex items-center'><input type="radio" value='0-20' name='labor-strength' onChange={(e) => handleSelectChange(setLaborStrength, e.target.value)} /><p>0-20</p></li>
                        <li className='space-x-2 flex items-center'><input type="radio" value='20-40' name='labor-strength' onChange={(e) => handleSelectChange(setLaborStrength, e.target.value)} /><p>20-40</p></li>
                        <li className='space-x-2 flex items-center'><input type="radio" value='40-60' name='labor-strength' onChange={(e) => handleSelectChange(setLaborStrength, e.target.value)} /><p>40-60</p></li>
                        <li className='space-x-2 flex items-center'><input type="radio" value='60-80' name='labor-strength' onChange={(e) => handleSelectChange(setLaborStrength, e.target.value)} /><p>60-80</p></li>
                        <li className='space-x-2 flex items-center'><input type="radio" value='80-100' name='labor-strength' onChange={(e) => handleSelectChange(setLaborStrength, e.target.value)} /><p>80-100</p></li>
                        <li className='space-x-2 flex items-center'><input type="radio" value='100+' name='labor-strength' onChange={(e) => handleSelectChange(setLaborStrength, e.target.value)} /><p>100+ Laboures</p></li>
                    </ul>
                </div>

                {/* Business Age */}
                <div>
                    <h1 className='font-semibold flex justify-between items-center mr-5 mb-2 cursor-pointer'>
                        <p>Business Age</p>
                        <IoIosArrowDown />
                    </h1>
                    <ul className='space-y-1 mt-2'>
                        <li className='space-x-2 flex items-center'><input type="radio" value='0 - 20 Years' name='business-age' onChange={(e) => handleSelectChange(setBusinessAge, e.target.value)} /><p>0-20</p></li>
                        <li className='space-x-2 flex items-center'><input type="radio" value='20 - 40 Years' name='business-age' onChange={(e) => handleSelectChange(setBusinessAge, e.target.value)} /><p>20-40</p></li>
                        <li className='space-x-2 flex items-center'><input type="radio" value='40+ Years' name='business-age' onChange={(e) => handleSelectChange(setBusinessAge, e.target.value)} /><p>40+ Years</p></li>
                    </ul>
                </div>

                {/* Project Completion */}
                <div className="relative">
                    <h1 className='font-semibold flex justify-between items-center mr-5 cursor-pointer'>
                        <p>Project Completion</p>
                        <IoIosArrowDown />
                    </h1>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={projectCompletion}
                        onChange={handleProjectCompletionChange}
                        className="w-full appearance-none bg-gray-200 h-2 rounded-lg cursor-pointer"
                    />
                    {/* Tick Marks */}
                    <div className="absolute top-12 left-0 right-0 flex justify-between text-gray-600">
                        <span>0</span>
                        <span>50</span>
                        <span>100</span>
                    </div>
                    <div
                        className="absolute text-gray-800"
                        style={{
                            top: '48px',
                            left: `${projectCompletionThumbPosition}%`,
                            transform: 'translateX(-50%)',
                        }}
                    >
                        {projectCompletion}%
                    </div>
                </div>

                {/* Reset All Button */}
                <button
                    onClick={resetAll}
                    className="w-full  bg-red-600 text-white py-2 rounded-lg mt-10 hover:bg-red-700"
                >
                    Reset All
                </button>
            </aside>
        </div>
    );
}

export default SearchSidebar;


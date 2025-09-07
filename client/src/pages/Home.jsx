import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MetaData } from '../components/MetaData'
import { useSelector, useDispatch } from 'react-redux';
import { JobCard } from '../components/JobCard';
import { getAllJobs } from '../actions/JobActions';
import Testimonials from '../components/Testimonials/Testimonials.jsx';

export const Home = () => {
    const data = [
        { logo: "/images/JobData/1.png" , link: "https://eec.com.et/" },
        { logo: "/images/JobData/2.png" , link: "https://ethio.post/"},
        { logo: "/images/JobData/3.jpg" , link: "https://www.sur.com.et/"},
        { logo: "/images/JobData/5.png" , link: "https://www.aau.edu.et/"},
        { logo: "/images/JobData/4.png" , link: "https://www.combanketh.et/"},
        { logo: "/images/JobData/6.jpg" , link: "https://www.safaricom.com/"},
        { logo: "/images/JobData/7.png" , link: "https://www.moh.gov.et/en/node/35?language_content_entity=en"},
        { logo: "/images/JobData/8.png" , link: "https://www.ethiopianairlines.com/"},
        { logo: "/images/JobData/9.png" , link: "https://ebstv.tv/"},
        { logo: "/images/JobData/10.png" , link: "https://www.ethiotelecom.et/"},
        { logo: "/images/JobData/ride.png" , link: "https://ride8294.com/"},
        { logo: "/images/JobData/11.jpg" , link: "https://eic-et.com/"},
        { logo: "/images/JobData/12.jpg" , link: "https://www.hilton.com/en/hotels/addhitw-hilton-addis-ababa/"},
        { logo: "/images/JobData/13.jpg" , link: "https://www.washingtonhealth.com/"},
        { logo: "/images/JobData/14.png" , link: "https://feres.et/"},
        { logo: "/images/JobData/15.png" , link: "https://www.bgiethiopia.com/"},
        { logo: "/images/JobData/16.jpg" , link: "https://www.midrocinvestmentgroup.com/"},
        { logo: "/images/JobData/17.jpg" , link: "https://dashenbanksc.com/"},
        { logo: "/images/JobData/18.jpg" , link: "http://www.ethiopianelectricutility.gov.et/"},
        { logo: "/images/JobData/19.jpg" , link: "https://redcrosseth.org/"},
        { logo: "/images/JobData/20.jpg" , link: "https://redcrosseth.org/"},
    ];
    const [num, setNum] = useState(2);
    const dispatch = useDispatch();
    const { loading, allJobs } = useSelector(state => state.job);
    const [jobs, setJobs] = useState([]);
    
    const convertDateFormat = (inputDate) => {
        const parts = inputDate.split('-');
        if (parts.length !== 3) {
            return "Invalid date format";
        }
        const day = parts[2];
        const month = parts[1];
        const year = parts[0];
        return `${day}-${month}-${year}`;
    };

    const imagesPerPage = 5;
    const [currentIndex, setCurrentIndex] = useState(0);
    const [disableTransition, setDisableTransition] = useState(false);

    const extendedData = [...data, ...data]; 

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                if (prev >= data.length) {
                    // Disable transition before resetting to 0
                    setDisableTransition(true);
                    return 0; 
                }
                return prev + 1;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [data.length]);

    // Re-enable transition after resetting to 0
    useEffect(() => {
        if (disableTransition) {
            // a timeout to re-enable transition after the reset
            const timeout = setTimeout(() => {
                setDisableTransition(false);
            }, 20); // Small delay to ensure reset happens without animation
            return () => clearTimeout(timeout);
        }
    }, [disableTransition]);

    // transform value
    const translateX = -(currentIndex * (100 / imagesPerPage));

    return (
        <>
            <MetaData title="Sira" />
            <div className='min-h-screen md:px-20 px-3 pt-14 flex text-white bg-gray-950'>
                <div className='w-full flex pt-28 flex-col justify-start items-center gap-4'>
                    <div className='flex md:flex-row flex-col items-center justify-center md:gap-10 gap-1'>
                        <div className='md:text-8xl text-6xl titleT'>ስራ</div>
                        <div className='flex justify-center items-center pt-1'>
                            <logo to="/jobs" className='font-semibold md:text-2xl text-lg blueCol md:py-3 py-2 px-6 md:px-10'>Browse Jobs</logo>
                        </div>
                    </div>
                    <div>
                        <p className='md:text-xl text-sm'>Your <span className='text-yellow-500'>gateway</span> to job opportunities in Ethiopia and The Globe.</p>
                    </div>

                    <div className='pt-[8rem] md:px-[1rem] px-[0rem] w-full'>
                        <div className='titleT pb-6 text-2xl'>
                        </div>
                    </div>

                    <div className='overflow-hidden w-4/5 pt-20 flex flex-col gap-4 md:px-[1rem] px-[1rem]'>
                        <div className='text-2xl titleT'>
                            Companies on our site
                        </div>
                        <div className="relative w-full">
                            <div 
                                className={`flex ${disableTransition ? '' : 'transition-transform duration-[2s] ease-in-out'}`} 
                                style={{ transform: `translateX(${translateX}%)` }}
                            >
                                {extendedData.map((item, i) => (
                                    <div key={i} className="flex justify-center items-center flex-[0_0_20%]">
                                        <a href={item.link} target='_blank'><img src={item.logo} alt="" className="w-24 object-contain" /></a>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* <Testimonials /> */}

                    <div className="pt-[4rem] pb-[5rem] md:px-[14rem] px-[1rem] text-center">
                        <p>Discover the Power of Possibility with SIRA: Where Your Professional Journey Takes Flight, Guided by a Network of Diverse Opportunities!</p>
                    </div>
                </div>
            </div>
        </>
    );
};
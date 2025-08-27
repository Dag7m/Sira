import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MetaData } from '../components/MetaData'
import { useSelector, useDispatch } from 'react-redux';
import { JobCard } from '../components/JobCard';
import { getAllJobs } from '../actions/JobActions';
import Testimonials from '../components/Testimonials/Testimonials.jsx';

export const Home = () => {
    const data = [
        { link: "/images/JobData/1.png" },
        { link: "/images/JobData/2.png" },
        { link: "/images/JobData/3.jpg" },
        { link: "/images/JobData/4.png" },
        { link: "/images/JobData/5.png" },
        { link: "/images/JobData/6.jpg" },
        { link: "/images/JobData/7.png" },
        { link: "/images/JobData/8.png" },
        { link: "/images/JobData/9.png" },
        { link: "/images/JobData/10.png" },
        { link: "/images/JobData/ride.png" },
        { link: "/images/JobData/12.jpg" },
        { link: "/images/JobData/13.jpg" },
        { link: "/images/JobData/14.png" },
        { link: "/images/JobData/15.png" },
        { link: "/images/JobData/16.jpg" },
        { link: "/images/JobData/17.jpg" },
        { link: "/images/JobData/18.jpg" },
        { link: "/images/JobData/19.jpg" },
        { link: "/images/JobData/20.jpg" },
    ];
    const [num, setNum] = useState(2);
    const dispatch = useDispatch()
    const { loading, allJobs } = useSelector(state => state.job)
    const [jobs, setJobs] = useState([])

    const convertDateFormat = (inputDate) => {
        const parts = inputDate.split('-');
        if (parts.length !== 3) {
            return "Invalid date format";
        }

        const day = parts[2];
        const month = parts[1];
        const year = parts[0];

        return `${day}-${month}-${year}`;
    }

    const imagesPerPage = 5;
    const [currentIndex, setCurrentIndex] = useState(0);

    

    useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (data.length-3));
    },3000);
    return () => clearInterval(interval);
  }, [data.length]);

    return (

        <>
            <MetaData title="Sira" />
            <div className='min-h-screen md:px-20 px-3  pt-14 flex   text-white bg-gray-950'>
                <div className='  w-full  flex  pt-28 flex-col justify-start  items-center gap-4'>

                    <div className='flex md:flex-row flex-col items-center justify-center md:gap-10 gap-1'>
                        <div className='md:text-8xl text-6xl titleT'>ስራ</div>
                        <div className=' flex justify-center items-center pt-1'>
                            <Link to="/jobs" className='font-semibold md:text-2xl text-lg blueCol  md:py-3 py-2 px-6 md:px-10 '>Browse Jobs</Link>
                        </div>
                    </div>
                    <div>
                        <p className='md:text-xl text-sm'>Your <span className='text-yellow-500'>gateway</span> to job opportunities in Ethiopia and The Globe.</p>

                    </div>


                    <div className='pt-[8rem] md:px-[1rem] px-[0rem] w-full'>
                        <div className='titleT pb-6 text-2xl'>
                        </div>


                    </div>


                    <div className='overflow-hidden w-4/5 pt-20 flex flex-col gap-4 md:px-[1rem] px-[1rem] '>
                        <div className='text-2xl titleT '>
                            Companies on our site
                        </div>
                        <div className="flex transition-transform duration-1000 ease-in-out" style={{ transform: `translateX(-${currentIndex * (100 / imagesPerPage)}%)` }}>
                            {
                                data.map((item, i) => (
                                    <div key={i} className="flex justify-center items-center flex-[0_0_20%]">
                                        <img src={item.link} alt="" className="w-24  object-contain" />
                                    </div>
                                ))}
                        </div>
                    </div>


                    {/* <Testimonials /> */}

                    <div className="pt-[7rem] pb-[10rem] md:px-[14rem] px-[1rem]   text-center">
                        <p>Discover the Power of Possibility with SIRA: Where Your Professional Journey Takes Flight, Guided by a Network of Diverse Opportunities!</p>
                    </div>


                </div>

            </div>


        </>


    );
};

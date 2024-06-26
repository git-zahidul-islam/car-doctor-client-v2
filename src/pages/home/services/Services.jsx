
import { useState } from 'react';
// import serviceImg1 from '../../../assets/images/services/1.jpg'
import { useEffect } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [service, setService] = useState([])
    const [asc, setAsc] = useState(false)
    const [search,setSearch] = useState('')

    useEffect(() => {
        fetch(`http://localhost:5000/services?sort=${asc ? 'asc' : 'desc'}&search=${search}`)
            .then(res => res.json())
            .then(data => {
                setService(data)
            })
    }, [asc,search])

    const handleSearch = (e)=>{
        e.preventDefault()
        const searchText = e.target.search.value;
        setSearch(searchText)
    }

    return (
        <div className="mb-10">
            <div className="flex flex-col items-center space-y-4">
                <h1 className=" text-center text-xl text-orange-500">Services</h1>
                <h1 className="text-3xl font-bold text-center text-[#151515]">Our Service Areas</h1>
                <p className="text-center w-7/12">the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                <button className='btn' onClick={() => setAsc(!asc)}>
                    {asc ? 'Price: Heigh to Low' : 'Price: Low to Height'}
                </button>
                <div className='bg-gray-300 p-2'>
                    <form onSubmit={handleSearch}>
                        <input className='p-2' type="text" name="search" id="search" />
                        <input className='btn' type="submit" value="Search" />
                    </form>
                </div>
            </div>

            <div className='grid md:grid-cols-3 md:gap-6 mt-10'>
                {
                    service.map(data => <ServiceCard key={data._id} data={data}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;
import React, { useEffect, useState } from 'react'

export default function Events() {
    const [ourEvents, setOurEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        fetch('http://localhost:5000/events')
            .then(res => res.json())
            .then(data => {setOurEvents(data);setLoading(false)})
    }, [])

    return (
        <div>
            <div className="text-6xl text-red-700 text-center font-black hover:text-green-900">
                Our upcoming Events
            </div>
            {
                loading ? <>Loading</> : 
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    {
                        ourEvents.map((singleEvent, id) => <>
                            <div className='shadow-lg'>
                                <img src={singleEvent.img} alt="" style={{width:'100%'}}/> <br />
                                <p className='text-4xl text-green-500 p-2'>
                                    Event Time: {singleEvent.date}
                                </p>
                            </div>
                        </>)
                    }
                </div>
            }
        </div>
    )
}

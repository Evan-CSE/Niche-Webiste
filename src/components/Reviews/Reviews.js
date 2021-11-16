import React, { useEffect, useState } from 'react'
import Cards from '../Cards/Cards';
import ReviewBox from './ReviewBox';

export default function Reviews() {
    const [review, setReview] = useState([])
    const [loading, setLoading] = useState(true);
    const [rt, setRt] = useState(0);
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => {
                setReview(data);
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <div className="text-7xl text-blue-700 text-center hover:text-green-900">
                Our Happy Clients Say
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 border shadow-lg'>
                {
                    loading ? <div class="flex justify-center items-center">
                        <div
                            className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"
                        ></div>
                    </div> :
                        <div className='grid grid-cols-1 md:grid-cols-3 g-4'>
                            {
                                review.slice(0, 6).map((r) =>
                                    <ReviewBox
                                        key={r._id}
                                        obj={r}
                                    ></ReviewBox>
                                )
                            }
                        </div>
                }
            </div>
        </div>
    )
}


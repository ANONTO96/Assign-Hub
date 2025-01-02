import { useEffect, useState } from "react";
import axios from "axios"
import AssignmentCard from "../components/AssignmentCard";
import bnr from "../assets/cool-background.png"


const AllAssignments = () => {
    const [assignments, setAssignments] = useState([])

    useEffect(()=>{
        fetchAllAssignment()
    }, [])
    const fetchAllAssignment = async() =>{
        const {data} =await axios.get(`${import.meta.env.VITE_API_URL}/allAssignments`)
        setAssignments(data)
    }
    return (
        <div>
            {/* Banner Section */}
            <div
                className="relative bg-cover bg-center h-[350px] lg:h-[400px] lg:w-[80%] flex mx-auto items-center justify-center text-white "
                style={{ backgroundImage: `url(${bnr})`}}
            >
                <div className="absolute inset-0 bg-black bg-opacity-15"></div>
                <div className="text-center z-10 p-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">📚 All Assignments</h1>
                    <p className="text-lg md:text-xl mb-6">
                        Explore a wide range of assignments designed for every skill level.
                    </p>
                    <div className="text-xl md:text-2xl ">
                        Total Assignments: <span className="text-yellow-400">{assignments.length}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 w-fit mx-auto my-6">
            {
              assignments.map(assignment => (
              <AssignmentCard key={assignment._id} assignment={assignment}></AssignmentCard>
              ))  
            }
        </div>
        </div>
    );
};

export default AllAssignments;
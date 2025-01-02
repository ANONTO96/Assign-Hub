import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-hot-toast";
import { compareAsc } from "date-fns";


const AssignmentDetails = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const {id} = useParams()
    const [assignment, setAssignment] = useState([])
    useEffect(()=>{
        fetchAssignment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
    const fetchAssignment = async() =>{
        const {data} =await axios.get(`${import.meta.env.VITE_API_URL}/assignment/${id}`)
        setAssignment(data)
    }
        const {title,description,dueDate,marks,difficulty,thumbnailUrl,_id,email} = assignment || {}

        const handleSubmit = async () => {

            const jobId = _id
            // validation 
            // check submit permission 
            if(user?.email === email) return toast.error('Action not permitted')
      
            // deadline crossed 
            if(compareAsc(new Date(),new Date(dueDate)) === 1 ) return toast.error('Deadline Crossed, Submission Forbidden ')
      
            const submissionData = {title, marks,email, jobId, dueDate:dueDate,status:'pending',
            submittedBy:user?.email
            }
            
            try{
                // make a post request
                await axios.post(`${import.meta.env.VITE_API_URL}/add-submission`,submissionData)
                toast.success('Submission done successfully')
                navigate(`/my-submitted-assignments/${user?.email}`)
              }
              catch(err){
                toast.error(err.response.data)
              }
        }
    return (
        <div className="max-w-3xl mx-auto mb-14 p-8 bg-white shadow-md rounded-lg mt-10">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-center text-gray-800">{title || 'No Title Available'}</h1>
      
        {/* Thumbnail */}
        {thumbnailUrl && (
          <div className="flex justify-center mb-6">
            <img
              src={thumbnailUrl}
              alt={title}
              className="rounded-md w-full max-h-80 object-cover"
            />
          </div>
        )}
      
        {/* Description */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{description || 'No description available.'}</p>
        </div>
      
        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="text-lg font-semibold">Due Date</h3>
            <p className="text-gray-600">{dueDate ? new Date(dueDate).toLocaleDateString('en-US') : 'Not specified'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Marks</h3>
            <p className="text-gray-600">{marks || 'N/A'}</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Difficulty</h3>
            <p className="text-gray-600 capitalize">{difficulty || 'N/A'}</p>
          </div>
        </div>
      
        {/* User Information */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold">Created By</h3>
          <p className="text-gray-600">{email || 'Email not available'}</p>
        </div>
      
        {/* Footer Buttons */}
        <div className="text-center mt-6 space-x-4">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500"
          >
            Back to Assignments
          </button>
          <button onClick={handleSubmit}
            className="bg-lime-400 text-white px-6 py-2 rounded-md hover:bg-lime-500"
          >
            Submit
          </button>
        </div>
      </div>
      
    );
};

export default AssignmentDetails;
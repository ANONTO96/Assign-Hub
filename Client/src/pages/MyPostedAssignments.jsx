import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios"
import { Link } from "react-router-dom";
import {format} from "date-fns"
import toast from "react-hot-toast"


const MyPostedAssignments = () => {
  const {user} = useContext(AuthContext)
  const [assignments, setAssignments] = useState([])

    useEffect(()=>{
        fetchAllAssignment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])
    const fetchAllAssignment = async() =>{
        const {data} =await axios.get(`${import.meta.env.VITE_API_URL}/allAssignments/${user?.email}`)
        setAssignments(data)
    }

    // delete functionality
    const handleDelete = async id =>{
      try {
        const {data} = await axios.delete(`${import.meta.env.VITE_API_URL}/assignment/${id}`)
        fetchAllAssignment()
        toast.success('Assignment Deleted Successfully')
        console.log(data)
      }
       catch (error) {
        toast.error(error)
      }
    }

    // delete confirmation
    const deleteNotify = id =>{
      toast(
        (t) => (
          <div className='flex gap-3 items-center'>
            <div>
              <p>Are you <b>sure?</b> </p>
            </div>
            <div className='flex gap-2'>
              <button className='bg-red-400 text-white px-3 py-1 rounded-md' onClick={()=>{
                toast.dismiss(t.id)
                handleDelete(id)
              }
              } >Yes</button>
              <button className='bg-blue-400 text-white px-3 py-1 rounded-md' onClick={() => toast.dismiss(t.id)}>Cancel</button>
            </div>
          </div>
        )
      );
    }
    
    return (
        <section className='container px-4 mx-auto pt-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium'>My Posted Assignments</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {assignments.length} Assignments
        </span>
      </div>

      <div className='flex flex-col my-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-6 lg:px-8'>
            <div className='overflow-hidden border border-gray-200  md:rounded-lg'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th
                      scope='col'
                      className='py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <div className='flex items-center gap-x-3'>
                        <span>Title</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <span>Description</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>marks</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 ${} text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                     difficulty level
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Deadline
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Edit
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {/* generate dynamic tr */}
                  {
                  assignments.map(assignment => 
                    <tr key={assignment._id}>
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                      {assignment.title}
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                    {assignment.description?.substring(0,25)}...
                    </td>

                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>{assignment.marks}
                    </td>
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className={`flex items-center justify-center rounded-3xl gap-x-2 ${assignment.difficulty === 'easy' && 'text-green-500 bg-green-100'}
                      ${assignment.difficulty === 'medium' && 'text-blue-500 bg-blue-100'}
                      ${assignment.difficulty === 'hard' && 'text-red-500 bg-red-100'}
                      `}>{assignment.difficulty}
                      </div>
                    </td>
                    <td className='px-4 py-4 text-sm text-gray-500  whitespace-nowrap'>
                    {format(new Date(assignment.dueDate), 'P')}
                    </td>
                    <td className='px-4 py-4 text-sm whitespace-nowrap'>
                      <div className='flex items-center gap-x-6'>
                        <button onClick={()=>deleteNotify(assignment._id)} className='text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                            />
                          </svg>
                        </button>

                        <Link
                          to={`/update/${assignment._id}`}
                          className='text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none'
                        >
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth='1.5'
                            stroke='currentColor'
                            className='w-5 h-5'
                          >
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10'
                            />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                  )
                 }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      </section>
    );
};

export default MyPostedAssignments;
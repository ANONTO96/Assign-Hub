import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const MySubmittedAssignments = () => {
  const {user} = useContext(AuthContext)
  const { email } = useParams()
  const [submissions, setSubmissions] = useState([])

  useEffect(() => {
    fetchAllSubmissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
  const fetchAllSubmissions = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allSubmissions/${user?.email}`)
    setSubmissions(data)
    console.log(data)
  }
  return (
    <section className='container px-4 mx-auto pt-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium'>My Submitted Assignments</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {submissions.length} Assignments
        </span>
      </div>

      <div className='flex flex-col mt-6'>
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
                      <span>Assignment Marks</span>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      <button className='flex items-center gap-x-2'>
                        <span>My obtained marks</span>
                      </button>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Assignment Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {/* dynamic table row */}
                  {
                    submissions.map((submission) => (
                      <tr key={submission._id}>
                        {/* Title */}
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {submission.title}
                        </td>


                        {/* Total Marks */}
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {submission.marks}
                        </td>

                        {/* Obtained Marks */}
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {submission.obtainedMarks ?? 'N/A'}
                        </td>

                        {/* Status */}
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div
                            className={`flex items-center justify-center rounded-3xl gap-x-2 ${submission.status === 'passed' && 'text-green-500 bg-green-100'
                              } ${submission.status === 'failed' && 'text-red-500 bg-red-100'
                              } ${submission.status === 'pending' && 'text-yellow-500 bg-yellow-100'
                              }`}
                          >
                            {submission.status}
                          </div>
                        </td>
                      </tr>
                    ))
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

export default MySubmittedAssignments;
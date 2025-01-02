import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast"

const PendingAssignments = () => {
  const { user } = useContext(AuthContext)
  const { email } = useParams()
  const [pendingSubmissions, setPendingSubmissions] = useState([])

  useEffect(() => {
    fetchAllPSubmissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email])
  const fetchAllPSubmissions = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/allPendingSubmissions/${user?.email}`)
    setPendingSubmissions(data)
    console.log(data)
  }
  return (
    <section className='container px-4 mx-auto pt-12'>
      <div className='flex items-center gap-x-3'>
        <h2 className='text-lg font-medium'>Pending Assignments</h2>

        <span className='px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full '>
          {pendingSubmissions.length} Assignments
        </span>
      </div>

      <div className='flex flex-col mt-6'>
        <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
          <div className='inline-block min-w-full py-2 align-middle md:px-3 lg:px-20'>
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
                      <div className='flex items-center gap-x-2'>
                        <span>Assignment marks</span>
                      </div>
                    </th>

                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Examinee Email
                    </th>
                    <th
                      scope='col'
                      className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'
                    >
                      Give Mark
                    </th>

                    <th className='px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500'>
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 '>
                  {/* generate dynamic tr */}
                  {
                    pendingSubmissions.map((submission) => (
                      <tr key={submission._id}>
                        {/* Title */}
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {submission.title}
                        </td>


                        {/* Total Marks */}
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {submission.marks}
                        </td>

                        {/* examinee email */}
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {submission.submittedBy}
                        </td>

                        {/* mark */}
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap flex items-center">
                          <form
                            onSubmit={(e) => {
                              e.preventDefault();
                              const mark = e.target.mark.value;
                              if (mark) {
                                toast.success(`Mark submitted: ${mark}`);
                              } else {
                                toast.error('Please enter a mark before submitting');
                              }
                            }}
                            className="flex items-center gap-2"
                          >
                            <input
                              name="mark"
                              className="w-16 border-2 bg-white border-gray-500 rounded-lg px-2 py-1"
                              type="number"
                              required
                            />
                            <button
                              type="submit"
                              className="flex items-center justify-center w-6"
                            >
                              <img
                                className="w-6 h-6"
                                src="https://img.icons8.com/?size=100&id=g7mUWNettfwZ&format=png&color=000000"
                                alt="Submit"
                              />
                            </button>
                          </form>
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

export default PendingAssignments;
import { Link } from 'react-router-dom'
import {format} from "date-fns"

// eslint-disable-next-line react/prop-types
const AssignmentCard = ({ assignment }) => {

    const {_id,title,
        dueDate,
        marks,
        difficulty,
        email,
        thumbnailUrl,
        description,
        } = assignment || {};

        // Check if dueDate is valid
    const isValidDate = !isNaN(new Date(dueDate));

    return (
        <Link
      to={`/assignment/${_id}`}
      className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-lg hover:scale-[1.05] transition-all border border-lime-200'
    >
        <div className='mb-3'>
            <img className='h-[250px] w-full rounded-md object-cover' src={thumbnailUrl} alt="" />
        </div>

      <div className='flex items-center justify-between'>
        <span className='text-xs font-light text-gray-800 '>
          <span className='text-black'>Due Date:</span>
          {isValidDate ? format(new Date(dueDate), 'PP') : 'Invalid Date'}
        </span>
        <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
          {difficulty}
        </span>
      </div>

      <div className='mb-3'>
        <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
          {title}
        </h1>

        <p className='mt-2 text-sm text-gray-600 '>
          {description?.substring(0,80)}...
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '>
        <span className='text-gray-500'>Mark:</span>{marks}
        </p>
        <p className='mt-2 text-sm font-bold text-gray-600 '><span className='text-gray-500'>Assignment Created By:</span> {email}</p>
      </div>
      {/* See More Button */}
  <div className='mt-4 text-center'>
    <button className='px-4 py-2 text-sm font-medium text-white bg-lime-500 rounded-md hover:bg-lime-600 transition-colors w-full'>
      Click to see Details
    </button>
  </div>
    </Link>
    );
};

export default AssignmentCard;
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { compareAsc } from "date-fns";

const UpdateAssignment = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const [assignment, setAssignment] = useState([])
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    fetchAssignment()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])
  const fetchAssignment = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/assignment/${id}`)
    setAssignment(data)
    setDate(new Date(data.dueDate))
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target
    const title = form.title.value
    const description = form.description.value
    const marks = form.marks.value
    const thumbnailUrl = form.thumbnailUrl.value
    const difficulty = form.difficulty.value
    const dueDate = form.dueDate.value

    const formData = {
      title,
      email: user?.email,
      description,
      marks,
      thumbnailUrl,
      difficulty,
      dueDate
    }

    try {
      // make a put request to update database
      await axios.put(`${import.meta.env.VITE_API_URL}/update-assignment/${id}`, formData)
      // resetting form
      form.reset
      toast.success('Assignment added successfully')
      navigate('/my-posted-assignments')
    }
    catch (err) {
      toast.error(err.message)
    }
  };
  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-md rounded-lg mt-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Update Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={assignment?.title}
            placeholder="Enter assignment title"
            className="input input-bordered w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            defaultValue={assignment?.description}
            placeholder="Enter assignment description"
            className="textarea textarea-bordered w-full border border-gray-300 rounded-md px-4 py-2"
            rows="4"
            required
          ></textarea>
        </div>

        {/* Marks */}
        <div>
          <label className="block font-semibold mb-1">Marks</label>
          <input
            type="number"
            name="marks"
            defaultValue={assignment?.marks}
            placeholder="Enter marks"
            className="input input-bordered w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email</label>
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            placeholder="Enter email"
            className="input input-bordered w-full border border-gray-300 rounded-md px-4 py-2"
            required
          />
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="block font-semibold mb-1">Thumbnail URL</label>
          <input
            type="url"
            name="thumbnailUrl"
            defaultValue={assignment.thumbnailUrl}
            placeholder="Enter image URL"
            className="input input-bordered w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Difficulty Level */}
        {
          assignment.difficulty &&
          <div>
            <label className="block font-semibold mb-1">Difficulty Level</label>
            <select
              name="difficulty"
              defaultValue={assignment?.difficulty}
              className="select select-bordered w-full border border-gray-300 rounded-md px-4 py-2"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        }

        {/* Due Date */}
        <div>
          <label className="block font-semibold mb-1">Due Date</label>
          <DatePicker
            name="dueDate"
            selected={date}
            onChange={(date) => {
              // deadline validation 
              if (compareAsc(new Date(), new Date(date)) === 1) return toast.error('Please enter a valid dueDate ')
              setDate(new Date(date))
            }}
            dateFormat="dd/MM/yyyy"
            className="input input-bordered w-full border border-gray-300 rounded-md px-4 py-2"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn bg-lime-400 px-6 py-2 font-bold text-white rounded-md hover:bg-lime-500"
          >
            Save
          </button>
        </div>
      </form>
    </div>

  );
};

export default UpdateAssignment;
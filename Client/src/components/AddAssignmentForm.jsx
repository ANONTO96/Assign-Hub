
import { useContext, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../provider/AuthProvider';
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";
import { compareAsc } from "date-fns";

const AddAssignmentForm = () => {
  const navigate = useNavigate()
  const {user} =useContext(AuthContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    marks: '',
    thumbnailUrl: '',
    email:`${user?.email}`,
    difficulty: 'easy',
    dueDate: new Date(),
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date) => {
    // deadline validation 
  if(compareAsc(new Date(),new Date(date)) === 1 ) return toast.error('Please enter a valid dueDate ')
    setFormData({ ...formData, dueDate: date });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      // make a post request
      await axios.post(`${import.meta.env.VITE_API_URL}/create-assignments`,formData)
      // resetting form
      e.target.reset
      toast.success('Assignment added successfully')
      navigate('/my-posted-assignments')
    }
    catch(err){
      console.log(err)
      toast.error('Something Went Wrong!!')
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-[var(--card-bg)] border border-[var(--border-color)] shadow-md rounded-lg my-10 transition-colors duration-300">
      <h2 className="text-3xl font-bold mb-6 text-center text-[var(--text-primary)]">
        Create Assignment
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-[var(--text-primary)]">Title</span>
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter assignment title"
            className="input w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-color)]"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-[var(--text-primary)]">Description</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter assignment description"
            className="textarea w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-color)]"
            required
          ></textarea>
        </div>

        {/* Marks */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-[var(--text-primary)]">Marks</span>
          </label>
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Enter marks"
            className="input w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-color)]"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-[var(--text-primary)]">Email</span>
          </label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="input w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-color)]"
            required
          />
        </div>

        {/* Thumbnail URL */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-[var(--text-primary)]">Thumbnail Image URL</span>
          </label>
          <input
            type="url"
            name="thumbnailUrl"
            value={formData.thumbnailUrl}
            onChange={handleChange}
            placeholder="Enter image URL"
            className="input w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-color)]"
          />
        </div>

        {/* Difficulty Level */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-[var(--text-primary)]">Difficulty Level</span>
          </label>
          <select
            name="difficulty"
            value={formData.difficulty}
            onChange={handleChange}
            className="select w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-color)]"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Due Date */}
        <div>
          <label className="label">
            <span className="label-text font-semibold text-[var(--text-primary)]">Due Date</span>
          </label>
          <DatePicker
            selected={formData.dueDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            className="input w-full bg-[var(--background)] text-[var(--text-primary)] border-[var(--border-color)]"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="btn px-6 py-2 font-bold bg-[var(--button-bg)] text-[var(--button-text)] border border-[var(--border-color)] hover:opacity-90 transition-colors duration-300"
          >
            Create Assignment
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddAssignmentForm;

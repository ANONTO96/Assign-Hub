import AddAssignmentForm from "../components/AddAssignmentForm";

const AddAssignment = () => {
    return (
        <div className="min-h-screen bg-[var(--background)] text-[var(--text-primary)] p-4 transition-colors duration-300">
           <AddAssignmentForm></AddAssignmentForm> 
        </div>
    );
};

export default AddAssignment;
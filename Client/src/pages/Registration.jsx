
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { useContext } from 'react';
import toast from 'react-hot-toast'


const Registration = () => {
    const navigate = useNavigate()
    const { createUser, updateUserProfile, setUser } =
        useContext(AuthContext)

    const verifyPassword = (password) => {
        if (!/[A-Z]/.test(password)) {
            return "Password must include at least one uppercase letter.";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must include at least one lowercase letter.";
        }
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        return "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, photo, email)

        const error = verifyPassword(password);

        if (error) {
            alert(error)
            return;
        }

        try {
            //2. User Registration
            const result = await createUser(email, password)
            await updateUserProfile(name, photo)
            setUser({ ...result.user, photoURL: photo, displayName: name })
            toast.success('Signup Successful')
            navigate('/login')
        } catch (err) {
            console.log(err)
            toast.error(err?.message)
        }
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col">
                <div className="card bg-base-200 md:w-[550px] shrink-0 shadow-2xl p-8 rounded-none">
                    <h1 className="text-2xl text-center mt-5">Register your account</h1>
                    <form onSubmit={handleSubmit} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Your Name</span>
                            </label>
                            <input type="text" name="name"
                                placeholder="Enter your name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Photo URL</span>
                            </label>
                            <input type="text" name="photo" placeholder="Enter your photo url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Password</span>
                            </label>
                            <input type="password"
                                name="password" placeholder="Enter your password" className="input input-bordered" required />
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-gray-500 text-white">Register</button>
                        </div>
                        <p className="text-center">Already Registered An Account ? <Link to="/login" className="text-red-600">Login</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Registration;
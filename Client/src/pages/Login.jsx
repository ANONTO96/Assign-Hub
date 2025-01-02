import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { useContext } from "react";
import toast from 'react-hot-toast'

const Login = () => {
    const { signIn, signInWithGoogle } = useContext(AuthContext)
    const navigate = useNavigate()

     // Google Signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      toast.success('Signin Successful')
      navigate('/')
    } catch (err) {
      console.log(err)
      toast.error('already registered this email')
    }
  }

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

    const handleSignin = async e => {
        e.preventDefault();

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const error = verifyPassword(password);

        if (error) {
            alert(error)
            return;
        }

        try {
            //User Login
            await signIn(email, password)
            toast.success('Signin Successful')
            navigate('/')
        } catch (err) {
            console.log(err)
            toast.error('Oops Wrong Password')
        }
    }

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col">
                <div className="card bg-base-200 md:w-[550px] shrink-0 shadow-2xl p-8 rounded-none">
                    <h1 className="text-2xl text-center mt-5">Login your account</h1>
                    <form onSubmit={handleSignin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Email</span>
                            </label>
                            <input type="email"
                                name="email" placeholder="Enter your email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-base">Password</span>
                            </label>
                            <input type="password"
                                name="password" placeholder="Enter your password" className="input input-bordered" required />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover text-sm text-gray-500">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                        <button className="btn text-white bg-gray-500 hover:text-sky-500">Log In</button>
                        </div>
                        <div>
                            <div className="w-full space-y-2 flex flex-col">
                                <button onClick={handleGoogleSignIn} className="btn text-sky-500 hover:text-black">Login With<img className="w-6" src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="" /></button>
                            </div>
                        </div>
                        <p className="text-center">Don’t Have An Account ? <Link to="/register" className="text-red-600">Register</Link></p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
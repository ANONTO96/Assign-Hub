import bnr from "../assets/cool-background.svg"
const Banner = () => {
  return (
    <div className="hero h-[600px] lg:w-[80%]  mx-auto text-black rounded-xl bg-[var(--background)]"
      style={{
        backgroundImage: `url(${bnr})`,
      }}
    >
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to AssignHub</h1>
          <p className="text-lg mb-6">
            Simplify task management, boost productivity, and collaborate effortlessly with AssignHub.
          </p>
          <button className="btn px-6 py-3 font-bold rounded-lg shadow-md bg-sky-200 text-black hover:scale-105 transition-transform">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;

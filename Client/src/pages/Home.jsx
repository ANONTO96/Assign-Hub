import Banner from "../components/Banner";
import FAQ from "../components/FAQ";
import Features from "../components/Features";
import Marquee from "react-fast-marquee";
import  m1  from "../assets/Colorful Office Supplies.jpeg";
import  m2 from "../assets/Man in Motion Using Laptop Illustration.jpeg";
import  m3 from "../assets/Stylized Illustration of Determined Young Female.jpeg";
import m4  from "../assets/Vibrant Stride.jpeg";



const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Features></Features>
            <FAQ></FAQ>
            <Marquee speed={100} gradient={false} pauseOnHover>
                <div><img className="h-[400px] w-[350px]" src={m1} alt="" /></div>
                <div><img className="h-[400px] w-[400px]" src={m3} alt="" /></div>
                <div><img className="h-[400px] w-[350px]" src={m2} alt="" /></div>
                <div><img className="h-[400px] w-[400px]" src={m4} alt="" /></div>
            </Marquee>
        </div>
    );
};

export default Home;
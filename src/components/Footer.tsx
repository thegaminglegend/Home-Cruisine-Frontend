import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-mainColor py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <span className="text-3xl text-white font-bold tracking-tight">
          Home Cuisine
        </span>
        <span className="text-white font-bold tracking-tight flex gap-4">
          <Link to="https://moseszhao.com" className="text-2xl">
            mosesZhao.com
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;

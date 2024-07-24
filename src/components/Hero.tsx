import hero from "../assets/top-view-food-banquet.jpg";

const Hero = () => {
  return (
    <div className="">
      {/* 
        w-full: keep full width for all screen size
        object-cover: scale image to cover the container (Keeps image from distorting)
        */}
      <img src={hero} className="w-full max-h-[600px] object-cover" />
    </div>
  );
};

export default Hero;

import React from 'react'
import Postcard from '../components/Postcard'
import heroImg from "../assets/TMX1145991747220153final banner.jpg";
import Banner from '../components/Banner';
import Footertop from '../components/Footertop';


const Home = () => {
  return (
<div>

      {/* HERO */}
     <div className="h-150 w-full bg-[#FAF3E1] flex items-center justify-center ">

  {/* INNER HERO BANNER */}
  <div
    className="w-[93%] h-[92%] bg-cover bg-center bg-no-repeat  shadow-lg flex items-center justify-center relative  "
    style={{
      backgroundImage: `url(${heroImg})`,
    }}
  >

       <div className="absolute text-center text-[#D34E4E] px-6 gap-0">
    
    <h1 className="text-4xl md:text-6xl font-bold mb-34 drop-shadow-lg">
      Document Your Journey 🌍
    </h1>

    
  </div>
      </div>

      </div>
{/* BANNER */}
<div>
  <Banner />
</div>

      {/* POSTS */}
      <div className="p-6 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
       <Postcard />
        <Postcard />
        <Postcard />
        <Postcard />
        <Postcard />
        <Postcard />
      </div>


{/* FOOTER TOP */}
   <div>
  <Footertop />
    </div>
    </div>
  );
};

export default Home
import { Link } from "react-router-dom";
import HomeImage from "../assets/homeImage.png";
import bed from "../assets/bed.png";
import chair from "../assets/chair.jpeg";
import lounch from "../assets/lounch.png";
import living from "../assets/living.png";

 function Home() {
  return (
    <>
      <div className="flex items-center  flex-col-reverse md:flex-row justify-between">
        {/* left-side */}
        <div className="md:w-1/2 space-y-5 mt-14 md:mt-0">
          <h2 className="text-2xl">New Products</h2>
          <h1 className="text-6xl">flexible chair</h1>
          <p className="text-lg text-gray-500">
            Lorem ipsum dolor sit amet consectetur adipisicing <br /> elit.
            Atque adipisci quibusdam fugiat
          </p>
          <button
            className="bg-orange-600 px-5 text-white hover:text-orange-500 hover:bg-white py-2 shadow transition-all
        duration-500"
          >
            <Link to="/Products">Shop now</Link>
          </button>
        </div>
        {/* right-side */}
        <div>
          <img src={HomeImage} alt="" />
        </div>
      </div>
      <div className="mt-4">
      <h1 className="text-center text-2xl font-bold">Features</h1>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-14 mt-14">
        <div
          className="flex items-center border-2 border-gray-600 rounded-full py-10 px-14
         w-40 h-40 space-y-4 flex-col hover:border-gray-200 transition-all duration-300 cursor-pointer"
        >
          <img src={bed} alt="" />
          <h1>Bedroom</h1>
        </div>
        <div
          className="flex items-center border-2 border-gray-600 rounded-full py-10 px-14
         w-40 h-40 space-y-4 flex-col hover:border-gray-200 transition-all duration-300 cursor-pointer"
        >
          <img src={chair} alt="" />
          <h1>Chair</h1>
        </div>
        <div
          className="flex items-center border-2 border-gray-600 rounded-full py-10 px-14
         w-40 h-40 space-y-4 flex-col hover:border-gray-200 transition-all duration-300 cursor-pointer"
        >
          <img src={lounch} alt="" />
          <h1>louch</h1>
        </div>
        <div
          className="flex items-center border-2 border-gray-600 rounded-full py-10 px-14
         w-40 h-40 space-y-4 flex-col hover:border-gray-200 transition-all duration-300 cursor-pointer"
        >
          <img src={living} alt="" />
          <h1>Living</h1>
        </div>
      </div>
    </div>
    </>
  );
}

export default Home;
import { useNavigate } from "react-router-dom";
import { wrapClick } from "../utils";
import NavBar from "../components/shared/nav";

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-black relative overflow-clip grid place-content-center">
      <NavBar />
      <div className="w-full h-full absolute left-0 right-0 top-0 grid place-content-center z-0">
        <div className="w-full h-full bg-black/[0.6] absolute left-0 right-0 top-0 backdrop-blur-[2px]"></div>
        <img
          src="/images/jojo.jpeg"
          alt="jojo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="text-white z-50 flex items-center justify-center flex-col px-4 lg:px-2 lg:gap-5 gap-4 ">
        <p className="font-cursive font-extralight text-[2.4rem] lg:text-[5rem] text-center ">
          In Loving Memory of
        </p>
        <h4 className="lg:text-[4.5rem] text-[2rem] text-center font-semibold uppercase leading-tight lg:leading-normal ">
          Josephine Nana Adwoa Asmah
        </h4>
        <div
          className="cursor-pointer w-fit font-extralight uppercase border-[0.9px] border-[#ffffff] lg:p-6 lg:text-[1.4rem] text-[0.9rem] p-3 hover:bg-white hover:text-black duration-700  "
          role="link"
          onClick={wrapClick(() => {
            navigate("/share-memory");
          })}
        >
          <p> Share memory</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

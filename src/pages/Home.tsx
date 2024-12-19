import { useNavigate } from "react-router-dom";
import { cn, wrapClick } from "../utils";

const HomePage = () => {
  const other_pages = [
    {
      link: "/memories",
      title: "Memories",
    },
    {
      link: "/gallery",
      title: "Gallery",
    },
  ];

  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-black relative overflow-clip grid place-content-center">
      <nav className="text-white flex items-center gap-4 pt-6 absolute right-4 lg:right-8 z-40">
        {other_pages?.map((page) => {
          return (
            <div
              className={cn(
                "lg:text-[1.6rem] text-[0.95rem] cursor-pointer font-light border-b-2 border-b-black hover:border-b-white duration-700 px-2 lg:px-4"
              )}
              key={page.title}
            >
              <p
                role="link"
                onClick={wrapClick(() => {
                  navigate(page.link);
                })}
                className=""
              >
                {page.title}
              </p>
            </div>
          );
        })}
      </nav>

      <div className="w-full h-full absolute left-0 right-0 top-0 grid place-content-center z-0">
        <div className="w-full h-full bg-black/[0.72] absolute left-0 right-0 top-0 backdrop-blur-[2.5px]"></div>
        <img
          src="/images/jojo.jpeg"
          alt="jojo"
          className="w-full h-full object-contain"
        />
      </div>

      <div className="text-white z-50 flex items-center justify-center flex-col px-4 lg:px-2 lg:gap-5 gap-4 ">
        <h4 className="lg:text-[4.5rem] text-[2rem] text-center font-semibold uppercase leading-tight lg:leading-normal">
          Josephine Nana Adwoa Asmah
        </h4>
        <div
          className="cursor-pointer w-fit font-extralight uppercase border-[0.9px] border-[#ffffff] lg:p-6 lg:text-[1.4rem] text-[1.15rem] p-3 hover:bg-white hover:text-black duration-700  "
          role="link"
          onClick={wrapClick(() => {
            navigate("/memories");
          })}
        >
          <p> Share memory</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

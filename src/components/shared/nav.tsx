import { useLocation, useNavigate } from "react-router-dom";
import { cn, wrapClick } from "../../utils";

interface props {
  linkClass?: string;
  undelinecolor?: string;
}
const NavBar = ({
  linkClass = "border-b-black hover:border-b-white text-white ",
  undelinecolor = "border-b-white",
}: props) => {
  const { pathname } = useLocation();
  const other_pages = [
    {
      link: "/",
      title: "Home",
    },
    {
      link: "/memories",
      title: "Memories",
    },
    // {
    //   link: "/gallery",
    //   title: "Gallery",
    // },
    {
      link: "/share-memory",
      title: "Share a memory",
    },
  ];
  const navigate = useNavigate();
  return (
    <nav className=" flex lg:items-center justify-center gap-4 pt-6 absolute right-0 px-2 lg:px-0 lg:right-8 z-40 w-[100vw] lg:w-fit">
      {other_pages?.map((page) => {
        return (
          <div
            className={cn(
              "lg:text-[1.6rem] text-[0.95rem] cursor-pointer font-extralight border-b-2  duration-700 px-2 lg:px-4",
              pathname == page.link ? (undelinecolor as string) : "",
              linkClass
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
  );
};

export default NavBar;

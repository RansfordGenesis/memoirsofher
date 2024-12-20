import { supabaseClient } from "@/lib/supabase";
import MemoryCard from "../components/memory-card";
import { useEffect, useState } from "react";
import { cn, splitArrayRoundRobin, wrapClick } from "@/utils";
import { useLocation, useNavigate } from "react-router-dom";

const MemoriesPage = () => {
  const [data, setData] = useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  async function fetchAllMemories() {
    setLoading(true);

    const { data: Memories, error } = await supabaseClient
      .from("memory")
      .select();

    if (data && !error) {
      setLoading(false);
    }
    setData(() => splitArrayRoundRobin(Memories as any[], 5));
  }

  useEffect(() => {
    fetchAllMemories();
  }, []);
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const other_pages = [
    {
      link: "/memories",
      title: "Memories",
    },
    {
      link: "/home",
      title: "Home",
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
  return (
    <div className=" p-4 lg:mx-auto">
      <div>
        <nav className=" flex items-center justify-center gap-4 pt-6 ">
          {other_pages?.map((page) => {
            return (
              <div
                className={cn(
                  "lg:text-[1.6rem] text-[0.95rem] cursor-pointer font-extralight border-b-2  duration-700 px-2 lg:px-4",
                  pathname == page.link ? "border-b-black" : "",
                  "hover:border-b-black text-black border-transparent"
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
{/* 
<div
            className={cn(
              "lg:text-[1.6rem] text-[0.95rem] cursor-pointer font-extralight border-b-2  duration-700 px-2 lg:px-4",
              pathname == "/share-memory" ? "border-b-black" : "",
              "hover:border-b-black text-black border-transparent"
            )}
          >
            <p
              role="link"
              onClick={wrapClick(() => {
                navigate("/share-memory");
              })}
              className=""
            >
              Share a Memory
            </p>
          </div> */}
        </nav>
      </div>
      <h4 className="text-center font-cursive lg:text-[4.8rem] text-[2.3rem] my-4">
        Memory Wall
      </h4>

      <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3">
        {loading ? (
          <>
            {splitArrayRoundRobin(
              Array.from(
                { length: 10 },
                () => Math.floor(Math.random() * (600 - 200 + 1)) + 200
              ),
              5
            )?.map((skel) => {
              return (
                <div
                  className="flex flex-col h-fit gap-4"
                  key={Math.random() * (600 - 200 + 1)}
                >
                  {skel?.map((i) => (
                    <div
                      key={i}
                      className="w-full bg-gray-200 animate-pulse rounded-lg"
                      style={{
                        height: `${i}px`,
                      }}
                    ></div>
                  ))}
                </div>
              );
            })}
          </>
        ) : (
          <>
            {data?.map((col, inx) => {
              return (
                <div className="flex flex-col h-fit gap-4" key={inx}>
                  {col.map((cardData: any) => {
                    return (
                      <MemoryCard
                        key={cardData?.imgUrl}
                        tags={[cardData?.tags]}
                        title={cardData?.title}
                        message={cardData?.message}
                        imageUrl={cardData?.imgUrl}
                        author={cardData?.name || "Anon"}
                      />
                    );
                  })}
                </div>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default MemoriesPage;

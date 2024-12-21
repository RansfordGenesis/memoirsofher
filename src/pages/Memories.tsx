import { supabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { splitArrayRoundRobin } from "@/utils";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import MemoryCard from "@/components/memory-card";
import { CardData } from "@/utils/schema";
import SharedLayout from "@/layout/parallax-page.layout";

const MemoriesPage = () => {
  const [data, setData] = useState<CardData[][]>([]);

  const [loading, setLoading] = useState<boolean>(false);
  async function fetchAllMemories() {
    setLoading(true);

    const { data: Memories, error } = await supabaseClient
      .from("memory")
      .select()
      .order("created_at", { ascending: false });

    if (data && !error) {
      setLoading(false);
    }
    setData(() => splitArrayRoundRobin(Memories as CardData[], 5));
  }

  useEffect(() => {
    fetchAllMemories();
  }, []);
  return (
    <SharedLayout title="Memory Wall">
      <>
        {loading ? (
          <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3">
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
          </div>
        ) : (
          <>
            <ParallaxScroll
              className=" w-full h-full"
              cards={data}
              component={(item) => (
                <MemoryCard
                  tags={item.tags}
                  title={item.title}
                  message={item.message}
                  imageUrl={item.imgUrl}
                  author={item.name || "Anon"}
                />
              )}
            />
          </>
        )}
      </>
    </SharedLayout>
  );
};

export default MemoriesPage;

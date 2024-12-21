import CustomImage from "@/components/shared/image";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import SharedLayout from "@/layout/parallax-page.layout";
import { supabaseClient } from "@/lib/supabase";
import { splitArrayRoundRobin } from "@/utils";
import { GalleryData } from "@/utils/schema";
import { useEffect, useState } from "react";

const Gallery = () => {
  const [data, setData] = useState<GalleryData[][]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  async function fetchAllGalleryImages() {
    setLoading(true);

    const { data: Memories, error } = await supabaseClient
      .from("gallery")
      .select()
      .order("created_at", { ascending: false });

    if (data && !error) {
      setLoading(false);
    }
    setData(() => splitArrayRoundRobin(Memories as GalleryData[], 5));
  }

  useEffect(() => {
    fetchAllGalleryImages();
  }, []);

  console.log(data);
  return (
    <SharedLayout title="Gallery">
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
            // className=" w-full h-full"
            cards={data}
            component={(item) => (
              <CustomImage
                src={item.imgUrl}
                alt="image"
                className="  aspect-auto object-cover"
                height={Math.floor(Math.random() * (600 - 200 + 1)) + 200}
              />
            )}
          />
        </>
      )}
    </SharedLayout>
  );
};

export default Gallery;

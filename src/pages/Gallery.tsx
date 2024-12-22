import CustomImage from "@/components/shared/image";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import SharedLayout from "@/layout/parallax-page.layout";
import { supabaseClient } from "@/lib/supabase";
import { GalleryData } from "@/utils/schema";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Gallery = () => {
  const [data, setData] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllGalleryImages = useCallback(async () => {
    try {
      const { data: Memories, error } = await supabaseClient
        .from("gallery")
        .select()
        .order("created_at", { ascending: false })
        

      if (!error) {
        setData(Memories as GalleryData[]);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllGalleryImages();
  }, [fetchAllGalleryImages]);

  const containerVariants = useMemo(() => ({
    hidden: { 
      y: 80,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 30,
        stiffness: 100,
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      y: 80,
      opacity: 0,
      transition: {
        duration: 0.3
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 120
      }
    }
  }), []);

  const skeletonHeights = useMemo(() => 
    Array.from({ length: 10 }, () => Math.floor(Math.random() * (600 - 200 + 1)) + 200),
    []
  );

  return (
    <SharedLayout title="Gallery">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="skeleton"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full"
          >
            <div className="grid lg:grid-cols-5 gap-4 md:grid-cols-3 sm:grid-cols-2">
              {skeletonHeights.map((height, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col gap-4"
                >
                  <div 
                    className="w-full bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"
                    style={{ height: `${height}px` }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={containerVariants}
            className="w-full"
          >
            <ParallaxScroll
              cards={data}
              component={(item) => (
                <motion.div variants={itemVariants}>
                  <CustomImage
                    src={item.imgUrl}
                    alt="image"
                    className="aspect-auto object-cover rounded-xl"
                    height={Math.floor(Math.random() * (600 - 200 + 1)) + 200}
                    loading="lazy"
                  />
                </motion.div>
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </SharedLayout>
  );
};

export default Gallery;
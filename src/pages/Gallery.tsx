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
        .limit(50);

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
      opacity: 0,
      y: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.05,
        delayChildren: 0,
        duration: 0.15,
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.1,
      },
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: {
      y: 15,
      opacity: 0,
      scale: 0.95
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3
      }
    }
  }), []);

  return (
    <SharedLayout title="Gallery">
      <div className="w-full overflow-hidden">
        <AnimatePresence mode="sync">
          {!loading && (
            <motion.div
              key="gallery-container"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={containerVariants}
              className="w-full relative overflow-visible"
            >
              <ParallaxScroll
                className="w-full h-full overflow-visible"
                cards={data}
                component={(item) => (
                  <motion.div variants={itemVariants}>
                    <CustomImage
                      src={item.imgUrl}
                      alt="image"
                      className="aspect-auto object-cover rounded-xl"
                      height={Math.floor(Math.random() * (600 - 200 + 1)) + 200}
                    />
                  </motion.div>
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SharedLayout>
  );
};

export default Gallery;

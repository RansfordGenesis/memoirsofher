import CustomImage from "@/components/shared/image";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import SharedLayout from "@/layout/parallax-page.layout";
import { supabaseClient } from "@/lib/supabase";
import { GalleryData } from "@/utils/schema";
import { useEffect, useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const [data, setData] = useState<GalleryData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAllGalleryImages = useCallback(async () => {
    try {
      const { data: Memories, error } = await supabaseClient
        .from("gallery")
        .select()
        .order("created_at", { ascending: false });

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
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: [0.6, 0.01, 0.05, 0.95],
        duration: 0.7,
        staggerChildren: 0.1,
      }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.2
      }
    }
  }), []);

  return (
    <SharedLayout title="Gallery">
      {!loading && (
        <motion.div
          initial="hidden"
          animate="visible"
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
                />
              </motion.div>
            )}
          />
        </motion.div>
      )}
    </SharedLayout>
  );
};

export default Gallery;

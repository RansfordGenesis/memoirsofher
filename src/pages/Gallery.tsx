import { useRef } from "react"; // Add useRef to imports
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
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  
  const loader = useRef<HTMLDivElement | null>(null);

  const fetchAllGalleryImages = useCallback(async (page: number) => {
    if (page === 1) {
      setLoading(true);
    } else {
      setIsLoadingMore(true);
    }

    try {
      const { data: Images, error } = await supabaseClient
        .from("gallery")
        .select()
        .order("created_at", { ascending: false })
        .range((page - 1) * 15, page * 15 - 1);

      if (!error) {
        setData(prev => [...prev, ...(Images as GalleryData[])]);
        if (Images.length < 15) setHasMore(false);
      }
    } finally {
      if (page === 1) {
        setLoading(false);
      } else {
        setIsLoadingMore(false);
      }
    }
  }, []);

  const loadMore = useCallback(() => {
    if (hasMore && !loading && !isLoadingMore) {
      setCurrentPage(prev => prev + 1);
    }
  }, [hasMore, loading, isLoadingMore]);

  useEffect(() => {
    fetchAllGalleryImages(currentPage);
  }, [currentPage, fetchAllGalleryImages]);

  useEffect(() => {
    if (loading || isLoadingMore || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loading, isLoadingMore, hasMore, loadMore]);

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
                cards={data }
                component={(item) => (
                  <motion.div 
                    key={item.imgUrl}
                    variants={itemVariants}
                  >
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
        {/* Sentinel Element */}
        <div ref={loader} />
      </div>
    </SharedLayout>
  );
};

export default Gallery;

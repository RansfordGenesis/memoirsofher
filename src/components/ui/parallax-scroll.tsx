"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import MemoryCard from "../memory-card";

interface CardData {
  imgUrl: string;
  tags: string[];
  title: string;
  message: string;
  name?: string;
}

export const ParallaxScroll = ({
  cards,
  className,
}: {
  cards: CardData[][];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll();

  const translate = cards.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -200 : 200])
  );

  return (
    <div className={cn("h-full items-start w-full", className)} ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 items-start w-full mx-auto gap-10  ">
        {cards.map((cardData, idx) => (
          <div className="grid gap-10" key={`grid-${idx}`}>
            {cardData.map((item, idx2) => (
              <motion.div
                style={{ y: translate[idx] }}
                key={`card-${idx}-${idx2}`}
              >
                <MemoryCard
                  tags={item.tags}
                  title={item.title}
                  message={item.message}
                  imageUrl={item.imgUrl}
                  author={item.name || "Anon"}
                />
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

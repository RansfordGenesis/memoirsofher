import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Iprops<T> {
  cards: T[][];
  className?: string;
  component: (props: T) => React.ReactNode;
}

export const ParallaxScroll = <T,>({
  cards,
  className,
  component,
}: Iprops<T>) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll();

  const translate = cards.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -200 : 200])
  );

  return (
    <div className={cn("h-full items-start w-full", className)} ref={gridRef}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 items-start w-full mx-auto gap-10 ">
        {cards.map((cardData, idx) => (
          <motion.div
            className="grid gap-10 relative"
            key={`grid-${idx}`}
            style={{ y: translate[idx] }}
          >
            <div className="grid gap-10 relative">
              {cardData.map((item, idx2) => (
                <div
                  key={`card-${idx}-${idx2}`}
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  className="relative h-fit "
                >
                  {component(item)}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

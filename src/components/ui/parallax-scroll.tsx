import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface Iprops<T> {
  cards: T[];
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

  const createColumns = (items: T[], columnCount: number) => {
    const columns: T[][] = Array.from({ length: columnCount }, () => []);
    items.forEach((item, index) => {
      columns[index % columnCount].push(item);
    });
    return columns;
  };

  const desktopColumns = createColumns(cards, 4);
  const mediumColumns = createColumns(cards, 2);

  const translate = desktopColumns.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -200 : 200])
  );

  const mediumTranslate = mediumColumns.map((_, index) =>
    useTransform(scrollYProgress, [0, 1], [0, index % 2 === 0 ? -200 : 200])
  );

  return (
    <div className={cn("h-full items-start w-full", className)} ref={gridRef}>
      <div className="hidden lg:grid lg:grid-cols-4 items-start w-full mx-auto gap-2 py-8 lg:py-4">
        {desktopColumns.map((columnCards, idx) => (
          <motion.div
            className="grid gap-10 relative"
            key={`desktop-${idx}`}
            style={{ y: translate[idx] }}
          >
            <div className="grid gap-10 relative">
              {columnCards.map((item, idx2) => (
                <div
                  key={`desktop-card-${idx}-${idx2}`}
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  className="relative h-fit"
                >
                  {component(item)}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:hidden items-start w-full mx-auto gap-3 py-8 lg:py-16">
        {mediumColumns.map((columnCards, idx) => (
          <motion.div
            className="grid gap-10 relative"
            key={`medium-${idx}`}
            style={{ y: mediumTranslate[idx] }}
          >
            <div className="grid gap-10 relative">
              {columnCards.map((item, idx2) => (
                <div
                  key={`medium-card-${idx}-${idx2}`}
                  style={{ transform: "translate3d(0, 0, 0)" }}
                  className="relative h-fit"
                >
                  {component(item)}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:hidden items-start w-full mx-auto gap-10 py-4">
        {cards.map((item, idx) => (
          <div key={`mobile-card-${idx}`} className="relative h-fit">
            {component(item)}
          </div>
        ))}
      </div>
    </div>
  );
};

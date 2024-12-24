import { supabaseClient } from "@/lib/supabase";
import { useEffect, useState, useRef } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import MemoryCard from "@/components/memory-card";
import { CardData } from "@/utils/schema";
import SharedLayout from "@/layout/parallax-page.layout";
import { motion, AnimatePresence } from "framer-motion";
import MemoryFilter from "@/components/memory-filter";
import { useMemoryFiltering } from "@/hooks/useMemoryFiltering";

const MemoriesPage = () => {
	const [data, setData] = useState<CardData[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

	const { selectedTags, filteredMemories, allTags, handleTagSelect } =
		useMemoryFiltering(data);

	// Add pagination state
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [hasMore, setHasMore] = useState<boolean>(true);

	const loader = useRef<HTMLDivElement | null>(null);

	const BATCH_SIZE = 100; // Increased from 50
	const PREFETCH_THRESHOLD = 0.5; // Start loading when 50% through current batch

	// Modify fetchAllMemories to handle initial and subsequent loads
	async function fetchAllMemories(page: number) {
		if (page === 1) {
			setLoading(true);
		} else {
			setIsLoadingMore(true);
		}

		const { data: Memories, error } = await supabaseClient
			.from("memory")
			.select()
			.order("created_at", { ascending: false })
			.range((page - 1) * BATCH_SIZE, page * BATCH_SIZE - 1);

		if (!error) {
			setData(prev => {
				const newData = [...prev, ...(Memories as CardData[])];
				// Prefetch next batch
				if (Memories.length === BATCH_SIZE) {
					prefetchNextBatch(page + 1);
				}
				return newData;
			});
			if (Memories.length < BATCH_SIZE) setHasMore(false);
		}

		if (page === 1) {
			setLoading(false);
		} else {
			setIsLoadingMore(false);
		}
	}

	const prefetchNextBatch = async (nextPage: number) => {
		const { data: nextBatch } = await supabaseClient
			.from("memory")
			.select()
			.order("created_at", { ascending: false })
			.range(nextPage * BATCH_SIZE, (nextPage + 1) * BATCH_SIZE - 1);
			
		// Cache the results (optional)
		if (nextBatch) {
			sessionStorage.setItem(`memories-page-${nextPage}`, JSON.stringify(nextBatch));
		}
	};

	// Update useEffect to fetch the first page
	useEffect(() => {
		fetchAllMemories(currentPage);
	}, [currentPage]);

	// Add load more function
	const loadMore = () => {
		if (hasMore && !loading) {
			setCurrentPage(prev => prev + 1);
		}
	};

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
				rootMargin: "100px", // Increased from 20px
				threshold: PREFETCH_THRESHOLD,
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
	}, [loading, isLoadingMore, hasMore]);

	const containerVariants = {
		hidden: {
			opacity: 0,
			transition: { duration: 0.5 }
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.1,
				duration: 0.6,
				ease: "easeOut"
			}
		}
	};

	const itemVariants = {
		hidden: {
			opacity: 0,
			y: 40,
			scale: 0.98
		},
		visible: {
			opacity: 1,
			y: 0,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 50,
				damping: 20,
				mass: 1,
				duration: 0.8
			}
		}
	};

	return (
		<SharedLayout title="Memory Wall">
			<MemoryFilter
				tags={allTags}
				selectedTags={selectedTags}
				onTagSelect={handleTagSelect}
			/>
			<div className="w-full overflow-hidden">
				<AnimatePresence mode="sync">
					{!loading && (
						<motion.div
							key="gallery-container"
							initial="hidden"
							animate="visible"
							exit="hidden"
							variants={containerVariants}
							className="w-full relative overflow-visible"
						>
							<ParallaxScroll
								className="w-full h-full overflow-visible"
								cards={filteredMemories}
								component={(item) => (
									<motion.div 
										key={`${item.title}-${item.message.substring(0, 10)}`}
										variants={itemVariants}
										layout="position"
										initial="hidden"
										animate="visible"
										exit="hidden"
										whileHover={{ 
											scale: 1.01,
											transition: { duration: 0.4 }
										}}
										whileTap={{ scale: 0.99 }}
									>
										<MemoryCard
											tags={item.tags}
											title={item.title}
											message={item.message}
											imageUrl={item.imgUrl}
											author={item.name || "Anon"}
										/>
									</motion.div>
								)}
							/>
						</motion.div>
					)}
				</AnimatePresence>
				<div ref={loader} />
			</div>
		</SharedLayout>
	);
};

export default MemoriesPage;

import { supabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
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

	const { selectedTags, filteredMemories, allTags, handleTagSelect } =
		useMemoryFiltering(data);

	async function fetchAllMemories() {
		setLoading(true);
		const { data: Memories, error } = await supabaseClient
			.from("memory")
			.select()
			.order("created_at", { ascending: false })
			.limit(50);

		if (!error) {
			setData(Memories as CardData[]);
		}
		setLoading(false);
	}

	useEffect(() => {
		fetchAllMemories();
	}, []);

	const containerVariants = {
		hidden: {
			opacity: 0,
			y: 5, // Reduced from 10
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				when: "beforeChildren",
				staggerChildren: 0.05, // Reduced from 0.1
				delayChildren: 0, // Removed delay
				duration: 0.15, // Reduced from 0.2
			}
		},
		exit: {
			opacity: 0,
			transition: {
				duration: 0.1, // Reduced from 0.2
			},
		}
	};

	const itemVariants = {
		hidden: {
			y: 15, // Reduced from 30
			opacity: 0,
			scale: 0.95 // Increased from 0.3 for subtler scale
		},
		visible: {
			y: 0,
			opacity: 1,
			scale: 1,
			transition: {
				type: "spring",
				stiffness: 300, // Increased from 200
				damping: 20, // Increased for faster settling
				duration: 0.3 // Reduced from 0.5
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
				<AnimatePresence mode="sync"> {/* Changed from "wait" */}
					{!loading && (
						<motion.div
							key={filteredMemories.length} 
							initial="hidden"
							animate="visible"
							exit="exit"
							variants={containerVariants}
							className="w-full relative overflow-visible"
						>
							<ParallaxScroll
								className="w-full h-full overflow-visible"
								cards={filteredMemories}
								component={(item) => (
									<motion.div variants={itemVariants}>
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
			</div>
		</SharedLayout>
	);
};

export default MemoriesPage;

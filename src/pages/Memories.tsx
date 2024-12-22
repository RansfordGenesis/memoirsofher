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
			.order("created_at", { ascending: false });

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
				duration: 0.6,
				when: "beforeChildren",
				staggerChildren: 0.1,
			},
		},
		exit: {
			y: 80,
			opacity: 0,
			transition: {
				duration: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				type: "spring",
				damping: 25,
				stiffness: 120,
			},
		},
	};

	return (
		<SharedLayout title="Memory Wall">
			<MemoryFilter
				tags={allTags}
				selectedTags={selectedTags}
				onTagSelect={handleTagSelect}
			/>

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
							{[...Array(10)].map((_, index) => (
								<motion.div
									key={index}
									variants={itemVariants}
									className="flex flex-col gap-4"
								>
									<div className="w-full h-[300px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse" />
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
							className="w-full h-full"
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
		</SharedLayout>
	);
};

export default MemoriesPage;

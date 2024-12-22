import { supabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { ParallaxScroll } from "@/components/ui/parallax-scroll";
import MemoryCard from "@/components/memory-card";
import { CardData } from "@/utils/schema";
import SharedLayout from "@/layout/parallax-page.layout";
import { motion } from "framer-motion";
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
			},
		},
	};

	const itemVariants = {
		hidden: { y: 20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				ease: "easeOut",
				duration: 0.5,
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

			{!loading ? (
				<motion.div
					initial="hidden"
					animate="visible"
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
			) : null}
		</SharedLayout>
	);
};

export default MemoriesPage;

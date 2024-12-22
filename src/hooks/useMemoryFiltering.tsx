import { useState, useEffect } from "react";
import { CardData } from "@/utils/schema";

export const useMemoryFiltering = (memories: CardData[]) => {
	const [selectedTags, setSelectedTags] = useState<string[]>([]);
	const [filteredMemories, setFilteredMemories] =
		useState<CardData[]>(memories);
	const [allTags, setAllTags] = useState<string[]>([]);

	useEffect(() => {
		const tags = memories.flatMap((memory) => memory.tags);
		const uniqueTags = Array.from(new Set(tags)).sort();
		setAllTags(uniqueTags);
	}, [memories]);

	useEffect(() => {
		if (selectedTags.length === 0) {
			setFilteredMemories(memories);
		} else {
			const filtered = memories.filter((memory) =>
				selectedTags.some((tag) => memory.tags.includes(tag))
			);
			setFilteredMemories(filtered);
		}
	}, [selectedTags, memories]);

	const handleTagSelect = (tag: string) => {
		setSelectedTags((prev) =>
			prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
		);
	};

	return {
		selectedTags,
		filteredMemories,
		allTags,
		handleTagSelect,
	};
};

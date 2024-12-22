import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Props {
	tags: string[];
	selectedTags: string[];
	onTagSelect: (tag: string) => void;
}

const MemoryFilter = ({ tags, selectedTags, onTagSelect }: Props) => {
	return (
		<div className="flex flex-wrap gap-2 mb-8 justify-center">
			{tags.map((tag) => (
				<Badge
					key={tag}
					onClick={() => onTagSelect(tag)}
					className={cn(
						"cursor-pointer transition-all duration-300 hover:bg-black hover:text-white",
						selectedTags.includes(tag)
							? "bg-black text-white"
							: "bg-white text-black"
					)}
				>
					#{tag}
				</Badge>
			))}
		</div>
	);
};

export default MemoryFilter;

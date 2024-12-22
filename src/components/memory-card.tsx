import { useState } from "react";
import CustomImage from "./shared/image";
import MemoryModal from "./memory-modal";

interface IProps {
  author?: string;
  message: string;
  tags: string[];
  imageUrl: string;
  title: string;
}

const MemoryCard = ({
  author = "Anon",
  message,
  tags,
  imageUrl,
  title,
}: IProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  return (
    <>
      <div
        className="cursor-pointer h-full rounded-xl transition-transform hover:scale-[1.02] shadow-md"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
      >
        <CustomImage
          src={imageUrl}
          alt={title}
          className="w-full rounded-t-xl aspect-auto object-cover"
          skeletonclassname={`h-[${
            Math.floor(Math.random() * (600 - 200 + 1)) + 200
          }px]`}
          height={Math.floor(Math.random() * (600 - 200 + 1)) + 200}
          loading="lazy"
        />
        <div className="border-black/10 border-[1.2px] rounded-b-xl shadow-sm px-3 py-2">
          <p className="text-[0.86rem] text-black/50 font-normal">{author}</p>
          <h4 className="text-[0.98rem] font-light text-black/90">{title}</h4>
          <p className="font-extralight text-[0.87rem] text-black/95 mb-6 line-clamp-3">
            {message}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {tags
              ?.filter((tag) => tag.trim() !== "")
              ?.map((tag) => (
                <p key={tag} className="text-black/80 text-[0.85rem] font-thin">
                  #{tag}
                </p>
              ))}
          </div>
        </div>
      </div>

      <MemoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        memory={{
          author,
          message,
          tags,
          imageUrl,
          title,
        }}
      />
    </>
  );
};

export default MemoryCard;

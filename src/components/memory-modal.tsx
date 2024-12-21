import { motion, AnimatePresence } from "framer-motion";
import CustomImage from "./shared/image";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: {
    author?: string;
    message: string;
    tags: string[];
    imageUrl: string;
    title: string;
  } | null;
}

const MemoryModal = ({ isOpen, onClose, memory }: MemoryModalProps) => {
  if (!memory) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 flex items-center justify-center isolate overflow-y-auto py-4 px-4 sm:py-8"
          style={{ zIndex: 9999 }}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            style={{ zIndex: 1 }}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl bg-white rounded-xl shadow-2xl mx-auto"
            style={{ zIndex: 2 }}
          >
            <div className="sticky top-0 right-0 z-10">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="absolute right-4 top-4 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col lg:flex-row">
              {/* Image Container */}
              <div className="lg:flex-1 lg:max-h-[90vh]">
                <CustomImage
                  src={memory.imageUrl}
                  alt={memory.title}
                  className="w-full h-full object-cover rounded-t-xl lg:rounded-l-xl lg:rounded-tr-none"
                />
              </div>
              
              {/* Content Container */}
              <div className="lg:flex-1 p-6 lg:p-8 lg:max-h-[90vh] lg:overflow-y-auto">
                <div className="mb-6">
                  <h2 className="text-2xl sm:text-3xl font-medium mb-2">
                    {memory.title}
                  </h2>
                  <p className="text-sm sm:text-base text-black/50">
                    Shared by {memory.author || "Anonymous"}
                  </p>
                </div>
                
                <p className="text-base sm:text-lg leading-relaxed mb-8 whitespace-pre-wrap">
                  {memory.message}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {memory.tags
                    ?.filter((tag) => tag.trim() !== "")
                    ?.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-black/5 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default MemoryModal;
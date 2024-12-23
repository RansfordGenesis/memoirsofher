import { motion } from "framer-motion";

interface VideoConsentModalProps {
	onAccept: () => void;
}

const VideoConsentModal = ({ onAccept }: VideoConsentModalProps) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/60 backdrop-blur-sm">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-white rounded-xl p-6 max-w-md mx-4 text-center"
			>
				<h2 className="text-2xl font-medium mb-4">Welcome</h2>
				<p className="mb-6 text-gray-600">
					This page contains audio content. Click below to enable sound and
					continue to the memorial.
				</p>
				<button
					onClick={onAccept}
					className="bg-black text-white px-6 py-3 rounded-lg hover:bg-black/80 transition-colors"
				>
					Continue with Sound
				</button>
			</motion.div>
		</div>
	);
};

export default VideoConsentModal;

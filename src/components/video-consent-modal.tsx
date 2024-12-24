import { motion } from "framer-motion";

interface VideoConsentModalProps {
	onAccept: () => void;
}

const VideoConsentModal = ({ onAccept }: VideoConsentModalProps) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/70 backdrop-blur-sm">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				className="bg-white rounded-xl p-5 max-w-sm mx-4 text-center shadow-lg"
			>
				<h2 className="text-xl mb-3">A Moment of Remembrance</h2>
				<p className="mb-4 text-gray-600 text-sm">
					This memorial contains audio and images that honor JoJs's cherished memories. 
					Please enable sound to experience this tribute fully.
				</p>
				<button
					onClick={onAccept}
					className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition-colors text-sm"
				>
					Begin Memorial 🕊️
				</button>
			</motion.div>
		</div>
	);
};

export default VideoConsentModal;

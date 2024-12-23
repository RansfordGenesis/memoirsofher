import { useNavigate } from "react-router-dom";
import { wrapClick } from "../utils";
import NavBar from "../components/shared/nav";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import VideoConsentModal from "@/components/video-consent-modal";

const HomePage = () => {
	const navigate = useNavigate();
	const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
	const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("mobile");
	const [hasConsent, setHasConsent] = useState(false);
	const [startAnimation, setStartAnimation] = useState(false);
	const videoRef = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setOrientation(window.innerHeight > width ? "portrait" : "landscape");

			if (width < 768) setDeviceType("mobile");
			else if (width < 1024) setDeviceType("tablet");
			else setDeviceType("desktop");
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.pause();
		}
	}, []);

	const handleConsent = () => {
		setHasConsent(true);
		if (videoRef.current) {
			videoRef.current.muted = false;
			videoRef.current.play();
		}
		// Start the animation after a brief delay
		setTimeout(() => setStartAnimation(true), 300);
	};

	const typewriterVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.03,
				delayChildren: 0.1,
				duration: 0.5,
				when: "beforeChildren",
			},
		},
	};

	const letterVariants = {
		hidden: {
			opacity: 0,
			y: 20,
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
				duration: 0.4,
			},
		},
	};

	const titleTextVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: {
				duration: 0.6,
				delay: 0.2
			}
		}
	};

	const shareButtonVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: { 
			opacity: 1, 
			y: 0,
			transition: {
				duration: 0.6,
				delay: 1.2
			}
		}
	};

	const titleText = "In Loving Memory of";
	const firstLine = ["Josephine", "Nana"];
	const secondLine = ["Adwoa", "Asmah"];
	const fullname = ["Josephine", "Nana", "Adwoa", "Asmah"];

	const getTextSize = () => {
		if (deviceType === "desktop") {
			return orientation === "landscape" ? "text-[4rem]" : "text-[5rem]";
		}
		if (deviceType === "tablet") {
			return orientation === "landscape" ? "text-[2.2rem]" : "text-[3.5rem]";
		}
		return orientation === "landscape" ? "text-[1.5rem]" : "text-[2rem]";
	};

	const renderNames = () => {
		// For landscape orientation on mobile and tablet
		if (orientation === "landscape" && (deviceType === "mobile" || deviceType === "tablet")) {
			return (
				<div className="flex flex-row items-center justify-center gap-4">
					{[...firstLine, ...secondLine].map((word, wordIndex) => (
						<motion.span
							key={wordIndex}
							className={`${getTextSize()} font-semibold uppercase leading-tight whitespace-nowrap`}
							style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
						>
							{word.split("").map((char, charIndex) => (
								<motion.span
									key={`${wordIndex}-${charIndex}`}
									variants={letterVariants}
									className="inline-block relative group-hover:text-transparent text-white duration-300"
									style={{ WebkitTextStroke: "1px white" }}
								>
									{char}
								</motion.span>
							))}
						</motion.span>
					))}
				</div>
			);
		}

		// Desktop layout
		if (deviceType === "desktop") {
			return (
				<div className="flex flex-row items-center justify-center gap-4">
					{[...firstLine, ...secondLine].map((word, wordIndex) => (
						<motion.span
							key={wordIndex}
							className={`${getTextSize()} font-semibold uppercase leading-tight whitespace-nowrap`}
							style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
						>
							{word.split("").map((char, charIndex) => (
								<motion.span
									key={`${wordIndex}-${charIndex}`}
									variants={letterVariants}
									className="inline-block relative group-hover:text-transparent text-white duration-300"
									style={{ WebkitTextStroke: "1px white" }}
								>
									{char}
								</motion.span>
							))}
						</motion.span>
					))}
				</div>
			);
		}

		// Tablet portrait layout
		if (deviceType === "tablet") {
			return (
				<div className="grid grid-cols-[auto_auto] justify-center items-center gap-x-1 gap-y-0">
					{[...fullname].map((word, wordIndex) => (
						<motion.span
							key={wordIndex}
							className={`${getTextSize()} font-semibold uppercase leading-[0.9] tracking-tight whitespace-nowrap text-center`}
							style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
						>
							{word.split("").map((char, charIndex) => (
								<motion.span
									key={`${wordIndex}-${charIndex}`}
									variants={letterVariants}
									className="inline-block relative group-hover:text-transparent text-white duration-300"
									style={{ WebkitTextStroke: "1px white" }}
								>
									{char}
								</motion.span>
							))}
						</motion.span>
					))}
				</div>
			);
		}

		// Mobile portrait layout
		return (
			<div className="flex flex-col gap-4 items-center justify-center">
				{[...firstLine, ...secondLine].map((word, wordIndex) => (
					<motion.span
						key={wordIndex}
						className={`${getTextSize()} font-semibold uppercase leading-tight whitespace-nowrap`}
						style={{ textShadow: "0 0 10px rgba(255,255,255,0.3)" }}
					>
						{word.split("").map((char, charIndex) => (
							<motion.span
								key={`${wordIndex}-${charIndex}`}
								variants={letterVariants}
								className="inline-block relative group-hover:text-transparent text-white duration-300"
								style={{ WebkitTextStroke: "1px white" }}
							>
								{char}
							</motion.span>
						))}
					</motion.span>
				))}
			</div>
		);
	};

	return (
		<div className="h-screen w-screen bg-black relative overflow-clip grid place-content-center">
			{!hasConsent && <VideoConsentModal onAccept={handleConsent} />}
			<NavBar />
			<div className="w-full h-full absolute left-0 right-0 top-0 grid place-content-center z-0">
				<div className="w-full h-full bg-black/[0.6] absolute left-0 right-0 top-0 backdrop-blur-[2px]"></div>
				<video
					ref={videoRef}
					loop
					muted
					playsInline
					className="w-full h-full object-cover absolute top-0 left-0"
				>
					<source src="/video/jojo.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>

			<AnimatePresence>
				{(startAnimation || !hasConsent) && (
					<div className="text-white z-50 flex items-center justify-center flex-col px-4 md:px-6 lg:gap-8 gap-6">
						<motion.p 
							variants={titleTextVariants}
							initial="hidden"
							animate={startAnimation ? "visible" : "hidden"}
							className="font-cursive font-extralight text-[1.8rem] md:text-[4rem] lg:text-[5.5rem] text-center"
						>
							{titleText.split("").map((char, index) => (
								<span
									key={index}
									className="inline-block font-cursive font-extralight"
								>
									{char === " " ? "\u00A0" : char}
								</span>
							))}
						</motion.p>

						<motion.div
							variants={typewriterVariants}
							initial="hidden"
							animate={startAnimation ? "visible" : "hidden"}
							className="flex flex-col gap-4 relative group"
						>
							{renderNames()}
						</motion.div>

						<motion.div
							variants={shareButtonVariants}
							initial="hidden"
							animate={startAnimation ? "visible" : "hidden"}
							className="cursor-pointer w-fit font-extralight uppercase border-[0.9px] border-[#ffffff] lg:p-6 lg:text-[1.4rem] md:p-5 md:text-[1.2rem] p-3 text-[0.9rem] hover:bg-white hover:text-black duration-700"
							role="link"
							whileHover={{ scale: 1.05 }}
							onClick={wrapClick(() => {
								navigate("/share-memory");
							})}
						>
							<p>Share memory</p>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
		</div>
	);
};

export default HomePage;

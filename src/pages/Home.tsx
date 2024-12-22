import { useNavigate } from "react-router-dom";
import { wrapClick } from "../utils";
import NavBar from "../components/shared/nav";
import { motion } from "framer-motion";

const HomePage = () => {
	const navigate = useNavigate();

	const typewriterVariants = {
		hidden: { opacity: 0 },
		visible: (i = 1) => ({
			opacity: 1,
			transition: {
				staggerChildren: 0.03,
				delayChildren: 0.05 * i,
			},
		}),
	};

	const letterVariants = {
		hidden: {
			opacity: 0,
			y: 20,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
				duration: 0.2,
			},
		},
	};

	const titleText = "In Loving Memory of";
	const nameText = "Josephine Nana Adwoa Asmah";

	return (
		<div className="h-screen w-screen bg-black relative overflow-clip grid place-content-center">
			<NavBar />
			<div className="w-full h-full absolute left-0 right-0 top-0 grid place-content-center z-0">
				<div className="w-full h-full bg-black/[0.6] absolute left-0 right-0 top-0 backdrop-blur-[2px]"></div>
				<img
					src="/images/jojo.jpeg"
					alt="jojo"
					className="w-full h-full object-contain"
				/>
			</div>

			<div className="text-white z-50 flex items-center justify-center flex-col px-4 lg:px-2 lg:gap-8 gap-6">
				<p className="font-cursive font-extralight text-[2.4rem] lg:text-[5.5rem] text-center">
					{titleText.split("").map((char, index) => (
						<span
							key={index}
							className="inline-block font-cursive font-extralight text-[2.4rem] lg:text-[5rem] text-center"
						>
							{char === " " ? "\u00A0" : char}
						</span>
					))}
				</p>

				<motion.h4
					variants={typewriterVariants}
					initial="hidden"
					animate="visible"
					className="relative lg:text-[5rem] lg:tracking-wide text-[2.5rem] text-center font-semibold uppercase leading-tight lg:leading-normal group"
					style={{
						textShadow: "0 0 10px rgba(255,255,255,0.3)",
					}}
				>
					{nameText.split("").map((char, index) => (
						<motion.span
							key={index}
							variants={letterVariants}
							className="inline-block relative group-hover:text-transparent text-white duration-300"
							style={{
								WebkitTextStroke: "1px white",
							}}
						>
							{char === " " ? "\u00A0" : char}
						</motion.span>
					))}
				</motion.h4>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.6, duration: 0.6 }}
					className="cursor-pointer w-fit font-extralight uppercase border-[0.9px] border-[#ffffff] lg:p-6 lg:text-[1.4rem] text-[0.9rem] p-3 hover:bg-white hover:text-black duration-700"
					role="link"
					whileHover={{ scale: 1.05 }}
					onClick={wrapClick(() => {
						navigate("/share-memory");
					})}
				>
					<p>Share memory</p>
				</motion.div>
			</div>
		</div>
	);
};

export default HomePage;

import { useNavigate } from "react-router-dom";
import { wrapClick } from "../utils";
import NavBar from "../components/shared/nav";
import { motion } from "framer-motion";

const HomePage = () => {
	const navigate = useNavigate();

	return (
		<div className="h-screen w-screen bg-black relative overflow-clip grid place-content-center">
			<NavBar />

			<motion.div
				initial={{ opacity: 0, scale: 1.1 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 1.2, ease: "easeOut" }}
				className="w-full h-full absolute left-0 right-0 top-0 grid place-content-center z-0"
			>
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 1, delay: 0.3 }}
					className="w-full h-full bg-black/[0.6] absolute left-0 right-0 top-0 backdrop-blur-[2px]"
				/>
				<motion.img
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1, delay: 0.5 }}
					src="/images/jojo.jpeg"
					alt="jojo"
					className="w-full h-full object-contain"
				/>
			</motion.div>

			<div className="text-white z-50 flex items-center justify-center flex-col px-4 lg:px-2 lg:gap-5 gap-4">
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.8 }}
					className="font-cursive font-extralight text-[2.4rem] lg:text-[5rem] text-center"
				>
					In Loving Memory of
				</motion.p>

				<motion.h4
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 1 }}
					className="lg:text-[4.5rem] text-[2rem] text-center font-semibold uppercase leading-tight lg:leading-normal"
				>
					Josephine Nana Adwoa Asmah
				</motion.h4>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					whileHover={{ scale: 1.05 }}
					transition={{ duration: 0.5, delay: 1.2 }}
					className="cursor-pointer w-fit font-extralight uppercase border-[0.9px] border-[#ffffff] lg:p-6 lg:text-[1.4rem] text-[0.9rem] p-3 hover:bg-white hover:text-black duration-700"
					role="link"
					onClick={wrapClick(() => navigate("/share-memory"))}
				>
					<p>Share memory</p>
				</motion.div>
			</div>
		</div>
	);
};

export default HomePage;

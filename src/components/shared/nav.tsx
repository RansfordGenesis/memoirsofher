import { useLocation, useNavigate } from "react-router-dom";
import { cn, wrapClick } from "../../utils";
import { motion } from "framer-motion";

interface Props {
	linkClass?: string;
	underlineColor?: string;
}

const other_pages = [
	{ link: "/", title: "Home" },
	{ link: "/memories", title: "Memories" },
	{ link: "/gallery", title: "Gallery" },
	{ link: "/share-memory", title: "Share Memory" },
];

const NavBar = ({
	linkClass = "text-white",
	underlineColor = "bg-white",
}: Props) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	const navVariants = {
		hidden: { y: -20, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { y: -10, opacity: 0 },
		visible: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.4,
				ease: "easeOut",
			},
		},
	};

	return (
		<motion.nav
			initial="hidden"
			animate="visible"
			variants={navVariants}
			className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-opacity-50"
		>
			<div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
				<div className="flex justify-center items-center h-14 sm:h-16 lg:h-20">
					<div className="flex items-center justify-center gap-1 sm:gap-4 lg:gap-8">
						{other_pages?.map((page) => (
							<motion.div
								key={page.title}
								variants={itemVariants}
								className="relative group"
							>
								<motion.button
									whileHover={{ scale: 1.05 }}
									whileTap={{ scale: 0.95 }}
									onClick={wrapClick(() => navigate(page.link))}
									className={cn(
										"text-xs sm:text-sm lg:text-lg font-light tracking-wide transition-colors duration-200 px-1 sm:px-2 py-0.5 sm:py-1",
										linkClass,
										pathname === page.link ? "font-normal" : "hover:font-normal"
									)}
								>
									{page.title}
								</motion.button>

								{/* Active indicator */}
								{pathname === page.link && (
									<motion.div
										layoutId="activeIndicator"
										className={cn(
											"absolute bottom-0 left-0 w-full h-0.5 rounded-full",
											underlineColor
										)}
										transition={{ duration: 0.3 }}
									/>
								)}

								{/* Hover indicator */}
								<div
									className={cn(
										"absolute bottom-0 left-0 w-full h-0.5 rounded-full transform origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100",
										underlineColor,
										pathname === page.link ? "opacity-0" : "opacity-100"
									)}
								/>
							</motion.div>
						))}
					</div>
				</div>
			</div>
		</motion.nav>
	);
};

export default NavBar;

import { useLocation, useNavigate } from "react-router-dom";
import { cn, wrapClick } from "../../utils";

interface Props {
	linkClass?: string;
	underlineColor?: string;
}

const other_pages = [
	{
		link: "/",
		title: "Home",
	},
	{
		link: "/memories",
		title: "Memories",
	},
	{
		link: "/gallery",
		title: "Gallery",
	},
	{
		link: "/share-memory",
		title: "Share a memory",
	},
];

const NavBar = ({
	linkClass = "text-white",
	underlineColor = "bg-white",
}: Props) => {
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<nav className="flex lg:items-center justify-center gap-2 lg:gap-4 pt-4 lg:pt-6 absolute right-0 px-1 lg:px-0 lg:right-8 z-40 w-full lg:w-fit">
			{other_pages?.map((page) => (
				<div
					key={page.title}
					className="relative lg:text-[1.6rem] text-[0.95rem] cursor-pointer font-extralight px-1 lg:px-4 group"
				>
					<p
						role="link"
						onClick={wrapClick(() => {
							navigate(page.link);
						})}
						className={cn(linkClass)}
					>
						{page.title}
					</p>

					{/* Active underline */}
					{pathname === page.link && (
						<div
							className={cn(
								"absolute bottom-0 left-0 w-full h-0.5",
								underlineColor
							)}
						/>
					)}

					{/* Hover underline with animation */}
					<div
						className={cn(
							"absolute bottom-0 left-0 w-full h-0.5 transform scale-x-0 transition-transform duration-300 origin-left group-hover:scale-x-100",
							underlineColor
						)}
					/>
				</div>
			))}
		</nav>
	);
};

export default NavBar;

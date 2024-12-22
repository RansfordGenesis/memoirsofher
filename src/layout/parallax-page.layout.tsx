import NavBar from "@/components/shared/nav";
import React from "react";

interface Props {
	title: string;
	children: React.ReactNode;
}
const SharedLayout = ({ title, children }: Props) => {
	return (
		<div className=" px-4 lg:mx-auto relative  pb-10 ">
			<NavBar linkClass="text-black" underlineColor="bg-black" />
			<h4 className="text-center font-cursive lg:text-[4.8rem] text-[2.3rem] mb-4 pt-[4.5rem] ">
				{title}
			</h4>

			{children}
		</div>
	);
};

export default SharedLayout;

import { useNavigate } from "react-router-dom";
import { wrapClick } from "../utils";
import NavBar from "../components/shared/nav";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("mobile");

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

  const typewriterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: 0.1,
        duration: 0.5,
        when: "beforeChildren"
      }
    }
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
      <NavBar />
      <div className="w-full h-full absolute left-0 right-0 top-0 grid place-content-center z-0">
        <div className="w-full h-full bg-black/[0.6] absolute left-0 right-0 top-0 backdrop-blur-[2px]"></div>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover absolute top-0 left-0"
        >
          <source src="/video/jojo.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="text-white z-50 flex items-center justify-center flex-col px-4 md:px-6 lg:gap-8 gap-6">
        <p className="font-cursive font-extralight text-[1.8rem] md:text-[4rem] lg:text-[5.5rem] text-center">
          {titleText.split("").map((char, index) => (
            <span key={index} className="inline-block font-cursive font-extralight">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </p>

        <motion.div
          variants={typewriterVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >
          {renderNames()}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
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
    </div>
  );
};

export default HomePage;
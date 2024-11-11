import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
  isDarkMode, // Add isDarkMode prop
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
  isDarkMode: boolean; // Specify type for isDarkMode
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] w-full flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="w-full relative" 
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale} isDarkMode={isDarkMode}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="div max-w-6xl mx-auto text-center font-bold text-8xl pb-12"
    >
      <span className="mx-auto text-center font-bold text-8xl ">Empowering Ideas Through </span>
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  children,
  isDarkMode, // Accept isDarkMode prop
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
  isDarkMode: boolean; // Specify type for isDarkMode
}) => {
  return (
    <motion.div
    style={{
      rotateX: rotate,
      scale,
      boxShadow: isDarkMode
        ? "5px 5px 15px 2px rgba(75, 0, 130, 0.7), 15px 15px 30px 5px rgba(58, 0, 89, 0.5), 30px 30px 60px 10px rgba(46, 0, 77, 0.3)"
        : "5px 5px 10px rgba(0, 0, 0, 0.3), 10px 10px 20px rgba(0, 0, 0, 0.2), 20px 20px 40px rgba(0, 0, 0, 0.1), 40px 40px 60px rgba(0, 0, 0, 0.05)",
    }}
    
    
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className="h-full w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  );
};

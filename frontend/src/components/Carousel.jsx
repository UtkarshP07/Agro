import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FiLink } from "react-icons/fi";
import { FaFileContract, FaTruckMoving } from "react-icons/fa";
import { BiBarChartAlt2 } from "react-icons/bi";
import { MdPayment } from "react-icons/md";

// Import images from the assets folder
import img1 from "./assets/1.png";
import img2 from "./assets/2.png";
import img3 from "./assets/3.png";
import img4 from "./assets/4.png";
import img5 from "./assets/5.png";

import "./Carousel.css";

const DEFAULT_ITEMS = [
  {
    title: "Connect",
    description: "Seamless Farmer-Manufacturer Connection",
    id: 1,
    icon: <FiLink className="carousel-icon" />,
  },
  {
    title: "Mediation",
    description: "Contract Farming Assistance",
    id: 2,
    icon: <FaFileContract className="carousel-icon" />,
  },
  {
    title: "Valuation",
    description: "Smart Price Analysis",
    id: 3,
    icon: <BiBarChartAlt2 className="carousel-icon" />,
  },
  {
    title: "Fulfillment",
    description: "Integrated Logistics Support for hassle-free transportation",
    id: 4,
    icon: <FaTruckMoving className="carousel-icon" />,
  },
  {
    title: "Trust",
    description: "Transparent & End-to-end secure payments",
    id: 5,
    icon: <MdPayment className="carousel-icon" />,
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const containerRef = useRef(null);

  // Map each id to its respective background image.
  const bgImages = {
    1: img1,
    2: img2,
    3: img3,
    4: img4,
    5: img5,
  };

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1); // Go to clone.
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
      }}
    >
      <motion.div
        className="carousel-track"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => {
          const range = [
            -(index + 1) * trackItemOffset,
            -index * trackItemOffset,
            -(index - 1) * trackItemOffset,
          ];
          const outputRange = [90, 0, -90];
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const rotateY = useTransform(x, range, outputRange, { clamp: false });
          
          // Get the background image based on the item's id. For a looped carousel, the clone will share the first item's bg.
          const bgImage = bgImages[item.id] || bgImages[1];

          return (
            <motion.div
              key={index}
              className={`carousel-item ${round ? "round" : ""}`}
              style={{
                position: "relative",
                width: itemWidth,
                height: round ? itemWidth : "100%",
                rotateY: rotateY,
                overflow: "hidden",
                ...(round && { borderRadius: "50%" }),
              }}
              transition={effectiveTransition}
            >
              {/* Background image with slight blur */}
              <div
                className="carousel-item-bg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  filter: "blur(1px)",
                  zIndex: 1,
                }}
              />
              {/* Content over the background */}
              <div
                className="carousel-item-content-wrapper"
                style={{
                  position: "relative",
                  zIndex: 2,
                  color: "black",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div className={`carousel-item-header ${round ? "round" : ""}`}>
                  <span className="carousel-icon-container">
                    {item.icon}
                  </span>
                </div>
                <div className="carousel-item-content">
                  <div className="carousel-item-title" style={{ fontWeight: "bold", fontSize: "1.25rem"}}>
                    {item.title}
                  </div>
                  <p className="carousel-item-description" style={{ marginTop: "0.5rem" }}>
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

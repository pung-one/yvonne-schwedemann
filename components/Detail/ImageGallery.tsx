import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import { PiArrowLeftThin, PiArrowRightThin } from "react-icons/pi";
import { ImageData } from "@/lib/types";

const cmsBaseUrl = process.env.NEXT_PUBLIC_CMS_BASE_URL;

const variants = {
  enter: (slideDirection: string) => {
    return {
      x: slideDirection === "right" ? "-30%" : "30%",
      opacity: 0,
    };
  },
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: (slideDirection: string) => {
    return {
      x: slideDirection === "right" ? "30%" : "-30%",
      opacity: 0,
      transition: { duration: 0.3 },
    };
  },
};

type Props = {
  title: string;
  imageData: ImageData[];
  fullscreen: boolean;
};

export function ImageGallery({ title, imageData, fullscreen }: Props) {
  const [buttonEnabled, setButtonEnabled] = useState<boolean>(true);

  const [imageIndexAndDirection, setImageIndexAndDirection] = useState<{
    index: number;
    direction: "left" | "right";
  }>({ index: 0, direction: "right" });

  const {
    attributes: {
      alternativeText,
      formats: {
        large: { url, width, height },
      },
    },
  } = imageData[imageIndexAndDirection.index];

  function prevImage() {
    if (buttonEnabled) {
      setImageIndexAndDirection(({ index }) => {
        return {
          index: index > 0 ? (index -= 1) : imageData.length - 1,
          direction: "left",
        };
      });
    }
  }

  function nextImage() {
    if (buttonEnabled) {
      setImageIndexAndDirection(({ index }) => {
        return {
          index: index < imageData.length - 1 ? (index += 1) : 0,
          direction: "right",
        };
      });
    }
  }

  function getCursor(direction: "left" | "right") {
    if (direction === "left") {
      return `url("data:image/svg+xml,%3Csvg fill='%23000000' height='32px' width='32px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='-23.81 -23.81 285.725 285.725' xml:space='preserve' transform='matrix(1, 0, 0, 1, 0, 0)rotate(0)' stroke='%23000000' stroke-width='0.002381065'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0' transform='translate(0,0), scale(0.5)'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' stroke='%23fbfbfb' stroke-width='23.81065'%3E%3Cpolygon points='238.1065,111.5535 28.7135,111.5535 75.91,64.3565 65.3035,53.75 0,119.053 65.3035,184.357 75.91,173.75 28.7135,126.5535 238.1065,126.5535 '%3E%3C/polygon%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpolygon points='238.1065,111.5535 28.7135,111.5535 75.91,64.3565 65.3035,53.75 0,119.053 65.3035,184.357 75.91,173.75 28.7135,126.5535 238.1065,126.5535 '%3E%3C/polygon%3E%3C/g%3E%3C/svg%3E%0A") 15 15, auto`;
    } else {
      return `url("data:image/svg+xml,%3Csvg fill='%23000000' height='32px' width='32px' version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='-23.81 -23.81 285.725 285.725' xml:space='preserve' transform='matrix(-1, 0, 0, 1, 0, 0)rotate(0)' stroke='%23000000' stroke-width='0.002381065'%3E%3Cg id='SVGRepo_bgCarrier' stroke-width='0' transform='translate(0,0), scale(0.5)'%3E%3C/g%3E%3Cg id='SVGRepo_tracerCarrier' stroke-linecap='round' stroke-linejoin='round' stroke='%23fbfbfb' stroke-width='23.81065'%3E%3Cpolygon points='238.1065,111.5535 28.7135,111.5535 75.91,64.3565 65.3035,53.75 0,119.053 65.3035,184.357 75.91,173.75 28.7135,126.5535 238.1065,126.5535 '%3E%3C/polygon%3E%3C/g%3E%3Cg id='SVGRepo_iconCarrier'%3E%3Cpolygon points='238.1065,111.5535 28.7135,111.5535 75.91,64.3565 65.3035,53.75 0,119.053 65.3035,184.357 75.91,173.75 28.7135,126.5535 238.1065,126.5535 '%3E%3C/polygon%3E%3C/g%3E%3C/svg%3E%0A") 15 15, auto`;
    }
  }

  return (
    <Container>
      <AnimatePresence
        initial={false}
        mode={"popLayout"}
        custom={imageIndexAndDirection.direction}
      >
        <motion.div
          style={{ position: "relative" }}
          key={url}
          custom={imageIndexAndDirection.direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          onAnimationStart={() => setButtonEnabled(false)}
          onAnimationComplete={() => setButtonEnabled(true)}
        >
          {imageIndexAndDirection.index === 0 && (
            <AnimatePresence>
              <motion.div
                style={{
                  zIndex: "3",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translateX(-50%) translateY(-50%)",
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.3 }}
              >
                <Title>{title}</Title>
              </motion.div>
            </AnimatePresence>
          )}
          <Navigation>
            <StyledButton
              $direction="left"
              $cursor={getCursor("left")}
              onClick={() => prevImage()}
            >
              <PiArrowLeftThin />
            </StyledButton>
            <StyledButton
              $direction="right"
              $cursor={getCursor("right")}
              onClick={() => nextImage()}
            >
              <PiArrowRightThin />
            </StyledButton>
          </Navigation>
          <StyledImage
            priority
            $fullscreen={fullscreen}
            alt={alternativeText || ""}
            src={cmsBaseUrl + url}
            width={width}
            height={height}
          />
        </motion.div>
      </AnimatePresence>
      <ImageCounter>{`${imageIndexAndDirection.index + 1}/${
        imageData.length
      }`}</ImageCounter>
    </Container>
  );
}

const Container = styled.section`
  position: relative;
  width: 100%;
`;

const Title = styled.h2`
  font-size: 30px;
  color: #ffff00;
  &:hover {
    opacity: 0;
  }
`;

const StyledImage = styled(Image)<{ $fullscreen: boolean }>`
  width: 100%;
  height: ${({ $fullscreen }) => ($fullscreen ? "100vh" : "fit-content")};
  object-fit: ${({ $fullscreen }) => ($fullscreen ? "cover" : "contain")};
  object-position: center;
`;

const Navigation = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
`;

const StyledButton = styled.button<{
  $direction: "left" | "right";
  $cursor: string;
}>`
  flex: 1;
  display: flex;
  justify-content: ${({ $direction }) =>
    $direction === "right" ? "flex-end" : "flex-start"};
  align-items: center;
  background: none;
  border: none;
  padding: 0 20px;
  @media only screen and (min-width: 768px) {
    * {
      display: none;
    }
    cursor: ${({ $cursor }) => $cursor};
  }
`;

const ImageCounter = styled.p`
  width: 100%;
  text-align: center;
  margin-top: 20px;
`;

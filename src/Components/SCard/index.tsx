import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  background: string | number | (string & {}) | undefined;
  image: string; // URL or base64 string;
  height: number; //in px
  width: number; //in px
  finishPercent: number; // in %
  onComplete: () => void; //callback when card has been scratched
  children: React.ReactNode; // Bottom Layer
}

interface Coordinates {
  x: number;
  y: number;
}

const distanceBetween = (point1: Coordinates, point2: Coordinates) => {
  return Math.sqrt(
    Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2)
  );
};

const angleBetween = (point1: Coordinates, point2: Coordinates) => {
  return Math.atan2(point2.x - point1.x, point2.y - point1.y);
};

const SCard = ({
  image,
  height,
  width,
  finishPercent,
  onComplete,
  background,
  children,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  //Card Scratch Complete?
  const [CardScratched, setCardScratched] = React.useState<boolean>(false);

  // Canvas context
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null
  );
  const [IsDrawing, setIsDrawing] = React.useState<boolean>(false);

  const [IsImageDrawn, setIsImageDrawn] = React.useState<boolean>(false);

  //   const [CanvasOffsetLeft, setCanvasOffsetLeft] = React.useState(initialState)

  //Rendering

  //Start here
  React.useEffect(() => {
    let mouseDown: boolean = false;
    let start: Coordinates = { x: 0, y: 0 };
    let end: Coordinates = { x: 0, y: 0 };
    let canvasOffsetLeft: number = 0;
    let canvasOffsetTop: number = 0;
    let lastPoint: Coordinates = { x: 0, y: 0 };

    const getFilledInPixels = (stride: number) => {
      if (context) {
        if (!stride || stride < 1) {
          stride = 1;
        }

        const pixels = context.getImageData(0, 0, width, height);
        const total = pixels.data.length / stride;
        let count = 0;

        for (let i = 0; i < pixels.data.length; i += stride) {
          //@ts-ignore
          if (parseInt(pixels.data[i], 10) === 0) {
            count++;
          }
        }

        return Math.round((count / total) * 100);
      }
    };

    const handleMouseDown = (evt: MouseEvent) => {
      mouseDown = true;

      lastPoint = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };

      end = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };
    };

    const handleMouseMove = (evt: MouseEvent) => {
      if (mouseDown && context) {
        const currentPoint: Coordinates = {
          x: evt.clientX - canvasOffsetLeft,
          y: evt.clientY - canvasOffsetTop,
        };
        // start = {
        //   x: end.x,
        //   y: end.y,
        // };

        // end = {
        //   x: evt.clientX - canvasOffsetLeft,
        //   y: evt.clientY - canvasOffsetTop,
        // };

        const distance = distanceBetween(lastPoint, currentPoint);

        const angle = angleBetween(lastPoint, currentPoint);

        let x: number = 0,
          y: number = 0;

        for (let i = 0; i < distance; i++) {
          x = lastPoint.x + Math.sin(angle) * i;
          y = lastPoint.y + Math.cos(angle) * i;

          context.globalCompositeOperation = "destination-out";
          context.beginPath();
          context.arc(x, y, 25, 0, 2 * Math.PI, false);
          context.fill();
        }
        console.log({ currentPoint, lastPoint, distance, angle });
        lastPoint = currentPoint;

        // console.log({ filled: getFilledInPixels(32) });
      }
    };

    const handleMouseUp = (evt: MouseEvent) => {
      mouseDown = false;
    };

    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext("2d");

      if (renderCtx) {
        canvasRef.current.addEventListener("mousedown", handleMouseDown);
        canvasRef.current.addEventListener("mouseup", handleMouseUp);
        canvasRef.current.addEventListener("mousemove", handleMouseMove);

        canvasOffsetLeft = canvasRef.current.offsetLeft;
        canvasOffsetTop = canvasRef.current.offsetTop;

        setContext(renderCtx);
      }
    }

    if (context) {
      if (!IsImageDrawn) {
        const topLayer = new Image();
        topLayer.crossOrigin = "Anonymous";
        topLayer.src = image;
        topLayer.onload = () => {
          context.drawImage(topLayer, 0, 0);
          setIsImageDrawn(false);
        };
      }
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [context]);

  React.useEffect(() => {
    console.log({ IsImageDrawn });
  }, [IsImageDrawn]);

  return (
    <Box
      width={width}
      //   background={background}
      height={height}
      position="relative"
      userSelect="none"
    >
      <canvas
        width={width}
        height={height}
        style={{
          position: "absolute",
          top: 0,
          zIndex: 1,
        }}
        ref={canvasRef}
      />

      {/* Bottom Layer */}
      <Box visibility={CardScratched ? "visible" : "hidden"}>{children}</Box>
    </Box>
  );
};

export default SCard;

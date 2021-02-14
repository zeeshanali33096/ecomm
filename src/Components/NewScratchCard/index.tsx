import { Box } from "@chakra-ui/react";
import * as React from "react";
import scratchImage from "../../Images/scratch.jpg";

type Coordinates = {
  x: number;
  y: number;
};

interface Props {
  background: string | number | (string & {}) | undefined;
  image: string; // URL or base64 string;
  height: number; //in px
  width: number; //in px
  finishPercent: number; // in %
  onComplete: () => void; //callback when card has been scratched
  children: React.ReactNode; // Bottom Layer
}

const NewScratchCard = ({
  background,
  image,
  height,
  width,
  finishPercent,
  onComplete,
  children,
}: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [context, setContext] = React.useState<CanvasRenderingContext2D | null>(
    null
  );

  const [CardScratched, setCardScratched] = React.useState(true);

  React.useEffect(() => {
    let mouseDown: boolean = false;
    let start: Coordinates = { x: 0, y: 0 };
    let end: Coordinates = { x: 0, y: 0 };
    let canvasOffsetLeft: number = 0;
    let canvasOffsetTop: number = 0;

    const handleMouseDown = (evt: MouseEvent) => {
      mouseDown = true;

      start = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };

      end = {
        x: evt.clientX - canvasOffsetLeft,
        y: evt.clientY - canvasOffsetTop,
      };
    };

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

    const getPosition = (e: MouseEvent) => {
      if (canvasRef.current) {
        const { top, left } = canvasRef.current.getBoundingClientRect();
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft =
          window.pageXOffset || document.documentElement.scrollLeft;

        return {
          //   x: (e.pageX || e.touches[0].clientX) - left - scrollLeft,
          //   y: (e.pageY || e.touches[0].clientY) - top - scrollTop,
          x: e.pageX - left - scrollLeft,
          y: e.pageY - top - scrollTop,
        };
      }
    };

    const handleMouseUp = (evt: MouseEvent) => {
      mouseDown = false;
    };

    const handleMouseMove = (evt: MouseEvent) => {
      if (mouseDown && context) {
        start = {
          x: end.x,
          y: end.y,
        };

        end = getPosition(evt)!;
        context.globalCompositeOperation = "destination-out";
        // Draw our path
        context.beginPath();
        context.arc(end.x, end.y, 30, 0, 2 * Math.PI, false);
        context.fill();
        context.stroke();
        context.closePath();

        if (getFilledInPixels(32)! >= finishPercent) {
          for (let j = 0; j < height; j += 20) {
            for (let i = 0; i < width; i += 20) {
              context.globalCompositeOperation = "destination-out";
              // Draw our path
              context.beginPath();
              context.arc(i, j, 30, 0, 2 * Math.PI, false);
              context.fill();
              context.stroke();
              context.closePath();
            }
          }
          if (canvasRef.current) {
            canvasRef.current.removeEventListener("mousedown", handleMouseDown);
            canvasRef.current.removeEventListener("mouseup", handleMouseUp);
            canvasRef.current.removeEventListener("mousemove", handleMouseMove);
            setContext(null);
          }
        }
        // console.log({ filled: getFilledInPixels(32) });
      }
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

    // Draw a rectangle
    // if (context) context.fillRect(5, 5, 100, 100);

    // Draw a circle
    if (context) {
      const im = new Image();
      im.crossOrigin = "Anonymous";
      im.onload = () => {
        context.drawImage(im, 0, 0);
      };
      im.src = scratchImage;
    }

    return () => {
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mousedown", handleMouseDown);
        canvasRef.current.removeEventListener("mouseup", handleMouseUp);
        canvasRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [context]);

  return (
    <Box
      width={width}
      background={background}
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
          zIndex: 9999,
        }}
        ref={canvasRef}
      />

      {/* Bottom Layer */}
      <Box visibility={CardScratched ? "visible" : "hidden"}>{children}</Box>
    </Box>
    // <div
    //   style={{
    //     textAlign: "center",
    //   }}
    // >
    //   <canvas
    //     id="canvas"
    //     ref={canvasRef}
    //     width={width}
    //     height={width}
    //     style={{
    //       border: "2px solid #000",
    //       marginTop: 10,
    //     }}
    //   ></canvas>
    // </div>
  );
};

export default NewScratchCard;

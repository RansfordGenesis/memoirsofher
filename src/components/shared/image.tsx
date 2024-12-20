import { useState } from "react";
import { cn } from "../../utils";

interface IProps {
  //   skeletonClassname?: string;
}
const CustomImage = (
  props: IProps & React.ImgHTMLAttributes<HTMLImageElement>
) => {
  const [loaded, setLoaded] = useState(false);
  return (
    <div>
      <img
        {...props}
        onLoad={() => setLoaded(true)}
        style={{ display: loaded ? "block" : "none" }}
      />
      {!loaded && (
        <div
          className={cn("bg-gray-200 animate-pulse", props.className as string)}
        ></div>
      )}
    </div>
  );
};

export default CustomImage;

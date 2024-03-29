import { useEffect, useRef, useState } from "react";

export const UseMediaStream = () => {
  const [stream, setstream] = useState<any>(null);
  const isStreamSet = useRef(false);
  useEffect(() => {
    if (isStreamSet.current) return;
    isStreamSet.current = true;
    (async function mediainit() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        console.log("setting your stream");
        setstream(stream);
      } catch (error) {
        console.log("media connection got error:", error);
      }
    })();
  }, []);
  return { stream };
};

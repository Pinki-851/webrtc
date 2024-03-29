import { CheckCircle2Icon, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
export function CopySection({ roomID }: { roomID: any }) {
  const [copy, setCopy] = useState(false);
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (copy) {
      timeoutId = setTimeout(() => {
        setCopy(false);
      }, 2000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [copy]);

  return (
    <div className='flex absolute flex-col text-white border-white rounded p-2 left-[3rem] bottom-[10rem]'>
      <div className='text-base'>Copy Room ID:</div>
      <hr className='my-1' />
      <div className='flex '>
        <span>{roomID}</span>
        <CopyToClipboard
          text={roomID}
          onCopy={() => {
            setCopy((prev) => {
              return !prev;
            });
          }}
        >
          {!copy ? (
            <Copy className='ml-3 cursor-pointer' />
          ) : (
            <CheckCircle2Icon className='ml-3 cursor-pointer' />
          )}
        </CopyToClipboard>
      </div>
    </div>
  );
}

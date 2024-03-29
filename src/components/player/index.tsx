import { Mic, MicOff, UserSquare2 } from "lucide-react";
import ReactPlayer from "react-player";

interface PlayerProps {
  url: string;
  muted: boolean;
  playing: boolean;
  isActive?: boolean;
}
export function Player(props: PlayerProps) {
  const { url, muted, playing, isActive = false } = props;
  return (
    <div
      className={`${
        isActive
          ? "rounded-md h-full "
          : "w-[20rem] h-min rounded-lg shadow-sm "
      } overflow-hidden relative flex justify-center  ${
        playing ? "bg-transparent" : " bg-black "
      }`}
      //   style={{ borderRadius: "10px" }}
    >
      {playing ? (
        <ReactPlayer
          url={url}
          muted={muted}
          playing={playing}
          width='100%'
          height='100%'
        />
      ) : (
        <UserSquare2
          size={isActive ? 400 : 150}
          strokeWidth={isActive ? ".5px" : "1px"}
        />
      )}

      {!isActive ? (
        muted ? (
          <MicOff
            className='icon_player'
            size={20}
          />
        ) : (
          <Mic
            className='icon_player'
            size={20}
          />
        )
      ) : undefined}
    </div>
  );
}

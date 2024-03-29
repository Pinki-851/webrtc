import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react";
interface BottomSectionProps {
  muted: boolean;
  playing: boolean;
  toggleAudio: () => void;
  toggleVideo: () => void;
  leaveRoom: () => void;
}
export function BottomSection(props: BottomSectionProps) {
  const { muted, playing, toggleAudio, toggleVideo, leaveRoom } = props;
  return (
    <div className='flex absolute w-[50vw] justify-center gap-[4rem] bottom-5 left-0 right-0 mx-auto px-20'>
      {muted ? (
        <MicOff
          className='icon active'
          size={55}
          onClick={toggleAudio}
        />
      ) : (
        <Mic
          className='icon '
          size={55}
          onClick={toggleAudio}
        />
      )}
      {playing ? (
        <Video
          className='icon '
          size={55}
          onClick={toggleVideo}
        />
      ) : (
        <VideoOff
          className={`icon active`}
          size={55}
          onClick={toggleVideo}
        />
      )}
      <PhoneOff
        className='icon'
        size={55}
        onClick={leaveRoom}
      />
    </div>
  );
}

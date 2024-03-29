import { BottomSection } from "@/components/bottom";
import { useSocket } from "@/components/context/socket-provider";
import { CopySection } from "@/components/copy-section";
import { Player } from "@/components/player";
import { UseMediaStream } from "@/hooks/useMediaStream";
import { usePeer } from "@/hooks/usePeer";
import { usePlayer } from "@/hooks/usePlayer";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Room() {
  const socket = useSocket();
  const { stream } = UseMediaStream();
  const { peerId, peer } = usePeer();
  const router = useRouter();
  const roomid = router?.query?.id;

  const [user, setUser] = useState<any>({});
  const {
    players,
    setPlayers,
    highlightedPlayer,
    nonHighlightrdPlayer,
    toggleAudio,
    toggleVedio,
    leaveRoom,
  } = usePlayer(peerId, roomid, peer);

  useEffect(() => {
    if (!socket || !peer || !stream) return;
    socket?.on("user-connected", handleUser);
    return () => {
      socket?.off("user-connected", handleUser);
    };
  }, [peer, socket, stream]);

  const handleUser = (newUser: any) => {
    console.log(`new user connected ${newUser}`);
    const call = peer.call(newUser, stream);
    call.on("stream", (incomingcallStream: any) => {
      console.log("incoming stream form ", newUser);
      setPlayers((prev: any) => ({
        ...prev,
        [newUser]: {
          muted: false,
          playing: true,
          url: incomingcallStream,
        },
      }));
    });
    setUser((prev: any) => ({
      ...prev,
      [newUser]: call,
    }));
  };

  useEffect(() => {
    if (!peer || !stream) return;

    peer.on("call", function (call: any) {
      const { peer: callid } = call;
      call.answer(stream);
      call.on("stream", (incomingcallStream: any) => {
        console.log("incoming stream form ", callid);
        setPlayers((prev: any) => ({
          ...prev,
          [callid]: {
            muted: false,
            playing: true,
            url: incomingcallStream,
          },
        }));

        setUser((prev: any) => ({
          ...prev,
          [callid]: call,
        }));
      });
    });
  }, [peer, setPlayers, stream]);

  useEffect(() => {
    if (!peer || !stream || !peerId) return;
    setPlayers((prev: any) => ({
      ...prev,
      [peerId]: {
        muted: false,
        playing: true,
        url: stream,
      },
    }));
  }, [peerId, stream, setPlayers]);

  useEffect(() => {
    const handleAudioToggle = (userId: any) => {
      console.log(`user with ${userId} toggled audio`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        copy[userId].muted = !copy[userId].muted;
        return { ...copy };
      });
    };
    const handleVideoToggle = (userId: any) => {
      console.log(`user with ${userId} toggled audio`);
      setPlayers((prev: any) => {
        const copy = cloneDeep(prev);
        copy[userId].playing = !copy[userId].playing;
        return { ...copy };
      });
    };
    const handleUserLeave = (userId: any) => {
      console.log(`user with ${userId} leaved the call`);
      user[userId]?.close();
      const copyPlayer = cloneDeep(players);
      delete copyPlayer[userId];
      setPlayers(copyPlayer);
    };

    if (!socket) return;
    socket.on("user-toggle-audio", handleAudioToggle);
    socket.on("user-toggle-video", handleVideoToggle);
    socket.on("user-leave", handleUserLeave);
    return () => {
      socket.off("user-toggle-audio", handleAudioToggle);
      socket.off("user-toggle-video", handleVideoToggle);
      socket.off("user-leave", handleUserLeave);
    };
  }, [socket, setPlayers, user]);
  console.log("stream", stream);
  return (
    <main className={``}>
      <div className='absolute top-[2rem] h-full w-[100%] mb-[2rem] px-[2rem]'>
        {highlightedPlayer && (
          <Player
            url={highlightedPlayer.url}
            muted={highlightedPlayer.muted}
            playing={highlightedPlayer.playing}
            isActive={true}
          />
        )}
      </div>
      <div className='absolute top-[3rem] right-[3rem] rounded-md'>
        {Object.keys(nonHighlightrdPlayer).map((id: any) => {
          const { url, muted, playing } = players[id];
          return (
            <Player
              key={id}
              url={url}
              muted={muted}
              playing={playing}
            />
          );
        })}
      </div>
      <CopySection roomID={roomid} />
      <BottomSection
        muted={highlightedPlayer?.muted}
        playing={highlightedPlayer?.playing}
        leaveRoom={leaveRoom}
        toggleAudio={toggleAudio}
        toggleVideo={toggleVedio}
      />
    </main>
  );
}

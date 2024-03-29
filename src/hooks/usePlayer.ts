import { useSocket } from "@/components/context/socket-provider";
import { cloneDeep } from "lodash";
import { useRouter } from "next/router";
import { useState } from "react";

export const usePlayer = (peerId: string, roomID: string | any, peer: any) => {
  const socket = useSocket();
  const [players, setPlayers] = useState<any>({});
  const playersCopy = cloneDeep(players);
  const highlightedPlayer = playersCopy[peerId];
  delete playersCopy[peerId];

  const router = useRouter();

  const nonHighlightrdPlayer = playersCopy;

  const toggleAudio = () => {
    console.log("I toggle audio");
    setPlayers((prev: any) => {
      const copy = cloneDeep(prev);
      copy[peerId].muted = !copy[peerId].muted;
      return { ...copy };
    });
    console.log("after");
    socket.emit("user-toggle-audio", { userId: peerId, roomid: roomID });
    console.log("after emit ", peerId);
  };

  const toggleVedio = () => {
    console.log("I toggle video");
    setPlayers((prev: any) => {
      const copy = cloneDeep(prev);
      copy[peerId].playing = !copy[peerId].playing;
      return { ...copy };
    });
    socket.emit("user-toggle-video", { userId: peerId, roomid: roomID });
  };

  const leaveRoom = () => {
    console.log(`${peerId} has leaved the room`);
    socket.emit("user-leave", { userId: peerId, roomid: roomID });
    peer.disconnect();
    router.push("/");
  };

  return {
    players,
    setPlayers,
    highlightedPlayer,
    nonHighlightrdPlayer,
    toggleAudio,
    toggleVedio,
    leaveRoom,
  };
};

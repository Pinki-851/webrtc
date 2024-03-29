import { useSocket } from "@/components/context/socket-provider";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

export const usePeer = () => {
  const [peer, setPeer] = useState<any>(null);
  const [peerId, setPeerID] = useState("");
  const socket = useSocket();
  const isPeer = useRef(false);

  const router = useRouter();
  const roomid = router?.query?.id;

  useEffect(() => {
    if (isPeer?.current || !socket || !roomid) return;
    isPeer.current = true;

    // importing here because peer is available only on client side
    (async function initPeer() {
      const mypeer = new (await import("peerjs")).default();
      setPeer(mypeer);
      mypeer.on("open", (id) => {
        console.log("my peer id is created", id);
        setPeerID(id);
        socket?.emit("join-room", { userId: id, roomid });
      });
    })();
  }, [socket, roomid]);

  return { peer, peerId };
};

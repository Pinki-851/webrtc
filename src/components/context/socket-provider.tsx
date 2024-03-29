"use client";

import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = React.createContext(null);

export const useSocket = () => {
  const socket: any = useContext(SocketContext);
  return socket;
};

export const SocketProvider = (props: any) => {
  const { children } = props;
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    const socketConnection = io();
    console.log("socket", socketConnection);
    setSocket(socketConnection);
  }, []);

  socket?.on("connect_error", async (err: any) => {
    console.log("error while connection establish", err);
    const res = await fetch("/api/socket");
    console.log("res", res);
  });
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

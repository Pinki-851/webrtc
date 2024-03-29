import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const [roomid, setRoomId] = useState("");

  const createAndJoin = () => {
    const roomid = uuidv4();
    router.push(`/room/${roomid}`);
  };

  const joinRoom = () => {
    if (roomid) {
      router.push(`/room/${roomid}`);
    } else {
      alert("please add roomid");
    }
  };
  return (
    <main
      className={`flex w-full h-screen items-center justify-center  ${inter.className}`}
    >
      <div
        className={`flex min-h-[50vh] flex-col gap-[1rem] items-center py-[1rem] w-1/2  border-[.01px] border-white rounded-[.4rem]`}
      >
        <h2 className='text-white text-[1.4rem] text-center'>
          Google Meet Clone
        </h2>

        <div className='flex gap-[1rem] flex-col items-center'>
          <input
            value={roomid}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            placeholder='Enter room id'
            className='text-primary text-[1.4rem] px-[1rem] rounded-[.4rem] h-[3rem]'
          />
          <button
            className='w-1/2 '
            onClick={joinRoom}
          >
            Join Room
          </button>
        </div>

        <div className='my-[.5rem]'>----------------- OR ---------------</div>

        <button onClick={createAndJoin}>Create a new room</button>
      </div>
    </main>
  );
}

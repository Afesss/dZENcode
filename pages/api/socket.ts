import { Server } from "socket.io";
import type { NextApiRequest, NextApiResponse } from "next";
import { Server as HTTPServer } from "http";
import { Server as IOServer } from "socket.io";
import { Socket as NetSocket } from "net";
import { basePath } from "@/utils/halpers";

type NextApiResponseWithSocket = NextApiResponse & {
    socket: NetSocket & {
        server: HTTPServer & {
            io?: IOServer;
        };
    };
};

let io: Server | null = null;
let onlineUsers = 0;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponseWithSocket
) {
    if (!res.socket.server.io) {
        console.log("🟢 Socket.io server start...");

        io = new Server(res.socket.server, {
            path: `${basePath}/api/socket`,
        });

        io.on("connection", (socket) => {
            onlineUsers++;
            console.log("✅ User connected. Online:", onlineUsers);

            io?.emit("online-users", onlineUsers);

            socket.on("disconnect", () => {
                onlineUsers = Math.max(onlineUsers - 1, 0);
                console.log("❌ User disconnected. Online:", onlineUsers);
                io?.emit("online-users", onlineUsers);
            });
        });

        res.socket.server.io = io;
    }

    res.end();
}

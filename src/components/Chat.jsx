import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const user = useSelector((store) => store.user);
  const connection = useSelector((store) => store.connection);
  const targetUser = connection?.find((user) => user._id === targetUserId);

  const userId = user?._id;

  const socketRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!targetUserId) return;

    const fetchChat = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/chat/${targetUserId}`,
          { withCredentials: true }
        );

        const normalized = res.data.messages.map((msg) => ({
          id: msg._id,
          senderId: msg.senderId._id,
          senderName: `${msg.senderId.firstName} ${msg.senderId.lastName}`,
          message: msg.message,
          createdAt: msg.createdAt,
        }));

        setMessages(normalized);
      } catch (err) {
        console.error("Failed to fetch chat", err);
      }
    };

    fetchChat();
  }, [targetUserId]);

  useEffect(() => {
    if (!userId || !targetUserId) return;

    socketRef.current = createSocketConnection();
    socketRef.current.emit("joinChat", { userId, targetUserId });

    const handleMessage = (msg) => {
      const normalized = {
        id: msg._id || Date.now(),
        senderId: msg.sender,
        senderName:
          msg.sender === userId
            ? "You"
            : `${targetUser.firstName} ${targetUser.lastName}`,
        message: msg.message,
        createdAt: msg.createdAt,
      };

      setMessages((prev) => [...prev, normalized]);
    };

    socketRef.current.on("messageReceived", handleMessage);

    return () => {
      socketRef.current.off("messageReceived", handleMessage);
      socketRef.current.disconnect();
    };
  }, [userId, targetUserId, targetUser]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!text.trim() || !socketRef.current) return;

    socketRef.current.emit("sendMessage", {
      sender: userId,
      receiver: targetUserId,
      message: text,
      createdAt: new Date().toISOString(),
    });

    setText("");
  };

  return (
    <div className="h-screen bg-gray-700 flex items-center justify-center">
      <div className="flex flex-col w-full h-full sm:h-[90vh] sm:max-w-3xl bg-gray-600 sm:rounded-lg shadow-lg">
        {/* Header */}
        <div className="p-4 bg-gray-800 text-white font-semibold sticky top-0">
          Chat with{" "}
          <span className="text-purple-400 uppercase font-bold text-lg">
            {targetUser
              ? `${targetUser.firstName} ${targetUser.lastName}`
              : "Loading..."}
          </span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => {
            const isMe = String(msg.senderId) === String(userId);

            return (
              <div
                key={msg.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-4 py-2 rounded-lg text-sm break-words
          ${
            isMe
              ? "bg-blue-600 text-white rounded-br-none"
              : "bg-white text-black rounded-bl-none"
          }`}
                >
                  <p>{msg.message}</p>

                  <div className="flex justify-between gap-2 mt-1 text-[10px] opacity-70">
                    {!isMe && <span>{msg.senderName}</span>}
                    <span>
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="p-3 bg-gray-800 flex items-center gap-2 sticky bottom-0">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 rounded-full outline-none border"
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-4 py-2 rounded-full"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;

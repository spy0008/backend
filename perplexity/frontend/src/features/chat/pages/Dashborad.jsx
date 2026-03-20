import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useChat } from "../hook/useChat";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

import {
  Plus,
  Settings,
  Paperclip,
  Send,
  Sparkles,
  Clock,
  Share2,
  Menu,
  X,
  Trash2,
  Circle,
  Loader,
  Loader2,
} from "lucide-react";

const Dashborad = () => {
  const chat = useChat();
  const [message, setMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const chats = useSelector((state) => state.chat.chats);
  const currentChatId = useSelector((state) => state.chat.currentChatId);
  const isLoading = useSelector((state) => state.chat.isLoading);

  useEffect(() => {
    // chat.initializeSocketConnection();
    chat.handleGetChats();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    chat.handleSendMessage({ message, chatId: currentChatId });
    setMessage("");
  };

  const openChat = (chatId) => {
    chat.handleOpenChat(chatId);
    setIsSidebarOpen(false);
  };

  return (
    <main className="h-screen w-full flex bg-[#05050a] text-white overflow-hidden">
      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
          fixed md:static z-50 top-0 left-0 h-full
          w-65 flex flex-col justify-between
          border-r border-white/5
          bg-linear-to-b from-[#0a0a12] to-[#05050a]
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div>
          {/* MOBILE HEADER */}
          <div className="p-4 flex justify-between items-center md:hidden">
            <h2 className="text-sm font-semibold">Chats</h2>
            <button onClick={() => setIsSidebarOpen(false)}>
              <X size={18} />
            </button>
          </div>

          {/* LOGO */}
          <div className="p-5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-purple-600 to-purple-400 flex items-center justify-center shadow-lg shadow-purple-600/30">
              <Sparkles size={16} />
            </div>
            <div>
              <h1 className="text-sm font-semibold">Nexora</h1>
            </div>
          </div>

          {/* NEW CHAT */}
          <div className="px-4">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm rounded-xl bg-linear-to-r from-purple-600 to-purple-500 hover:scale-[1.02] transition shadow-lg shadow-purple-600/20">
              <Plus size={16} />
              New Chat
            </button>
          </div>

          {/* CHATS */}
          <div className="mt-6 px-3">
            <p className="text-[10px] text-white/30 mb-2 px-2">RECENT CHATS</p>

            <div className="space-y-1 text-sm">
              {Object.values(chats).map((chat) => {
                const isActive = currentChatId === chat.id;

                return (
                  <div
                    key={chat.id}
                    onClick={() => openChat(chat.id)}
                    className={`
                      group flex items-center justify-between
                      w-full px-3 py-2 rounded-lg cursor-pointer
                      transition
                      ${
                        isActive
                          ? "bg-purple-600/20 text-purple-300"
                          : "hover:bg-white/5 text-white/70 hover:text-white"
                      }
                    `}
                  >
                    {/* TITLE */}
                    <p className="truncate flex-1 pr-2" title={chat.title}>
                      {chat.title.replace(/^"|"$/g, "")}
                    </p>

                    {/* DELETE BUTTON */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        console.log("delete chat:", chat.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition text-white/40 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* PROFILE */}
        <div className="p-4 border-t border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-xs">
              {user?.username?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <p className="text-xs">{user?.username || "Alex Rivera"}</p>
              <p className="text-[10px] text-white/40">Profile</p>
            </div>
          </div>
          <Settings size={16} className="text-white/40 cursor-pointer" />
        </div>
      </aside>

      {/* MAIN */}
      <section className="flex-1 flex flex-col relative">
        {/* HEADER */}
        <div className="h-15 flex items-center justify-between px-6 border-b border-white/5 backdrop-blur-md bg-white/2">
          <div className="flex items-center gap-3">
            {/* MOBILE MENU */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center"
            >
              <Menu size={18} />
            </button>

            <h2 className="text-sm font-medium">Chat</h2>
          </div>

          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <Share2 size={16} />
            </button>
            <button className="w-9 h-9 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center">
              <Clock size={16} />
            </button>
          </div>
        </div>

        {/* CHAT */}
        <div className="messages flex-1 overflow-y-auto px-4 md:px-10 py-6 space-y-6">
          {chats[currentChatId]?.messages?.map((msg, index) => {
            const isUser = msg.role === "user";

            return (
              <div
                key={index}
                className={`flex ${isUser ? "justify-end" : "gap-3"}`}
              >
                {!isUser && (
                  <div className="hidden w-8 h-8 rounded-full bg-purple-600/20 sm:flex items-center justify-center text-xs">
                    ✦
                  </div>
                )}

                <div className="max-w-150">
                  {!isUser && (
                    <p className="text-[11px] text-purple-400 mb-1">Nexora</p>
                  )}

                  <div
                    className={`text-lg md:text-base leading-relaxed px-4 py-3 rounded-2xl ${
                      isUser
                        ? "bg-linear-to-r from-purple-600 to-purple-500"
                        : ""
                    }`}
                  >
                    {isUser ? (
                      msg.content
                    ) : (
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INPUT */}
        <div className="p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-3 bg-white/4 border border-white/10 backdrop-blur-xl rounded-2xl px-4 py-3"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask anything..."
                className="flex-1 bg-transparent outline-none text-sm placeholder:text-white/40"
              />

              <button
                className="cursor-pointer bg-purple-500 px-3 py-1.5 rounded-lg active:scale-95 transition-all duration-200"
                type="submit"
              >
                {isLoading ? <Loader2 className="animate-spin" size={16}/> : <Send size={16} />}
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Dashborad;

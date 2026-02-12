import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Inbox,
  User,
  Trash2,
  CheckCircle,
  Clock,
  Filter
} from "lucide-react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useAuth } from "../../hooks/useAuth";
import Header from "../Header";

const MessagePage: React.FC = () => {
  const navigate = useNavigate();
  const { token, isConvexAuth } = useAuth();

  const [filterStatus, setFilterStatus] = useState<"all" | "unread" | "read">("all");

  const messages = useQuery(api.messages.listMessages, (token || isConvexAuth) ? {
    token: token || undefined
  } : "skip");

  const markAsRead = useMutation(api.messages.markAsRead);

  const handleMarkAsRead = async (messageId: string) => {
    try {
      await markAsRead({
        token: token || undefined,
        messageId: messageId as any
      });
    } catch (err) {
      console.error(err);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredMessages = messages?.filter(m => {
    if (filterStatus === "all") return true;
    return m.status === filterStatus;
  });

  const unreadCount = messages?.filter(m => m.status === "unread").length || 0;

  return (
    <div className="min-h-screen bg-[#0b0b0b] font-sans text-white">
      <Header />

      <main className="pt-24 md:pt-32 pb-20 px-4 md:px-8 max-w-6xl mx-auto">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="mb-10 md:mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-white font-inter">Inbox</h1>
          <p className="text-gray-500 mt-2 font-medium">Manage your incoming site messages.</p>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          {/* Filter Sidebar - Sticky on desktop, horizontal scroll on mobile */}
          <aside className="w-full md:w-48 lg:w-64 md:sticky md:top-32 h-auto flex flex-col gap-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center gap-2">
                <Filter size={12} />
                Filter Status
              </label>
              <div className="flex md:flex-col overflow-x-auto md:overflow-visible pb-2 md:pb-0 gap-2 no-scrollbar">
                {(["all", "unread", "read"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFilterStatus(s)}
                    className={`whitespace-nowrap px-4 py-2.5 rounded-lg text-xs font-bold capitalize flex items-center justify-between gap-4 transition-all border ${filterStatus === s
                      ? "bg-white text-black border-white shadow-xl shadow-white/5"
                      : "text-gray-500 hover:bg-white/[0.04] border-transparent hover:text-white"
                      }`}
                  >
                    <span className="capitalize">{s}</span>
                    {s === "unread" && unreadCount > 0 && (
                      <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${filterStatus === s ? "bg-black text-white" : "bg-white/[0.08] text-gray-400"}`}>
                        {unreadCount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="hidden md:block p-6 bg-[#161616] rounded-xl border border-white/[0.08]">
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">Tip</p>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Message status updates automatically when you click to read.
              </p>
            </div>
          </aside>

          {/* Message List Area */}
          <section className="flex-1 w-full space-y-4">
            {!messages ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-32 bg-white/[0.02] rounded-xl border border-white/[0.04] animate-pulse" />
                ))}
              </div>
            ) : filteredMessages?.length === 0 ? (
              <div className="h-64 border border-dashed border-white/[0.08] rounded-xl flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
                <div className="w-12 h-12 bg-white/[0.02] border border-white/[0.04] rounded-full flex items-center justify-center">
                  <Inbox size={24} />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-white">No messages found</p>
                  <p className="text-sm px-4">Visitors will appear here once they contact you from your connected site.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {filteredMessages?.map((message: any) => (
                  <div
                    key={message._id}
                    onClick={() => message.status === "unread" && handleMarkAsRead(message._id)}
                    className={`group relative p-6 md:p-8 rounded-xl border transition-all cursor-default ${message.status === "unread"
                      ? "border-white bg-[#1a1a1a] shadow-2xl shadow-white/5"
                      : "border-white/[0.08] hover:border-white/[0.2] bg-[#161616]/40"
                      }`}
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/[0.08] ${message.status === "unread" ? "bg-white text-black" : "bg-white/[0.04]"}`}>
                          <User size={18} />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-black text-sm tracking-tight truncate max-w-[200px] sm:max-w-none">
                            {message.senderEmail}
                          </h3>
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider mt-0.5">
                            <span className="flex items-center gap-1">
                              <Clock size={10} />
                              {formatDate(message.timestamp)}
                            </span>
                            {message.status === "unread" && (
                              <span className="flex items-center gap-1 text-indigo-400">
                                <div className="w-1 h-1 rounded-full bg-indigo-400 animate-pulse" />
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-start">
                        {message.status === "read" && (
                          <div className="text-green-500" title="Read">
                            <CheckCircle size={16} />
                          </div>
                        )}
                        <button
                          className="p-2 text-gray-700 hover:text-red-500 transition-colors opacity-100 md:opacity-0 group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Delete functionality can be added later
                          }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="pl-0 sm:pl-14">
                      <p className={`text-sm leading-relaxed whitespace-pre-wrap ${message.status === "unread" ? "text-white font-medium" : "text-gray-500"
                        }`}>
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

export default MessagePage;

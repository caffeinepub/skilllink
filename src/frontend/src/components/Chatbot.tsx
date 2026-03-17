import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bot, Send, User, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
  showChips?: boolean;
}

const QUICK_REPLIES = [
  "How to find skills?",
  "How to book a session?",
  "How to message a user?",
  "How to add my skills?",
  "How does SkillLink work?",
];

function getBotResponse(input: string): { text: string; showChips?: boolean } {
  const q = input.toLowerCase();

  if (/\b(hi|hey|hello|howdy)\b/.test(q)) {
    return {
      text: "Hey there! 👋 Welcome to SkillLink! I'm your assistant. How can I help you today?",
      showChips: true,
    };
  }
  if (/thank/.test(q)) {
    return {
      text: "You're welcome! 😊 Feel free to ask anything else anytime.",
      showChips: true,
    };
  }
  if (/find skill|browse|search/.test(q)) {
    return {
      text: "To find skills, head to the **Search** or **Skills Browse** page from the navigation. You can filter by category, location, and skill level. Use keywords to narrow results and click any skill card to view the tutor's profile!",
    };
  }
  if (/book|session|schedule|appointment/.test(q)) {
    return {
      text: "To book a session, visit a user's profile and click the **Book Session** button. Fill in your preferred date/time and a short message. The tutor will accept or decline from their **Bookings** page. You can track your bookings there too!",
    };
  }
  if (/message|chat|talk/.test(q)) {
    return {
      text: "To message someone, go to their profile and click **Message**. You'll be taken to the **Chat** page where you can have a real-time conversation. If you're not logged in, you'll be redirected after login.",
    };
  }
  if (/add skill|my skill|teach|offer/.test(q)) {
    return {
      text: "To add your skills, go to your **Profile** page and click **Edit Profile** or **Add Skill**. Fill in the skill name, category, description, and your experience level. Once added, others can find you in search results!",
    };
  }
  if (/login|sign up|register|account/.test(q)) {
    return {
      text: "For demo purposes, you can log in with **any email and password** on the Login page — no real account needed! Just click **Login / Sign Up** in the navbar and enter any credentials.",
    };
  }
  if (/profile|edit profile|update/.test(q)) {
    return {
      text: "Your **Profile** page shows your skills, reviews, and bio. Click **Edit Profile** to update your name, location, bio, and avatar. You can also add new skills or remove existing ones from there.",
    };
  }
  if (/review|rating|feedback/.test(q)) {
    return {
      text: "After a session, you can leave a **review and star rating** on the tutor's profile page. Scroll to the Reviews section and click **Leave a Review**. This helps build trust in the community!",
    };
  }
  if (/free|cost|price|pay/.test(q)) {
    return {
      text: "SkillLink is completely **free**! 🎉 There are no payments, subscriptions, or hidden fees. It's a community-driven platform where people share skills with each other for free.",
    };
  }
  if (/dashboard/.test(q)) {
    return {
      text: "Your **Dashboard** is your home base after logging in. It shows your recent activity, upcoming bookings, quick links to browse skills, and a summary of your profile stats.",
    };
  }
  if (/how does|what is skilllink|about skilllink/.test(q)) {
    return {
      text: "SkillLink is a **free, community-driven platform** for local skill sharing. Connect with people nearby to learn cooking, coding, music, languages, and more — all for free! It's peer-to-peer learning at its best. 🌟",
    };
  }

  return {
    text: "I'm not sure about that, but feel free to browse the platform or ask me something else! Here are some things I can help with:",
    showChips: true,
  };
}

const INITIAL_MESSAGES: Message[] = [
  {
    id: "0",
    role: "bot",
    text: "Hi! I'm the SkillLink Assistant. 🤖 Ask me anything about the platform — how to find skills, book sessions, message users, and more!",
    showChips: true,
  },
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setPulse(false);
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        inputRef.current?.focus();
      }, 100);
    }
  }, [open]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll on message changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  // focus input after bot replies
  useEffect(() => {
    if (!typing && open) {
      inputRef.current?.focus();
    }
  }, [typing, open]);

  // cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, []);

  const sendMessage = useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      text: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);

    typingTimerRef.current = setTimeout(
      () => {
        const response = getBotResponse(trimmed);
        const botMsg: Message = {
          id: `bot-${Date.now()}`,
          role: "bot",
          text: response.text,
          showChips: response.showChips,
        };
        setMessages((prev) => [...prev, botMsg]);
        setTyping(false);
        typingTimerRef.current = null;
      },
      600 + Math.random() * 400,
    );
  }, []);

  const handleSend = () => sendMessage(input);
  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div
        className="fixed bottom-6 right-6 z-50"
        data-ocid="chatbot.open_modal_button"
      >
        <AnimatePresence>
          {!open && pulse && (
            <motion.div
              key="pulse"
              className="absolute inset-0 rounded-full bg-primary opacity-40"
              animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0, 0.4] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          )}
        </AnimatePresence>
        <motion.button
          onClick={() => setOpen((v) => !v)}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open SkillLink Assistant"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="w-6 h-6" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Bot className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-ocid="chatbot.dialog"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-24 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[360px] rounded-2xl shadow-2xl border border-border bg-card overflow-hidden"
            style={{
              height: "520px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div className="flex-shrink-0 flex items-center gap-3 px-4 py-3 bg-primary text-primary-foreground">
              <div className="w-8 h-8 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-sm">SkillLink Assistant</div>
                <div className="text-xs opacity-75">Always here to help</div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-1 rounded-full hover:bg-primary-foreground/20 transition-colors"
                aria-label="Close assistant"
                data-ocid="chatbot.close_button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages scrollable area */}
            <div className="flex-1 overflow-y-auto px-3 py-3 min-h-0">
              <div className="flex flex-col gap-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2 ${
                      msg.role === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                        msg.role === "bot"
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      {msg.role === "bot" ? (
                        <Bot className="w-4 h-4" />
                      ) : (
                        <User className="w-4 h-4" />
                      )}
                    </div>
                    <div className="flex flex-col gap-1.5 max-w-[80%]">
                      <div
                        className={`px-3 py-2 rounded-2xl text-sm leading-relaxed ${
                          msg.role === "bot"
                            ? "bg-muted text-foreground rounded-tl-sm"
                            : "bg-primary text-primary-foreground rounded-tr-sm"
                        }`}
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: safe static content
                        dangerouslySetInnerHTML={{
                          __html: msg.text.replace(
                            /\*\*(.*?)\*\*/g,
                            "<strong>$1</strong>",
                          ),
                        }}
                      />
                      {msg.showChips && (
                        <div className="flex flex-wrap gap-1.5 mt-1">
                          {QUICK_REPLIES.map((chip) => (
                            <button
                              key={chip}
                              type="button"
                              onClick={() => sendMessage(chip)}
                              className="px-2.5 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                              data-ocid="chatbot.button"
                            >
                              {chip}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {typing && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div
                      className="px-3 py-2.5 rounded-2xl rounded-tl-sm bg-muted flex items-center gap-1"
                      data-ocid="chatbot.loading_state"
                    >
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 block"
                          animate={{ y: [0, -4, 0] }}
                          transition={{
                            duration: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </div>

            {/* Input - always visible at bottom */}
            <div className="flex-shrink-0 px-3 py-3 border-t border-border bg-card">
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder="Type your question..."
                  className="flex-1 text-sm"
                  data-ocid="chatbot.input"
                  autoComplete="off"
                />
                <Button
                  size="icon"
                  onClick={handleSend}
                  disabled={!input.trim() || typing}
                  className="shrink-0"
                  data-ocid="chatbot.submit_button"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-1.5 text-center">
                Press Enter to send
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

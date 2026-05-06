import { useState, useRef, useEffect } from 'react';
import { X, Send, MessageCircle, Loader2 } from 'lucide-react';
import type { Theme } from './data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
  theme: Theme;
  mode: 'fish' | 'hunt';
}

export default function ChatDrawer({ open, onClose, theme, mode }: ChatDrawerProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sans = "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif";
  const serif = "'Playfair Display', Georgia, serif";

  useEffect(() => {
    if (open && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || streaming) return;

    const userMessage: Message = { role: 'user', content: input.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setStreaming(true);
    setError(null);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response stream');

      const decoder = new TextDecoder();
      let assistantContent = '';
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6);
          if (data === '[DONE]') continue;

          try {
            const parsed = JSON.parse(data);
            const delta = parsed.choices?.[0]?.delta?.content;
            if (delta) {
              assistantContent += delta;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: assistantContent };
                return updated;
              });
            }
          } catch {
            // skip malformed chunks
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setMessages(prev => {
        if (prev[prev.length - 1]?.role === 'assistant' && !prev[prev.length - 1]?.content) {
          return prev.slice(0, -1);
        }
        return prev;
      });
    } finally {
      setStreaming(false);
    }
  };

  const welcome = mode === 'fish'
    ? "I can help you find the perfect fishing guide. Tell me where you want to go, when, and what you're hoping to catch."
    : "I can help you find the perfect hunting guide. Tell me what you want to hunt, where, and your experience level.";

  return (
    <>
      {open && (
        <div
          onClick={onClose}
          style={{
            position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 299, transition: 'opacity 0.3s ease',
            backdropFilter: 'blur(2px)',
          }}
        />
      )}

      <div style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, width: 420, maxWidth: '100vw',
        backgroundColor: '#fff', zIndex: 300, boxShadow: '-8px 0 32px rgba(0,0,0,0.15)',
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.3s ease',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          padding: '16px 20px', borderBottom: '1px solid #e5e7eb',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: theme.hero, color: '#fff',
        }}>
          <div>
            <h3 style={{ fontFamily: serif, fontSize: 18, fontWeight: 700, margin: 0 }}>
              Plan Your Trip
            </h3>
            <p style={{ fontSize: 12, opacity: 0.8, margin: '2px 0 0', fontFamily: sans }}>
              AI-powered guide matching
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 34, height: 34, borderRadius: '50%',
              backgroundColor: 'rgba(255,255,255,0.2)', border: 'none',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={16} color="#fff" />
          </button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px 16px 8px',
          display: 'flex', flexDirection: 'column', gap: 12,
        }}>
          {/* Welcome message */}
          <div style={{
            backgroundColor: '#f9fafb', borderRadius: '4px 14px 14px 14px',
            padding: '12px 16px', maxWidth: '88%', alignSelf: 'flex-start',
          }}>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.6, margin: 0, fontFamily: sans }}>
              {welcome}
            </p>
          </div>

          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%',
              }}
            >
              <div style={{
                backgroundColor: msg.role === 'user' ? theme.accent : '#f9fafb',
                color: msg.role === 'user' ? '#fff' : '#374151',
                borderRadius: msg.role === 'user'
                  ? '14px 14px 4px 14px'
                  : '4px 14px 14px 14px',
                padding: '10px 14px',
              }}>
                <p style={{
                  fontSize: 13, lineHeight: 1.6, margin: 0, fontFamily: sans,
                  whiteSpace: 'pre-wrap', wordBreak: 'break-word',
                }}>
                  {msg.content}
                  {streaming && i === messages.length - 1 && msg.role === 'assistant' && (
                    <span style={{
                      display: 'inline-block', width: 6, height: 14,
                      backgroundColor: theme.accent, marginLeft: 2,
                      animation: 'blink 1s infinite',
                      verticalAlign: 'text-bottom',
                    }} />
                  )}
                </p>
              </div>
            </div>
          ))}

          {streaming && messages[messages.length - 1]?.role !== 'assistant' && (
            <div style={{
              alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8,
              backgroundColor: '#f9fafb', borderRadius: '4px 14px 14px 14px',
              padding: '10px 14px',
            }}>
              <Loader2 size={14} color={theme.accent} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: 13, color: '#9ca3af', fontFamily: sans }}>Thinking...</span>
            </div>
          )}

          {error && (
            <div style={{
              alignSelf: 'flex-start', backgroundColor: '#fef2f2',
              borderRadius: '4px 14px 14px 14px', padding: '10px 14px', maxWidth: '88%',
            }}>
              <p style={{ fontSize: 12, color: '#991b1b', margin: 0, fontFamily: sans }}>
                {error.includes('API key') || error.includes('500')
                  ? 'The AI concierge is not available right now. Set OPENROUTER_API_KEY in your Vercel environment to enable it.'
                  : `Connection error: ${error}`}
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '12px 16px 16px', borderTop: '1px solid #e5e7eb',
          backgroundColor: '#fff',
        }}>
          <div style={{
            display: 'flex', gap: 8, alignItems: 'center',
            backgroundColor: '#f7f7f5', borderRadius: 14, padding: '4px 4px 4px 16px',
            border: '1px solid #e5e7eb',
          }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder={mode === 'fish'
                ? "I want to go fishing in Florida..."
                : "I want to hunt elk in Colorado..."}
              disabled={streaming}
              style={{
                flex: 1, border: 'none', outline: 'none',
                backgroundColor: 'transparent', fontSize: 14,
                fontFamily: sans, color: '#1a1a17',
              }}
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || streaming}
              style={{
                width: 38, height: 38, borderRadius: 12, border: 'none',
                backgroundColor: input.trim() && !streaming ? theme.accent : '#d1d5db',
                cursor: input.trim() && !streaming ? 'pointer' : 'default',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'background-color 0.2s ease',
              }}
            >
              <Send size={16} color="#fff" />
            </button>
          </div>
          <p style={{
            fontSize: 10, color: '#9ca3af', textAlign: 'center',
            margin: '8px 0 0', fontFamily: sans,
          }}>
            Powered by AI. Recommendations based on guide profiles.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </>
  );
}

export function ChatTrigger({ onClick, theme }: { onClick: () => void; theme: Theme }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 250,
        width: 56, height: 56, borderRadius: 16, border: 'none',
        background: theme.hero, color: '#fff', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'scale(1.08)';
        e.currentTarget.style.boxShadow = '0 6px 28px rgba(0,0,0,0.3)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.25)';
      }}
    >
      <MessageCircle size={24} />
    </button>
  );
}

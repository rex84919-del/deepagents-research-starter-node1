import { useLanguage } from "../hooks/useLanguage";

interface StoredConversation {
  id: string;
  title: string;
  timestamp: number;
}

interface WelcomeScreenProps {
  onSelect: (question: string) => void;
  onLoadConversation?: (id: string) => void;
  storedConversations?: StoredConversation[];
  onRemoveConversation?: (id: string) => void;
}

const cardIcons = [
  // DNA helix icon
  <svg key="dna" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 2c0 4 5 6 5 10s-5 6-5 10M17 2c0 4-5 6-5 10s5 6 5 10M3 7h6M15 7h6M3 17h6M15 17h6" />
  </svg>,
  // Protein structure (molecule) icon
  <svg key="protein" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="6" cy="6" r="2.5" />
    <circle cx="18" cy="8" r="2.5" />
    <circle cx="10" cy="18" r="2.5" />
    <circle cx="20" cy="18" r="2" />
    <path strokeLinecap="round" d="M6 6L18 8M18 8L10 18M10 18L20 18M6 6L10 18" />
  </svg>,
  // Microscope icon
  <svg key="microscope" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v6m0 0a3 3 0 106 0M9 9a3 3 0 01-3 3m3-3L5 15m0 0H4a1 1 0 00-1 1v2h18v-2a1 1 0 00-1-1h-1m-4-4l2 6m0 0H7" />
  </svg>,
  // Molecular bond icon
  <svg key="bond" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <circle cx="12" cy="12" r="3" />
    <circle cx="4" cy="12" r="2" />
    <circle cx="20" cy="12" r="2" />
    <circle cx="12" cy="4" r="2" />
    <circle cx="12" cy="20" r="2" />
    <path strokeLinecap="round" d="M4 12h5M15 12h5M12 4v5M12 15v5" />
  </svg>,
];

// Format relative time for conversation timestamps
function formatRelativeTime(timestamp: number, locale: string): string {
  const now = Date.now();
  const diff = now - timestamp;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (locale === "zh") {
    if (minutes < 1) return "刚刚";
    if (minutes < 60) return `${minutes} 分钟前`;
    if (hours < 24) return `${hours} 小时前`;
    if (days < 7) return `${days} 天前`;
    return new Date(timestamp).toLocaleDateString("zh-CN");
  }

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(timestamp).toLocaleDateString("en-US");
}

export function WelcomeScreen({ onSelect, onLoadConversation, storedConversations, onRemoveConversation }: WelcomeScreenProps) {
  const { t, locale } = useLanguage();

  return (
    <div className="flex flex-1 flex-col items-center overflow-y-auto px-6 pt-[12vh] pb-8">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50">
        <svg
          className="h-7 w-7 text-teal-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z"
          />
        </svg>
      </div>

      <h2 className="mb-1.5 text-xl font-semibold tracking-tight text-slate-800">
        {t.welcomeTitle}
      </h2>
      <p className="mb-8 max-w-md text-center text-sm leading-relaxed text-slate-500">
        {t.welcomeSubtitle}
      </p>

      <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-2">
        {t.presetQuestions.map((q, i) => (
          <button
            key={i}
            onClick={() => onSelect(q)}
            className="group cursor-pointer rounded-xl border border-[#e5e5e3] bg-white p-5 text-left transition-all duration-200 hover:border-teal-200 hover:shadow-[0_2px_8px_rgba(13,148,136,0.10)]"
            style={{ animation: `slideUp 0.3s ease ${i * 0.06}s both` }}
          >
            <span className="mb-2 block text-teal-400 transition-colors duration-200 group-hover:text-teal-600">
              {cardIcons[i % 4]}
            </span>
            <span className="text-[13px] leading-relaxed text-slate-600 transition-colors duration-200 group-hover:text-slate-800">
              {q}
            </span>
          </button>
        ))}
      </div>

      {/* Recent conversations */}
      {storedConversations && storedConversations.length > 0 && onLoadConversation && (
        <div className="mt-8 w-full max-w-2xl" style={{ animation: "fadeIn 0.3s ease 0.2s both" }}>
          <h3 className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-slate-400">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {t.recentConversations}
          </h3>
          <div className="space-y-2">
            {storedConversations.map((conv) => (
              <div
                key={conv.id}
                className="group flex items-center gap-3 rounded-lg border border-slate-100 bg-white px-4 py-3 transition-all duration-200 hover:border-teal-200 hover:shadow-[0_1px_4px_rgba(13,148,136,0.08)]"
              >
                <button
                  onClick={() => onLoadConversation(conv.id)}
                  className="flex-1 cursor-pointer text-left"
                >
                  <span className="block text-[13px] leading-relaxed text-slate-700 group-hover:text-slate-900">
                    {conv.title}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {formatRelativeTime(conv.timestamp, locale)}
                  </span>
                </button>
                {onRemoveConversation && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveConversation(conv.id);
                    }}
                    className="cursor-pointer rounded p-1 text-slate-300 opacity-0 transition-all duration-200 hover:bg-slate-100 hover:text-slate-500 group-hover:opacity-100"
                    title={t.deleteConversation}
                  >
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

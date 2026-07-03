import type { Translations } from "./types";

export const en: Translations = {
  appTitle: "Drug Target Discovery",
  appSubtitle: "AI-Powered Drug Target Research Agent",

  welcomeTitle: "Identify novel drug targets",
  welcomeSubtitle:
    "Research protein structures, de novo design approaches, and therapeutic opportunities for diseases lacking medication.",
  presetQuestions: [
    "What are potential drug targets for hantavirus?",
    "Find protein structures in PDB for emerging pathogens",
    "How does Baker Lab's RFdiffusion approach de novo protein design?",
    "Identify therapeutic targets for orphan diseases with no current medication",
  ],

  inputPlaceholder: "Enter your research question…",
  sendButton: "Send",
  stopButton: "Stop",
  newChatButton: "Home",

  phaseIdle: "Ready",
  phasePlanning: "Analyzing targets",
  phaseResearching: "Researching targets",
  phaseSynthesizing: "Synthesizing findings",
  phaseComplete: "Target Discovery Complete",

  specialistAgents: "Target Researchers",
  completed: "completed",
  taskPending: "Preparing target research…",
  taskSummarizing: "Target research done, writing summary…",
  taskCancelled: "Cancelled",
  noContentYet: "Waiting for target research results…",
  synthesizingResults: "Synthesizing target discovery findings…",
  researchStopped: "Target discovery stopped",

  you: "You",
  coordinator: "Target Discovery Lead",

  recentConversations: "Recent Conversations",
  loadingHistory: "Loading conversation...",
  deleteConversation: "Delete",

  loadHistoryEmpty: "This conversation has no history",
  loadHistoryFailed: "Failed to load conversation history",
};

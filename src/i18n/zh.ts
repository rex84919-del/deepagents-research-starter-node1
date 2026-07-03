import type { Translations } from "./types";

export const zh: Translations = {
  appTitle: "药物靶点发现",
  appSubtitle: "AI驱动的药物靶点研究代理",

  welcomeTitle: "发现新型药物靶点",
  welcomeSubtitle: "研究蛋白质结构、从头设计方法和缺乏药物治疗疾病的治疗机会。",
  presetQuestions: [
    "汉坦病毒有哪些潜在药物靶点？",
    "在PDB中查找新发病原体的蛋白质结构",
    "Baker Lab的RFdiffusion如何实现蛋白质从头设计？",
    "识别当前无药物的孤儿病治疗靶点",
  ],

  inputPlaceholder: "输入你想研究的问题…",
  sendButton: "发送",
  stopButton: "停止",
  newChatButton: "返回首页",

  phaseIdle: "就绪",
  phasePlanning: "分析靶点中",
  phaseResearching: "研究靶点中",
  phaseSynthesizing: "汇总发现中",
  phaseComplete: "靶点发现完成",

  specialistAgents: "靶点研究员",
  completed: "已完成",
  taskPending: "正在准备靶点研究…",
  taskSummarizing: "靶点研究完成，正在整理结论…",
  taskCancelled: "已取消",
  noContentYet: "等待靶点研究结果…",
  synthesizingResults: "正在汇总靶点发现结论…",
  researchStopped: "靶点发现已停止",

  you: "你",
  coordinator: "靶点发现主管",

  recentConversations: "近期会话",
  loadingHistory: "加载会话中...",
  deleteConversation: "删除",

  loadHistoryEmpty: "该对话暂无历史记录",
  loadHistoryFailed: "加载对话历史失败",
};

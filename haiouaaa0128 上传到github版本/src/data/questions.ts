export interface Option {
  id: string;
  text: string;
  // Scores for different traits: E (Extroversion/Connectivity), S (Stability/Durability), 
  // P (Productivity/Performance), M (Maintenance Needs)
  scores: {
    E?: number;
    S?: number;
    P?: number;
    M?: number;
  };
}

export interface Question {
  id: number;
  text: string;
  options: Option[];
}

export const questions: Question[] = [
  // Section 1: Startup & Energy (启动与能源)
  {
    id: 1,
    text: "早晨启动时的通常状态是？",
    options: [
      { id: "A", text: "快速启动，立即进入高性能模式", scores: { P: 2, E: 1 } },
      { id: "B", text: "缓慢预热，需要咖啡因辅助", scores: { M: 2, P: -1 } },
      { id: "C", text: "多次重启失败，直到中午才正常运行", scores: { P: -2, M: 3 } },
      { id: "D", text: "低功耗待机，只响应必要指令", scores: { S: 2, E: -1 } },
    ],
  },
  {
    id: 2,
    text: "在低电量（疲惫）模式下，您的表现是？",
    options: [
      { id: "A", text: "自动开启省电模式，拒绝一切社交", scores: { E: -2, M: 1 } },
      { id: "B", text: "运行不稳定，容易出现情绪报错", scores: { S: -2 } },
      { id: "C", text: "强行超频运行，直到彻底死机", scores: { S: -1, P: 1 } },
      { id: "D", text: "切换至后台静默运行，表面维持正常", scores: { S: 1, E: -1 } },
    ],
  },
  {
    id: 3,
    text: "最佳充电方式是？",
    options: [
      { id: "A", text: "连接外部网络（社交聚会）", scores: { E: 3 } },
      { id: "B", text: "断开所有连接，进入休眠模式（独处）", scores: { E: -3, M: 1 } },
      { id: "C", text: "摄入高热量能源（美食）", scores: { M: 2 } },
      { id: "D", text: "运行娱乐程序（游戏/追剧）", scores: { P: -1, M: 1 } },
    ],
  },
  
  // Section 2: Connectivity & Social (连接与社交)
  {
    id: 4,
    text: "面对陌生设备的接入请求（陌生人搭讪），您的反应是？",
    options: [
      { id: "A", text: "开放端口，热情握手", scores: { E: 3 } },
      { id: "B", text: "开启防火墙，谨慎验证", scores: { E: -1, S: 1 } },
      { id: "C", text: "直接拒绝连接", scores: { E: -3 } },
      { id: "D", text: "仅允许读取权限，禁止写入", scores: { E: 0, S: 2 } },
    ],
  },
  {
    id: 5,
    text: "在多人在线网络（聚会）中，您的带宽占用情况？",
    options: [
      { id: "A", text: "作为服务器，主导数据传输", scores: { E: 3, P: 1 } },
      { id: "B", text: "作为客户端，默默接收数据", scores: { E: -2 } },
      { id: "C", text: "连接不稳定，时断时续（频繁看手机）", scores: { E: -1, S: -1 } },
      { id: "D", text: "建立点对点连接（只跟熟人聊）", scores: { E: 1, S: 1 } },
    ],
  },
  {
    id: 6,
    text: "收到过量的消息推送时？",
    options: [
      { id: "A", text: "实时处理每一条指令", scores: { S: 1, P: 1 } },
      { id: "B", text: "批量延迟处理", scores: { P: -1, M: 1 } },
      { id: "C", text: "清空缓存，假装没看见", scores: { S: -1, P: -2 } },
      { id: "D", text: "设置优先级，只处理紧急消息", scores: { P: 1, S: 1 } },
    ],
  },

  // Section 3: Processing & Performance (处理与性能)
  {
    id: 7,
    text: "面对多线程任务（多项工作同时进行）时？",
    options: [
      { id: "A", text: "多核并行处理，流畅运行", scores: { P: 3 } },
      { id: "B", text: "单线程排队，逐个击破", scores: { S: 2, P: -1 } },
      { id: "C", text: "CPU 过热，系统卡顿", scores: { S: -2, P: -2 } },
      { id: "D", text: "外包进程，寻找协处理器（找人帮忙）", scores: { E: 2, P: 1 } },
    ],
  },
  {
    id: 8,
    text: "遇到未定义的错误（突发困难）时？",
    options: [
      { id: "A", text: "自动运行故障排除程序（冷静分析）", scores: { S: 3 } },
      { id: "B", text: "请求技术支持（求助他人）", scores: { E: 1, M: 1 } },
      { id: "C", text: "系统崩溃，等待重启", scores: { S: -3 } },
      { id: "D", text: "尝试暴力破解（硬着头皮试）", scores: { P: 1, S: -1 } },
    ],
  },
  {
    id: 9,
    text: "关于截止日期（Deadline）的协议？",
    options: [
      { id: "A", text: "提前交付，预留冗余时间", scores: { P: 2, S: 2 } },
      { id: "B", text: "压线交付，精准控制", scores: { P: 1, S: -1 } },
      { id: "C", text: "经常超时，需申请延期", scores: { P: -3 } },
      { id: "D", text: "直至最后一刻才开始全速运行", scores: { P: -1, M: -1 } },
    ],
  },

  // Section 4: Storage & Memory (存储与记忆)
  {
    id: 10,
    text: "对于过去的错误日志（尴尬回忆）？",
    options: [
      { id: "A", text: "定期清理，不占用内存", scores: { S: 2 } },
      { id: "B", text: "后台频繁读取，影响当前运行", scores: { S: -2 } },
      { id: "C", text: "归档存储，仅作为参考数据", scores: { S: 1, P: 1 } },
      { id: "D", text: "篡改日志，美化记忆", scores: { E: 1, S: -1 } },
    ],
  },
  {
    id: 11,
    text: "学习新技能（安装新软件）的速度？",
    options: [
      { id: "A", text: "即插即用，快速上手", scores: { P: 3 } },
      { id: "B", text: "需详细阅读说明书，缓慢安装", scores: { S: 2, P: -1 } },
      { id: "C", text: "兼容性差，安装经常失败", scores: { P: -2 } },
      { id: "D", text: "只安装核心功能，忽略高级选项", scores: { P: 1, M: 1 } },
    ],
  },
  {
    id: 12,
    text: "待办事项列表（Task List）的状态通常是？",
    options: [
      { id: "A", text: "清空状态，执行力极强", scores: { P: 3 } },
      { id: "B", text: "堆积如山，由于内存泄漏而遗忘", scores: { P: -2 } },
      { id: "C", text: "有列表，但总是执行列表以外的进程", scores: { P: -1, E: 1 } },
      { id: "D", text: "动态调整，灵活删减任务", scores: { S: 1, M: 1 } },
    ],
  },

  // Section 5: Stability & Environment (稳定性与环境)
  {
    id: 13,
    text: "对运行环境（居住/办公环境）的要求？",
    options: [
      { id: "A", text: "高度洁净，恒温恒湿", scores: { M: 3, S: 1 } },
      { id: "B", text: "只要有电源和网络即可", scores: { M: -2 } },
      { id: "C", text: "混乱中有序，拒绝整理", scores: { S: -1, M: -1 } },
      { id: "D", text: "必须有美学装饰，否则无法运行", scores: { M: 2, E: 1 } },
    ],
  },
  {
    id: 14,
    text: "遇到系统冲突（人际矛盾）时？",
    options: [
      { id: "A", text: "正面防御，输出攻击指令", scores: { E: 2, S: -1 } },
      { id: "B", text: "后台静默，冷处理", scores: { S: 1, E: -2 } },
      { id: "C", text: "立即断开连接，避免损坏", scores: { S: -1, E: -3 } },
      { id: "D", text: "尝试协议兼容，寻找共同点", scores: { E: 1, S: 2 } },
    ],
  },
  {
    id: 15,
    text: "在周末或假期模式下？",
    options: [
      { id: "A", text: "运行高耗能娱乐程序", scores: { E: 2, M: 1 } },
      { id: "B", text: "低功耗待机，进行碎片整理", scores: { E: -2, S: 2 } },
      { id: "C", text: "继续后台运行工作进程", scores: { P: 3, M: -2 } },
      { id: "D", text: "随机执行指令，无固定模式", scores: { E: 1, P: -1 } },
    ],
  },

  // Section 6: Advanced Settings (高级设置)
  {
    id: 16,
    text: "对于系统更新（改变现状）的态度？",
    options: [
      { id: "A", text: "自动更新，拥抱变化", scores: { P: 2, E: 1 } },
      { id: "B", text: "长期推迟，直到强制更新", scores: { S: 1, P: -1 } },
      { id: "C", text: "版本回退，怀念旧版本", scores: { S: -1, P: -1 } },
      { id: "D", text: "只更新安全补丁，核心功能不变", scores: { S: 2, M: 1 } },
    ],
  },
  {
    id: 17,
    text: "核心驱动力（价值观）来源于？",
    options: [
      { id: "A", text: "外部评价与反馈", scores: { E: 3 } },
      { id: "B", text: "内部算法与逻辑", scores: { S: 2, E: -2 } },
      { id: "C", text: "随机数生成器（心情）", scores: { S: -2, M: 2 } },
      { id: "D", text: "任务完成的奖励机制", scores: { P: 2, M: 1 } },
    ],
  },
  {
    id: 18,
    text: "本设备的预期使用寿命取决于？",
    options: [
      { id: "A", text: "硬件损耗（身体健康）", scores: { M: 3 } },
      { id: "B", text: "软件迭代（精神状态）", scores: { S: 3 } },
      { id: "C", text: "是否遇到兼容的另一台设备", scores: { E: 3 } },
      { id: "D", text: "能源供应（财务状况）", scores: { P: 2, S: 1 } },
    ],
  },
];

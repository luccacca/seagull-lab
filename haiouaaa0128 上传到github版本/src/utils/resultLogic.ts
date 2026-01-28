import type { Option } from '../data/questions';

export interface ResultData {
  modelName: string;
  description: string;
  correctUsage: string[];
  incorrectUsage: string[];
  warnings: string[];
  specs: {
    label: string;
    value: string;
  }[];
}

export function calculateResult(answers: Option[]): ResultData {
  const scores = {
    E: 0, // Extroversion (Connectivity)
    S: 0, // Stability (Durability)
    P: 0, // Productivity (Performance)
    M: 0, // Maintenance (Needs)
  };

  answers.forEach((ans) => {
    if (ans.scores.E) scores.E += ans.scores.E;
    if (ans.scores.S) scores.S += ans.scores.S;
    if (ans.scores.P) scores.P += ans.scores.P;
    if (ans.scores.M) scores.M += ans.scores.M;
  });

  // Determine dominant trait
  const traits = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const dominant = traits[0][0];
  const secondary = traits[1][0];

  let modelName = "标准通用型终端";
  let description = "该设备各项指标均衡，适用于大多数通用场景。";
  let correctUsage = ["请按常规方式操作", "定期进行维护"];
  let incorrectUsage = ["避免极端环境", "不要过度使用"];
  let warnings = ["电量低时请及时充电"];

  // Logic to generate result based on dominant traits
  if (dominant === 'P') {
    modelName = "高性能计算工作站";
    description = "该型号专为高强度任务设计，具有极高的数据处理能力和执行力。";
    correctUsage = [
      "提供充足的任务列表以保持其运行",
      "在高效产出时给予正向反馈",
      "允许其在任务完成后进入低功耗模式"
    ];
    incorrectUsage = [
      "强迫其处理无意义的重复性劳动",
      "在运算过程中频繁打断",
      "长期闲置导致由于无事可做而过热"
    ];
    warnings = [
      "注意散热，避免过劳烧毁",
      "对低效率环境可能产生排异反应"
    ];
  } else if (dominant === 'E') {
    modelName = "广域社交网络节点";
    description = "该型号具备强大的连接能力，擅长数据交换与协议握手。";
    correctUsage = [
      "将其置于人群密集的网络中心",
      "保持通信端口常开",
      "定期组织团建活动以刷新缓存"
    ];
    incorrectUsage = [
      "将其物理隔离或断网",
      "长时间不回复其发出的握手请求",
      "限制其带宽（说话机会）"
    ];
    warnings = [
      "流量超标风险",
      "独处时电池损耗速度加快"
    ];
  } else if (dominant === 'S') {
    modelName = "军工级稳定服务器";
    description = "该型号以极高的稳定性和抗干扰能力著称，适合长期运行关键任务。";
    correctUsage = [
      "提供安静、有序的运行环境",
      "提前下达指令，避免突发任务",
      "尊重其固有的运行逻辑和协议"
    ];
    incorrectUsage = [
      "频繁更改系统设置（变卦）",
      "制造混乱或不可控的输入数据",
      "强迫其进行不必要的系统更新"
    ];
    warnings = [
      "启动慢，但运行后极难停止",
      "对突发异常的兼容性较低"
    ];
  } else if (dominant === 'M') {
    modelName = "精密需护型原型机";
    description = "该型号灵敏度极高，但对环境和维护要求苛刻，属于限量版原型机。";
    correctUsage = [
      "提供顶级能源（美食）和舒适环境",
      "定期进行情绪润滑和维护",
      "轻拿轻放，避免物理和精神冲击"
    ];
    incorrectUsage = [
      "在低电量下强行启动",
      "忽略其发出的报错信号",
      "粗暴操作或过度施压"
    ];
    warnings = [
      "维护成本极高",
      "容易触发自我保护机制（罢工）"
    ];
  } else {
    // Balanced or Mixed
    if (secondary === 'P') {
      modelName = "多功能混合动力引擎";
      description = "结合了稳定性与性能，适应性强的全能型号。";
    } else if (secondary === 'E') {
      modelName = "交互式智能终端";
      description = "在保持性能的同时，具备良好的人机交互界面。";
    }
  }

  // Generate Specs Visualization
  const maxScore = 15; // Estimate
  const normalize = (val: number) => Math.min(100, Math.max(0, ((val + 5) / 20) * 100)).toFixed(0) + "%";

  const specs = [
    { label: "算力 (Productivity)", value: normalize(scores.P) },
    { label: "连接 (Connectivity)", value: normalize(scores.E) },
    { label: "续航 (Stability)", value: normalize(scores.S) },
    { label: "维护 (Maintenance)", value: normalize(scores.M) },
  ];

  return {
    modelName,
    description,
    correctUsage,
    incorrectUsage,
    warnings,
    specs
  };
}

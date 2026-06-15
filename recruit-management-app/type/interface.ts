export interface company_type {
  id: string | number;
  name: string; //会社名
  capital: number; //資本金
  director: string; //代表取締役
  summary: string; //概要
  priority: "小" | "中" | "大"; //優先度
  scale: "小" | "中" | "大"; //規模感
  plan: intern[]; //予定
}

export interface intern {
  date: string; //yyyymmdd
  time: string; //hhmm
  title: string; //タイトル
  place: string; //場所
  summary?: string;//概要
}

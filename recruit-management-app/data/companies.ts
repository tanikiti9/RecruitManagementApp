import { company_type } from "@/type/interface";

export const companies: company_type[] = [
    {
        id: 1,
        name: "株式会社サンプルテック",
        capital: 50000000,
        director: "山田 太郎",
        summary: "Webシステム開発やクラウドサービスを提供するIT企業。",
        priority: "大",
        scale: "中",
        plan: [
            {
                date: 20260615,
                time: 1330,
                title: "会社説明会",
                place: "大阪本社"
            },
            {
                date: 20260620,
                time: 1000,
                title: "一次面接",
                place: "オンライン"
            }
        ]
    },
    {
        id: 2,
        name: "未来ソリューションズ株式会社",
        capital: 120000000,
        director: "佐藤 花子",
        summary: "AI（Artificial Intelligence：人工知能）を活用した業務支援サービスを展開。",
        priority: "中",
        scale: "大",
        plan: [
            {
                date: 20260618,
                time: 1400,
                title: "インターン",
                place: "東京支社"
            }
        ]
    },
    {
        id: 3,
        name: "クリエイトリンク有限会社",
        capital: 10000000,
        director: "鈴木 一郎",
        summary: "中小企業向けのホームページ制作を行うデザイン会社。",
        priority: "小",
        scale: "小",
        plan: [
            {
                date: 20260625,
                time: 1600,
                title: "カジュアル面談",
                place: "梅田カフェ"
            }
        ]
    }
];
import type { Locale } from "./messages";

export interface BoardCopy {
  shareDashboard: string;
  layoutPosition: string;
  layoutGrid: string;
  layoutList: string;
  customShare: string;
  boards: {
    growth: string;
    campaign: string;
    ecomAnalysis: string;
    facility: string;
    ecomMobile: string;
    financeMobile: string;
    opsMobile: string;
  };
}

const en: BoardCopy = {
  shareDashboard: "Shared dashboard",
  layoutPosition: "Free",
  layoutGrid: "Grid",
  layoutList: "List",
  customShare: "Custom share",
  boards: {
    growth: "Ecommerce growth",
    campaign: "Ecommerce campaign",
    ecomAnalysis: "Ecommerce analysis",
    facility: "Facility ops",
    ecomMobile: "Ecommerce mobile",
    financeMobile: "Finance mobile",
    opsMobile: "Facility mobile",
  },
};

export const boardCopy: Record<Locale, BoardCopy> = {
  en,
  "zh-CN": {
    shareDashboard: "分享的仪表盘",
    layoutPosition: "自由布局",
    layoutGrid: "网格",
    layoutList: "列表",
    customShare: "自定义分享",
    boards: {
      growth: "电商增长指挥",
      campaign: "电商活动大屏",
      ecomAnalysis: "电商营销分析",
      facility: "机电运维工作台",
      ecomMobile: "电商营销（移动）",
      financeMobile: "财务分析（移动）",
      opsMobile: "机电运维（移动）",
    },
  },
  "zh-TW": {
    shareDashboard: "分享的儀表板",
    layoutPosition: "自由佈局",
    layoutGrid: "網格",
    layoutList: "列表",
    customShare: "自訂分享",
    boards: {
      growth: "電商增長指揮",
      campaign: "電商活動大屏",
      ecomAnalysis: "電商行銷分析",
      facility: "機電維運工作臺",
      ecomMobile: "電商行銷（行動）",
      financeMobile: "財務分析（行動）",
      opsMobile: "機電維運（行動）",
    },
  },
  ja: {
    ...en,
    shareDashboard: "共有ダッシュボード",
    layoutPosition: "自由",
    layoutGrid: "グリッド",
    layoutList: "リスト",
    customShare: "カスタム共有",
    boards: {
      growth: "EC成長指揮",
      campaign: "ECキャンペーン",
      ecomAnalysis: "ECマーケ分析",
      facility: "設備運用",
      ecomMobile: "ECマーケ（モバイル）",
      financeMobile: "財務分析（モバイル）",
      opsMobile: "設備運用（モバイル）",
    },
  },
  ko: {
    ...en,
    shareDashboard: "공유 대시보드",
    layoutPosition: "자유",
    layoutGrid: "그리드",
    layoutList: "목록",
    customShare: "사용자 지정 공유",
    boards: {
      growth: "이커머스 성장",
      campaign: "이커머스 캠페인",
      ecomAnalysis: "이커머스 분석",
      facility: "설비 운영",
      ecomMobile: "이커머스 (모바일)",
      financeMobile: "재무 분석 (모바일)",
      opsMobile: "설비 운영 (모바일)",
    },
  },
  pt: {
    ...en,
    shareDashboard: "Painel partilhado",
    layoutPosition: "Livre",
    layoutGrid: "Grelha",
    layoutList: "Lista",
    customShare: "Partilha personalizada",
  },
  nl: {
    ...en,
    shareDashboard: "Gedeeld dashboard",
    layoutPosition: "Vrij",
    layoutGrid: "Raster",
    layoutList: "Lijst",
    customShare: "Aangepaste share",
  },
  it: {
    ...en,
    shareDashboard: "Dashboard condivisa",
    layoutPosition: "Libero",
    layoutGrid: "Griglia",
    layoutList: "Elenco",
    customShare: "Condivisione personalizzata",
  },
  es: {
    ...en,
    shareDashboard: "Panel compartido",
    layoutPosition: "Libre",
    layoutGrid: "Cuadrícula",
    layoutList: "Lista",
    customShare: "Uso compartido personalizado",
  },
  fr: {
    ...en,
    shareDashboard: "Tableau partagé",
    layoutPosition: "Libre",
    layoutGrid: "Grille",
    layoutList: "Liste",
    customShare: "Partage personnalisé",
  },
};

export const LOCALES = ["zh-CN", "zh-TW", "ja", "ko", "en", "pt", "nl", "it", "es", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const LOCALE_LABELS: Record<Locale, string> = {
  "zh-CN": "简体中文",
  "zh-TW": "繁體中文",
  ja: "日本語",
  ko: "한국어",
  en: "English",
  pt: "Português",
  nl: "Nederlands",
  it: "Italiano",
  es: "Español",
  fr: "Français",
};

/** Short label shown on the navbar. Dropdown items use {@link LOCALE_LABELS}. */
export const LOCALE_SHORT: Record<Locale, string> = {
  "zh-CN": "简",
  "zh-TW": "繁",
  ja: "JA",
  ko: "KO",
  en: "EN",
  pt: "PT",
  nl: "NL",
  it: "IT",
  es: "ES",
  fr: "FR",
};

export interface Messages {
  brandSubtitle: string;
  docs: string;
  language: string;
  sidebarLabel: string;
  modeDesc: {
    iframe: string;
    "js-sdk": string;
    "micro-app": string;
    wujie: string;
  };
  configTitle: string;
  params: string;
  expandConfig: string;
  collapseConfig: string;
  refreshPreview: string;
  previewTitle: string;
  previewLoading: (mode: string) => string;
  previewNeedConfig: string;
  required: string;
  shareUidPlaceholder: string;
  tokenPlaceholder: string;
  proxyLabel: string;
  apply: string;
  reset: string;
  codeTitle: (mode: string) => string;
  copy: string;
  copySuccess: string;
  copyFail: string;
  applySuccess: string;
  resetSuccess: string;
  emptyConfig: string;
  loadFailed: (error: string) => string;
}

const en: Messages = {
  brandSubtitle: "Four embed modes · live preview",
  docs: "Docs",
  language: "Language",
  sidebarLabel: "Embed mode",
  modeDesc: {
    iframe: "Native iframe — lowest integration cost",
    "js-sdk": "Official SDK — mount into a container",
    "micro-app": "micro-zoe micro-frontend embed",
    wujie: "Wujie micro-frontend embed",
  },
  configTitle: "Embed config",
  params: "Parameters",
  expandConfig: "Expand config",
  collapseConfig: "Collapse config",
  refreshPreview: "Refresh preview",
  previewTitle: "Live preview",
  previewLoading: (mode) => `Loading dashboard via ${mode}`,
  previewNeedConfig: "Enter shareUid and token, then click Apply",
  required: "Required",
  shareUidPlaceholder: "Share config uid",
  tokenPlaceholder: "Public access token",
  proxyLabel: "proxy (optional)",
  apply: "Apply & preview",
  reset: "Reset defaults",
  codeTitle: (mode) => `${mode} embed code`,
  copy: "Copy",
  copySuccess: "Code copied",
  copyFail: "Copy failed — select the text manually",
  applySuccess: "Config applied — preview expanded",
  resetSuccess: "Restored env defaults",
  emptyConfig: "Configure shareUid and token above first",
  loadFailed: (error) => `Load failed: ${error}`,
};

const zhCN: Messages = {
  brandSubtitle: "四种方式嵌入仪表盘 · 实时预览",
  docs: "文档",
  language: "语言",
  sidebarLabel: "嵌入方式",
  modeDesc: {
    iframe: "原生 iframe，接入成本最低",
    "js-sdk": "官方 SDK，一键挂载容器",
    "micro-app": "micro-zoe 微前端嵌入",
    wujie: "无界微前端嵌入",
  },
  configTitle: "嵌入配置",
  params: "参数",
  expandConfig: "展开配置",
  collapseConfig: "收起配置",
  refreshPreview: "刷新预览",
  previewTitle: "嵌入预览",
  previewLoading: (mode) => `正在以 ${mode} 方式加载仪表盘`,
  previewNeedConfig: "请先填写 shareUid 与 token，然后点击应用",
  required: "必填",
  shareUidPlaceholder: "分享配置 uid",
  tokenPlaceholder: "公开访问令牌",
  proxyLabel: "proxy（可选）",
  apply: "应用并预览",
  reset: "恢复默认",
  codeTitle: (mode) => `${mode} 嵌入代码`,
  copy: "复制",
  copySuccess: "代码已复制",
  copyFail: "复制失败，请手动选择文本",
  applySuccess: "已应用配置，已展开预览",
  resetSuccess: "已恢复环境变量默认值",
  emptyConfig: "请先在上方配置 shareUid 与 token",
  loadFailed: (error) => `加载失败：${error}`,
};

const zhTW: Messages = {
  brandSubtitle: "四種方式嵌入儀表板 · 即時預覽",
  docs: "文件",
  language: "語言",
  sidebarLabel: "嵌入方式",
  modeDesc: {
    iframe: "原生 iframe，接入成本最低",
    "js-sdk": "官方 SDK，一鍵掛載容器",
    "micro-app": "micro-zoe 微前端嵌入",
    wujie: "無界微前端嵌入",
  },
  configTitle: "嵌入設定",
  params: "參數",
  expandConfig: "展開設定",
  collapseConfig: "收合設定",
  refreshPreview: "重新整理預覽",
  previewTitle: "嵌入預覽",
  previewLoading: (mode) => `正在以 ${mode} 方式載入儀表板`,
  previewNeedConfig: "請先填寫 shareUid 與 token，然後點擊套用",
  required: "必填",
  shareUidPlaceholder: "分享設定 uid",
  tokenPlaceholder: "公開存取權杖",
  proxyLabel: "proxy（選填）",
  apply: "套用並預覽",
  reset: "恢復預設",
  codeTitle: (mode) => `${mode} 嵌入程式碼`,
  copy: "複製",
  copySuccess: "程式碼已複製",
  copyFail: "複製失敗，請手動選取文字",
  applySuccess: "已套用設定，已展開預覽",
  resetSuccess: "已恢復環境變數預設值",
  emptyConfig: "請先在上方設定 shareUid 與 token",
  loadFailed: (error) => `載入失敗：${error}`,
};

const ja: Messages = {
  brandSubtitle: "4 つの埋め込み方式 · ライブプレビュー",
  docs: "ドキュメント",
  language: "言語",
  sidebarLabel: "埋め込み方式",
  modeDesc: {
    iframe: "ネイティブ iframe。導入コストが最小",
    "js-sdk": "公式 SDK。コンテナへワンクリックでマウント",
    "micro-app": "micro-zoe マイクロフロントエンド",
    wujie: "Wujie マイクロフロントエンド",
  },
  configTitle: "埋め込み設定",
  params: "パラメータ",
  expandConfig: "設定を開く",
  collapseConfig: "設定を閉じる",
  refreshPreview: "プレビューを更新",
  previewTitle: "埋め込みプレビュー",
  previewLoading: (mode) => `${mode} でダッシュボードを読み込み中`,
  previewNeedConfig: "shareUid と token を入力してから適用してください",
  required: "必須",
  shareUidPlaceholder: "共有設定の uid",
  tokenPlaceholder: "公開アクセストークン",
  proxyLabel: "proxy（任意）",
  apply: "適用してプレビュー",
  reset: "既定値に戻す",
  codeTitle: (mode) => `${mode} 埋め込みコード`,
  copy: "コピー",
  copySuccess: "コードをコピーしました",
  copyFail: "コピーに失敗しました。テキストを選択してください",
  applySuccess: "設定を適用し、プレビューを開きました",
  resetSuccess: "環境変数の既定値に戻しました",
  emptyConfig: "先に shareUid と token を設定してください",
  loadFailed: (error) => `読み込み失敗：${error}`,
};

const ko: Messages = {
  brandSubtitle: "네 가지 임베드 방식 · 실시간 미리보기",
  docs: "문서",
  language: "언어",
  sidebarLabel: "임베드 방식",
  modeDesc: {
    iframe: "네이티브 iframe, 연동 비용이 가장 낮음",
    "js-sdk": "공식 SDK, 컨테이너에 한 번에 마운트",
    "micro-app": "micro-zoe 마이크로 프론트엔드",
    wujie: "Wujie 마이크로 프론트엔드",
  },
  configTitle: "임베드 설정",
  params: "매개변수",
  expandConfig: "설정 펼치기",
  collapseConfig: "설정 접기",
  refreshPreview: "미리보기 새로고침",
  previewTitle: "임베드 미리보기",
  previewLoading: (mode) => `${mode} 방식으로 대시보드를 불러오는 중`,
  previewNeedConfig: "shareUid와 token을 입력한 뒤 적용하세요",
  required: "필수",
  shareUidPlaceholder: "공유 설정 uid",
  tokenPlaceholder: "공개 액세스 토큰",
  proxyLabel: "proxy (선택)",
  apply: "적용 후 미리보기",
  reset: "기본값 복원",
  codeTitle: (mode) => `${mode} 임베드 코드`,
  copy: "복사",
  copySuccess: "코드를 복사했습니다",
  copyFail: "복사에 실패했습니다. 텍스트를 직접 선택하세요",
  applySuccess: "설정을 적용하고 미리보기를 펼쳤습니다",
  resetSuccess: "환경 변수 기본값으로 되돌렸습니다",
  emptyConfig: "먼저 위에서 shareUid와 token을 설정하세요",
  loadFailed: (error) => `로드 실패: ${error}`,
};

const pt: Messages = {
  brandSubtitle: "Quatro modos de incorporação · pré-visualização ao vivo",
  docs: "Documentação",
  language: "Idioma",
  sidebarLabel: "Modo de incorporação",
  modeDesc: {
    iframe: "iframe nativo — menor custo de integração",
    "js-sdk": "SDK oficial — montar num contentor",
    "micro-app": "Micro-frontend com micro-zoe",
    wujie: "Micro-frontend com Wujie",
  },
  configTitle: "Configuração de incorporação",
  params: "Parâmetros",
  expandConfig: "Expandir configuração",
  collapseConfig: "Recolher configuração",
  refreshPreview: "Atualizar pré-visualização",
  previewTitle: "Pré-visualização",
  previewLoading: (mode) => `A carregar o painel via ${mode}`,
  previewNeedConfig: "Introduza shareUid e token e clique em Aplicar",
  required: "Obrigatório",
  shareUidPlaceholder: "uid da configuração de partilha",
  tokenPlaceholder: "Token de acesso público",
  proxyLabel: "proxy (opcional)",
  apply: "Aplicar e pré-visualizar",
  reset: "Repor predefinições",
  codeTitle: (mode) => `Código de incorporação ${mode}`,
  copy: "Copiar",
  copySuccess: "Código copiado",
  copyFail: "Falha ao copiar — selecione o texto manualmente",
  applySuccess: "Configuração aplicada — pré-visualização expandida",
  resetSuccess: "Valores predefinidos do ambiente restaurados",
  emptyConfig: "Configure shareUid e token acima primeiro",
  loadFailed: (error) => `Falha ao carregar: ${error}`,
};

const nl: Messages = {
  brandSubtitle: "Vier insluitmodi · live voorbeeld",
  docs: "Documentatie",
  language: "Taal",
  sidebarLabel: "Insluitmodus",
  modeDesc: {
    iframe: "Native iframe — laagste integratiekosten",
    "js-sdk": "Officiële SDK — mount in een container",
    "micro-app": "micro-zoe micro-frontend",
    wujie: "Wujie micro-frontend",
  },
  configTitle: "Insluitconfiguratie",
  params: "Parameters",
  expandConfig: "Configuratie uitklappen",
  collapseConfig: "Configuratie inklappen",
  refreshPreview: "Voorbeeld vernieuwen",
  previewTitle: "Live voorbeeld",
  previewLoading: (mode) => `Dashboard laden via ${mode}`,
  previewNeedConfig: "Vul shareUid en token in en klik op Toepassen",
  required: "Verplicht",
  shareUidPlaceholder: "uid van deelconfiguratie",
  tokenPlaceholder: "Openbaar toegangstoken",
  proxyLabel: "proxy (optioneel)",
  apply: "Toepassen en bekijken",
  reset: "Standaard herstellen",
  codeTitle: (mode) => `${mode}-insluitcode`,
  copy: "Kopiëren",
  copySuccess: "Code gekopieerd",
  copyFail: "Kopiëren mislukt — selecteer de tekst handmatig",
  applySuccess: "Configuratie toegepast — voorbeeld uitgeklapt",
  resetSuccess: "Omgevingsstandaarden hersteld",
  emptyConfig: "Stel eerst shareUid en token hierboven in",
  loadFailed: (error) => `Laden mislukt: ${error}`,
};

const it: Messages = {
  brandSubtitle: "Quattro modalità di incorporamento · anteprima live",
  docs: "Documentazione",
  language: "Lingua",
  sidebarLabel: "Modalità di incorporamento",
  modeDesc: {
    iframe: "iframe nativo — costo di integrazione minimo",
    "js-sdk": "SDK ufficiale — montaggio in un contenitore",
    "micro-app": "Micro-frontend con micro-zoe",
    wujie: "Micro-frontend con Wujie",
  },
  configTitle: "Configurazione di incorporamento",
  params: "Parametri",
  expandConfig: "Espandi configurazione",
  collapseConfig: "Comprimi configurazione",
  refreshPreview: "Aggiorna anteprima",
  previewTitle: "Anteprima",
  previewLoading: (mode) => `Caricamento dashboard tramite ${mode}`,
  previewNeedConfig: "Inserisci shareUid e token, poi fai clic su Applica",
  required: "Obbligatorio",
  shareUidPlaceholder: "uid della configurazione di condivisione",
  tokenPlaceholder: "Token di accesso pubblico",
  proxyLabel: "proxy (facoltativo)",
  apply: "Applica e anteprima",
  reset: "Ripristina predefiniti",
  codeTitle: (mode) => `Codice di incorporamento ${mode}`,
  copy: "Copia",
  copySuccess: "Codice copiato",
  copyFail: "Copia non riuscita — seleziona il testo manualmente",
  applySuccess: "Configurazione applicata — anteprima espansa",
  resetSuccess: "Ripristinati i valori predefiniti dell'ambiente",
  emptyConfig: "Configura prima shareUid e token in alto",
  loadFailed: (error) => `Caricamento non riuscito: ${error}`,
};

const es: Messages = {
  brandSubtitle: "Cuatro modos de incrustación · vista previa en vivo",
  docs: "Documentación",
  language: "Idioma",
  sidebarLabel: "Modo de incrustación",
  modeDesc: {
    iframe: "iframe nativo — menor coste de integración",
    "js-sdk": "SDK oficial — montaje en un contenedor",
    "micro-app": "Micro-frontend con micro-zoe",
    wujie: "Micro-frontend con Wujie",
  },
  configTitle: "Configuración de incrustación",
  params: "Parámetros",
  expandConfig: "Expandir configuración",
  collapseConfig: "Contraer configuración",
  refreshPreview: "Actualizar vista previa",
  previewTitle: "Vista previa",
  previewLoading: (mode) => `Cargando el panel mediante ${mode}`,
  previewNeedConfig: "Introduce shareUid y token y pulsa Aplicar",
  required: "Obligatorio",
  shareUidPlaceholder: "uid de la configuración de uso compartido",
  tokenPlaceholder: "Token de acceso público",
  proxyLabel: "proxy (opcional)",
  apply: "Aplicar y previsualizar",
  reset: "Restablecer valores",
  codeTitle: (mode) => `Código de incrustación ${mode}`,
  copy: "Copiar",
  copySuccess: "Código copiado",
  copyFail: "Error al copiar — selecciona el texto manualmente",
  applySuccess: "Configuración aplicada — vista previa expandida",
  resetSuccess: "Valores predeterminados del entorno restaurados",
  emptyConfig: "Configura primero shareUid y token arriba",
  loadFailed: (error) => `Error al cargar: ${error}`,
};

const fr: Messages = {
  brandSubtitle: "Quatre modes d’intégration · aperçu en direct",
  docs: "Documentation",
  language: "Langue",
  sidebarLabel: "Mode d’intégration",
  modeDesc: {
    iframe: "iframe natif — coût d’intégration le plus bas",
    "js-sdk": "SDK officiel — montage dans un conteneur",
    "micro-app": "Micro-frontend micro-zoe",
    wujie: "Micro-frontend Wujie",
  },
  configTitle: "Configuration d’intégration",
  params: "Paramètres",
  expandConfig: "Déplier la configuration",
  collapseConfig: "Replier la configuration",
  refreshPreview: "Actualiser l’aperçu",
  previewTitle: "Aperçu",
  previewLoading: (mode) => `Chargement du tableau de bord via ${mode}`,
  previewNeedConfig: "Saisissez shareUid et token, puis cliquez sur Appliquer",
  required: "Obligatoire",
  shareUidPlaceholder: "uid de la configuration de partage",
  tokenPlaceholder: "Jeton d’accès public",
  proxyLabel: "proxy (facultatif)",
  apply: "Appliquer et prévisualiser",
  reset: "Rétablir les valeurs",
  codeTitle: (mode) => `Code d’intégration ${mode}`,
  copy: "Copier",
  copySuccess: "Code copié",
  copyFail: "Échec de la copie — sélectionnez le texte manuellement",
  applySuccess: "Configuration appliquée — aperçu déplié",
  resetSuccess: "Valeurs par défaut de l’environnement rétablies",
  emptyConfig: "Configurez d’abord shareUid et token ci-dessus",
  loadFailed: (error) => `Échec du chargement : ${error}`,
};

export const messages: Record<Locale, Messages> = {
  en,
  "zh-CN": zhCN,
  "zh-TW": zhTW,
  ja,
  ko,
  pt,
  nl,
  it,
  es,
  fr,
};

export const LOCALE_STORAGE_KEY = "dataluminary.share-demo.locale";

const LOCALE_SET = new Set<string>(LOCALES);

export function isLocale(value: string): value is Locale {
  return LOCALE_SET.has(value);
}

/** Map a saved or browser language tag onto a supported locale. */
export function matchLocale(tag: string | null | undefined): Locale | null {
  const raw = (tag ?? "").trim().replace(/_/g, "-").toLowerCase();
  if (!raw) return null;
  if (isLocale(raw)) return raw;
  if (
    raw === "zh" ||
    raw === "zh-cn" ||
    raw === "zh-hans" ||
    raw.startsWith("zh-hans") ||
    raw.startsWith("zh-cn")
  ) {
    return "zh-CN";
  }
  if (
    raw.startsWith("zh") &&
    (raw.includes("tw") || raw.includes("hk") || raw.includes("mo") || raw.includes("hant"))
  ) {
    return "zh-TW";
  }
  if (raw.startsWith("zh")) return "zh-CN";
  const primary = raw.split("-")[0];
  if (primary && isLocale(primary)) return primary;
  return null;
}

function localeFromTimeZone(timeZone: string | null | undefined): Locale | null {
  const zone = (timeZone ?? "").trim().toLowerCase();
  if (!zone) return null;
  if (
    zone === "asia/shanghai" ||
    zone === "asia/chongqing" ||
    zone === "asia/chungking" ||
    zone === "asia/harbin" ||
    zone === "asia/urumqi" ||
    zone === "asia/kashgar"
  ) {
    return "zh-CN";
  }
  if (zone === "asia/taipei" || zone === "asia/hong_kong" || zone === "asia/macau" || zone === "asia/macao") {
    return "zh-TW";
  }
  if (zone === "asia/tokyo") return "ja";
  if (zone === "asia/seoul") return "ko";
  if (zone === "europe/paris") return "fr";
  if (zone === "europe/rome") return "it";
  if (zone === "europe/amsterdam") return "nl";
  if (zone === "europe/madrid" || zone === "america/mexico_city" || zone === "america/bogota") return "es";
  if (zone === "europe/lisbon" || zone === "america/sao_paulo") return "pt";
  return null;
}

export function detectLocale(): Locale {
  try {
    const saved = matchLocale(localStorage.getItem(LOCALE_STORAGE_KEY));
    if (saved) return saved;
  } catch {
    // ignore
  }
  if (typeof navigator !== "undefined") {
    const tags = [...(navigator.languages ?? []), navigator.language];
    for (const tag of tags) {
      const match = matchLocale(tag);
      if (match) return match;
    }
  }
  let timeZone: string | undefined;
  try {
    timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    timeZone = undefined;
  }
  return localeFromTimeZone(timeZone) ?? "en";
}

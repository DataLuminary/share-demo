declare namespace NodeJS {
  interface ProcessEnv {
    PUBLIC_APP_ORIGIN?: string;
    PUBLIC_SHARE_UID?: string;
    PUBLIC_SHARE_TOKEN?: string;
    PUBLIC_PROXY?: string;
    PUBLIC_SDK_CDN_URL?: string;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};

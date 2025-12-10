export interface SignData {
  handShape: string;
  movement: string;
}

export interface AppState {
  term: string;
  isLoadingVideo: boolean;
  isLoadingText: boolean;
  videoUrl: string | null;
  signData: SignData | null;
  error: string | null;
}

export interface GeminiResponse {
  handShape: string;
  movement: string;
}
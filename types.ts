
export interface VideoMetadata {
  id: string;
  title: string;
  thumbnail: string;
  previewUrl?: string;
  author: string;
  duration: string;
  platform: 'instagram' | 'tiktok' | 'facebook' | 'unknown';
  formats: VideoFormat[];
}

export interface VideoFormat {
  quality: string;
  url: string;
  size?: string;
}

export enum AppStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

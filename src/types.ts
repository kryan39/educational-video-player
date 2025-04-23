export interface Video {
    id: string; // locally generated UUID to ensure comments can be associated with the video
    user_id: string;
    title: string;
    description: string;
    video_url: string;
    comments?: string[]; 
}
export interface EditVideo {
    video_id: string;
    title: string;
    description: string;
}

export interface VideoFormData {
    title: string;
    description: string;
    video_url: string;
  }

export interface Comment{
    id: string;
    text: string;
    author?: string;
    timestamp: string;
    user_id?: string;
}

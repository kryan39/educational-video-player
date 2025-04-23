import { Video } from "../types";


// uses a proxy to bypass CORS issue in development.
// See vite.config.ts
export async function getVideos(userId: string): Promise<Video[]> { 
    const response = await fetch(`/api/videos?user_id=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('No videos found.');
    } else if (response.status === 500) {
      throw new Error('Failed to fetch videos: 500 Internal Server Error');
    } else {
      throw new Error(`Unexpected error (${response.status})`);
    }
  }
    const data = await response.json();
    return data.videos || [];
}

export async function createVideos(video: Video): Promise<Video> {
    const response = await fetch(`/api/videos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(video)
    });
    if (!response.ok) {
        if (response.status === 400) {
          throw new Error('Failed to create video: 400 Bad Request');
        } else if (response.status === 500) {
          throw new Error('Failed to create video due to server error.');
        } else {
          throw new Error(`Unexpected error (${response.status})`);
        }
    }
    const data = await response.json();
    console.log('API response for createVideos:', data);
    return data;
}

export async function getSingleVideo(videoId: string): Promise<Video> {
    const response = await fetch(`/api/videos/single?video_id=${videoId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch video');
    }
    return response.json();
}

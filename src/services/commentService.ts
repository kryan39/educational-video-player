import { Comment } from "../types";

// Due to the API not returning a video ID, comments are currently implemented client-side for the purpose of this assignment.
// I generate a unique key for each video URL to store comments.
// So I use the video url as the key in localStorage.


  function getStorageKey(videoId: string): string {
    return `comments:${videoId}`;
  }
  
  export function getComments(videoId: string): Comment[] {
    const key = getStorageKey(videoId);
    const stored = localStorage.getItem(key);
  
    try {
      return stored ? JSON.parse(stored) : [];
    } catch {
      localStorage.removeItem(key);
      return [];
    }
  }
  
  export function addComment(videoId: string, text: string, user_id?: string): Comment {
    const key = getStorageKey(videoId);
    const newComment: Comment = {
      id: crypto.randomUUID?.() || Date.now().toString(),
      text: text.trim(),
      author: 'Guest',
      timestamp: new Date().toISOString(),
      user_id
    };
  
    const existing = getComments(videoId);
    const updated = [newComment, ...existing];
    localStorage.setItem(key, JSON.stringify(updated));
  
    return newComment;
  }
  
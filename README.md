# React + TypeScript + Vite

Built this react app using vite

To run locally:
git clone
cd educational-video-player
npm install
npm run dev

to test:
npm test


ensure you have node.js and npm installed on your system.

Implementation Notes:

The API does not return video_id, which is required for associating comments. 
I generated a unique id for each video using uuid4v().
The id is stored locally and is used to identify videos in the UI, store comments in localStorage, and open specific videos in a modal. 

I was encountering CORS errors while developing locally. 
My solution was to configure a proxy in vite.config.ts to forward requests from /api to the actual API origin.

The system is only set up to accept youtube videos when adding new videos.

I have implemented:
-Persisted comments and ability to leave comments
-clickable video in list of videos
-add videos
-playback and fullscreen functionality




<img width="1546" alt="Screenshot 2025-04-23 at 7 14 38 PM" src="https://github.com/user-attachments/assets/0be8e4b2-3b30-46f0-a83c-8ed3a706f776" />


<img width="1609" alt="Screenshot 2025-04-23 at 7 15 34 PM" src="https://github.com/user-attachments/assets/1f88b264-b494-4e31-ad00-1760c1041248" />








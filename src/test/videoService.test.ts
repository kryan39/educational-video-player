import { getVideos, createVideos } from "../services/videoService";

global.fetch = jest.fn() as jest.Mock;

describe("videoService", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    describe("getVideos", () => {
       
        it("throws an error if the fetch fails", async () => {
         // Mock the fetch response to simulate a failure
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 500,
                statusText: "Internal Server Error",
            });

            const userId = "user-123";

            await expect(getVideos(userId)).rejects.toThrow(
                "Failed to fetch videos: 500 Internal Server Error"
            );

            // Verify the fetch call
            expect(fetch).toHaveBeenCalledWith(`/api/videos?user_id=${userId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
        });
    });


    describe("createVideos", () => {
        it("sends a new video to the server and returns the created video", async () => {
            const newVideo = {
                id: "3",
                user_id: "user-123",
                title: "New Video",
                description: "This is a new video",
                video_url: "https://www.youtube.com/watch?v=new123",
   
            };

            const createdVideo = {
                ...newVideo,
                id: "3",
            };

            // Mock the fetch response
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: true,
                json: async () => createdVideo,
            });

            const result = await createVideos(newVideo);

            // Verify the fetch call
            expect(fetch).toHaveBeenCalledWith(`/api/videos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newVideo),
            });

            // Verify the returned video
            expect(result).toEqual(createdVideo);
        });

        it("throws an error if the fetch fails", async () => {
            const newVideo = {
                id: "placeholder-id", // Add a placeholder ID
                title: "New Video",
                description: "This is a new video",
                video_url: "https://www.youtube.com/watch?v=new123",
                user_id: "user-123",
            };

            // Mock the fetch response to simulate a failure
            (fetch as jest.Mock).mockResolvedValueOnce({
                ok: false,
                status: 400,
                statusText: "Bad Request",
            });

            await expect(createVideos(newVideo)).rejects.toThrow(
                "Failed to create video: 400 Bad Request"
            );

            // Verify the fetch call
            expect(fetch).toHaveBeenCalledWith(`/api/videos`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newVideo),
            });
        });
    });
});
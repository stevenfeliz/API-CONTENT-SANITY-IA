import { chromium } from "playwright";
import axios from "axios";
import { youtubeSearchInterface } from "../interfaces/youtubeSearch.interface";

export const youtubeSeach = async (keyword:string) => {
    const encodedString = encodeURIComponent(keyword);
    try {
        const browser = await chromium.launch({ headless: true });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(`https://www.youtube.com/results?search_query=${encodedString}`)

        const href = await page.locator('#video-title').nth(2).getAttribute('href')
        let match = href!.match(/[?&]v=([^&]+)/);
        let videoId = match && match[1];
        await page.close()
        return {
            miniatura:`https://img.youtube.com/vi/${videoId}/0.jpg`,
            videoUrl:`https://www.youtube.com/embed/${videoId}`
        }

    } catch (error) {
        throw error
    }
}
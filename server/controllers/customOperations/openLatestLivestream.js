import puppeteer from "puppeteer";

export async function openLatestLivestream() {
    const browser = await puppeteer.launch({ headless: false, product: "firefox", args: ['--start-maximized'], defaultViewport: null });
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1024 });          // Set screen size.


    // Go to your YouTube channel's streams page
    await page.goto("https://www.youtube.com/@archon_g/streams", {
        waitUntil: "networkidle2",
    });

    // Wait for grid to appear
    await page.waitForSelector("ytd-grid-video-renderer", { timeout: 20000 });

    // Wait a bit for thumbnails to load (YouTube lazy-loads)
    await page.waitForTimeout(3000);

}

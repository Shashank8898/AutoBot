import puppeteer from "puppeteer";

export async function openBBS() {
    const browser = await puppeteer.launch({ headless: false, product: "firefox", args: ['--start-maximized'], defaultViewport: null });
    const page = await browser.newPage();

    // Set screen size.
    await page.setViewport({ width: 1920, height: 1024 });
    // Navigate the page to a URL.
    await page.goto('https://youtube.com');

    // Open the search menu using the keyboard.
    await page.keyboard.press('/');

    // Type into search box using accessible input name.
    await page.locator('::-p-aria(Search)').fill('bbs');

    await page.keyboard.press('Enter')

    // Wait for video results to load
    await page.waitForSelector('ytd-video-renderer,ytd-grid-video-renderer');

    // Select the first video element
    const firstVideo = await page.$('ytd-video-renderer,ytd-grid-video-renderer');

    // Click it
    if (firstVideo) {
        await firstVideo.click();
        console.log("✅ Opened first video result!");
    } else {
        console.log("⚠️ No video found!");
    }
}

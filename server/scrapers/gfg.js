import puppeteer from 'puppeteer';
import chrome from 'chrome-aws-lambda';

async function getImageSrc(userName) {
    const browser = await puppeteer.launch({
        executablePath: await chrome.executablePath,
        headless: true,
        args: chrome.args,
        defaultViewport: chrome.defaultViewport,
    });
    const page = await browser.newPage();
    await page.goto(`https://www.geeksforgeeks.org/user/${userName}/`, {
        waitUntil: "networkidle2",
    });

    // img div
    const imgSelector = ".profilePicSection_head_img__1GLm0 > span > img";
    const rankSelector = ".toolTip_tooltip_head__U3klv > span:nth-child(2) b";

    // waiting 
    await page.waitForSelector(imgSelector);
    await page.waitForSelector(rankSelector);

    // getting src
    const imgSrc = await page.$eval(imgSelector, (img) => img.src);
    const rank = await page.$eval(rankSelector, (b) => b.innerText);

    console.log(`Image src: ${imgSrc}`);
    console.log(`Ranking: ${rank}`);

    await browser.close();
    return imgSrc;
}

getImageSrc('nikhilcharan')
    .then((src) => console.log(`Fetched Data`))
    .catch((err) => console.error(err));

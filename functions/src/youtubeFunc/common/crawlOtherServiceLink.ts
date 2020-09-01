import * as puppeteer from "puppeteer";

import { getPuppeteerOptions } from "../../common/utils";

export const crawlOtherServiceLink = async (channelId: string) => {
  const browser = await puppeteer.launch(getPuppeteerOptions());
  const page = await browser.newPage();

  await page.setRequestInterception(true);
  page.on("request", (request) => {
    const resourceType = request.resourceType();
    const resouceUrl = request.url();
    const abortCondition =
      ["image", "stylesheet", "font", "xhr", "manifest"].includes(resourceType) ||
      (resourceType === "script" && !/youtube.com/.test(resouceUrl)) ||
      (resourceType === "other" && !/ytimg.com/.test(resouceUrl));
    if (abortCondition) {
      request.abort();
    } else {
      request.continue();
    }
  });

  const targetUrl = `https://www.youtube.com/channel/${channelId}/about`;
  console.log(targetUrl);
  await page.goto(targetUrl, { timeout: 1000 * 120 });

  const LinkSelector = "#link-list-container a" as const;
  await page.waitForSelector(LinkSelector, { timeout: 1000 * 120 });
  const elements = await page.$$(LinkSelector);

  const linkUrls: string[] = [];
  for (const ele of elements) {
    const property = await ele.getProperty("href");
    const value = (await property.jsonValue()) as string;
    const decodeUrl = decodeURIComponent(value);
    const url = new URL(decodeUrl).searchParams.get("q");
    if (url) {
      linkUrls.push(url);
    }
  }

  await browser.close();

  return linkUrls;
};

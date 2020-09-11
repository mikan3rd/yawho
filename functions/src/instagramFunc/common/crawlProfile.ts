import { puppeteerSetup } from "../../common/utils";
import { INSTAGRAM_PASSWORD, INSTAGRAM_USERNAME } from "../../common/config";

type shareDataType = {
  entry_data: { ProfilePage: { graphql: { user: InstagramUserType } }[] };
};
interface customWindow extends Window {
  _sharedData;
}

let window: customWindow;

export const crawlProfile = async (username: string) => {
  const { browser, page } = await puppeteerSetup(true);

  const targetUrl = `http://www.instagram.com/${username}/`;
  console.log(targetUrl);
  await page.goto(targetUrl, { timeout: 1000 * 120 });

  if (page.url().includes("login")) {
    console.log("LOGIN!!");
    const UsernameSelector = "input[name=username]";
    const PasswordSelector = "input[name=password]";

    await page.waitForSelector(UsernameSelector);
    await page.waitForSelector(PasswordSelector);

    await page.type(UsernameSelector, INSTAGRAM_USERNAME);
    await page.type(PasswordSelector, INSTAGRAM_PASSWORD);

    await Promise.all([page.keyboard.press("Enter"), page.waitForNavigation()]);
  }

  if (page.url().includes("onetap")) {
    console.log("ONETAP!!");
    const ButtonSelector = "main section button";
    await page.waitFor(ButtonSelector);
    await Promise.all([page.click(ButtonSelector), page.waitForNavigation()]);
  }

  const sharedData: shareDataType = JSON.parse(await page.evaluate(() => JSON.stringify(window._sharedData)));
  const user = sharedData.entry_data.ProfilePage[0].graphql.user;

  await browser.close();

  delete user.edge_owner_to_timeline_media;
  delete user.edge_related_profiles;
  delete user.edge_felix_video_timeline;
  delete user.edge_media_collections;
  delete user.edge_mutual_followed_by;
  delete user.edge_saved_media;

  console.log(JSON.stringify(user));

  return user;
};

import { Injectable, Logger } from "@nestjs/common";
import { Cron, Timeout } from "@nestjs/schedule";

import { AccountService } from "@/services/account.service";
import { InstagramService } from "@/services/instagram.service";
import { TwitterService } from "@/services/twitter.service";
import { YoutubeService } from "@/services/youtube.service";

@Injectable()
export class TaskService {
  private readonly logger = new Logger(TaskService.name);

  constructor(
    private accountService: AccountService,
    private youtubeService: YoutubeService,
    private twitterService: TwitterService,
    private instagramService: InstagramService,
  ) {}

  @Cron("0 0 0 * * *")
  async bulkUpdateYoutubeVideoCategoryCron() {
    await this.bulkUpdateYoutubeVideoCategory();
  }

  @Cron("0 1 0 * * *")
  async bulkUpdateYoutubeChannelVideoCategory() {
    this.logger.debug("START: bulkUpdateYoutubeChannelVideoCategory");
    await this.youtubeService.bulkUpdateChannelVideoCategory();
    this.logger.debug("END: bulkUpdateYoutubeChannelVideoCategory");
  }

  @Cron("0 2 0 * * *")
  async bulkUpdateYoutubeKeyword() {
    this.logger.debug("START: bulkUpdateYoutubeKeyword");
    await this.youtubeService.bulkUpdateChannelKeyword();
    this.logger.debug("END: bulkUpdateYoutubeKeyword");
  }

  @Cron("0 3 0 * * *")
  async bulkUpdateYoutubeVideoTag() {
    this.logger.debug("START: bulkUpdateYoutubeVideoTag");
    await this.youtubeService.bulkUpdateVideoTag();
    this.logger.debug("END: bulkUpdateYoutubeVideoTag");
  }

  @Cron("0 0 */6 * * *")
  async saveYoutubeTrendChannel() {
    this.logger.debug("START: saveYoutubeTrendChannel");
    await this.youtubeService.saveTrendChannel();
    this.logger.debug("END: saveYoutubeTrendChannel");
  }

  @Cron("0 0 1,9,17 * * *")
  async bulkAddServiceByYoutube() {
    this.logger.debug("START: bulkAddServiceByYoutube");
    await this.accountService.addServiceByYoutube(100);
    this.logger.debug("END: bulkAddServiceByYoutube");
  }

  @Cron("0 10 1,9,17 * * *")
  async bulkAddServiceByTwitter() {
    this.logger.debug("START: bulkAddServiceByTwitter");
    await this.accountService.addServiceByTwitter(100);
    this.logger.debug("END: bulkAddServiceByTwitter");
  }

  @Cron("0 30 2,10,18 * * *")
  async bulkUpdateYoutubeChannelVideo() {
    this.logger.debug("START: bulkUpdateYoutubeChannelVideo");
    await this.youtubeService.bulkUpdateChannelVideo(100);
    this.logger.debug("END: bulkUpdateYoutubeChannelVideo");
  }

  @Timeout(1000)
  async bulkUpdateInstagramUser() {
    this.logger.debug("START: bulkUpdateInstagramUser");
    await this.instagramService.upsertUser("yukos0520");
    this.logger.debug("END: bulkUpdateInstagramUser");
  }

  // @Timeout(1000)
  // async bulkUpdateYoutubeVideoCategoryTimeout() {
  //   await this.bulkUpdateYoutubeVideoCategory();
  // }

  async bulkUpdateYoutubeVideoCategory() {
    this.logger.debug("START: bulkUpdateYoutubeVideoCategory");
    await this.youtubeService.bulkUpdateVideoCategory();
    this.logger.debug("END: bulkUpdateYoutubeVideoCategory");
  }
}
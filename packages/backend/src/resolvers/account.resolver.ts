import { Inject } from "@nestjs/common";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";

import { AccountSearchPaginationInput } from "@/dto/input/pagination.input";
import { AccountSearchResult } from "@/dto/output/accountSearchResult.output";
import { Sitemap } from "@/dto/output/sitemap.output";
import { TopPage } from "@/dto/output/topPage.output";
import { Account } from "@/models/account.model";
import { AccountService } from "@/services/account.service";

@Resolver()
export class AccountResolver {
  constructor(@Inject(AccountService) private accountService: AccountService) {}

  @Query((returns) => Account, { nullable: true })
  async getAccountPage(@Args("uuid", { type: () => ID }) uuid: string) {
    return await this.accountService.getAccountPage(uuid);
  }

  @Query((returns) => TopPage)
  async getTopPage() {
    return await this.accountService.getTopPage();
  }

  @Query((returns) => AccountSearchResult)
  async searchAccountByName(@Args("pagination") { take, word, page }: AccountSearchPaginationInput) {
    return await this.accountService.searchByName({ word, take, page });
  }

  @Query((returns) => Sitemap)
  async getSitemapData() {
    return await this.accountService.getSitemapData();
  }
}

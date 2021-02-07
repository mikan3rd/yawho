import { Inject } from "@nestjs/common";
import { Args, ID, Query, Resolver } from "@nestjs/graphql";

import { TopPage } from "@/dto/topPage.dto";
import { Account } from "@/models/account.model";
import { AccountService } from "@/services/account.service";

@Resolver()
export class AccountResolver {
  constructor(@Inject(AccountService) private accountService: AccountService) {}

  @Query((returns) => Account || null, { nullable: true })
  async getAccountPage(@Args("uuid", { type: () => ID }) uuid: string) {
    return await this.accountService.getAccountPage(uuid);
  }

  @Query((returns) => TopPage)
  async getTopPage() {
    return await this.accountService.getTopPage();
  }
}

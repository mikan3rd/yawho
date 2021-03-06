import React from "react";

import Head from "next/head";

export const Meta = React.memo<{
  title: string;
  description?: string;
}>(({ title, description = "Talenteeで世界が注目するインフルエンサーを見つけよう！" }) => {
  const titleWithSiteName = `${title} | Talentee （タレンティー）`;
  return (
    <Head>
      <title>{titleWithSiteName}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={titleWithSiteName} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="https://talentee.jp/ogp.png" />
      <meta property="og:type" content="website" />
      <meta name="twitter:title" content={titleWithSiteName} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="https://talentee.jp/ogp.png" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" type="image/png" href="/logo_icon.png" />
    </Head>
  );
});

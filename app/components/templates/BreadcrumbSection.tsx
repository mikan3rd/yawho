import React from "react";
import { Breadcrumb } from "semantic-ui-react";
import Link from "next/link";

export const TopSection = React.memo<{ active?: boolean }>(({ active = false }) => {
  return (
    <Link href="/">
      <Breadcrumb.Section href="/" active={active}>
        TOP
      </Breadcrumb.Section>
    </Link>
  );
});

export const YoutubeSection = React.memo<{ active?: boolean }>(({ active = false }) => {
  return (
    <Link href="/youtube">
      <Breadcrumb.Section href="/youtube" active={active}>
        YouTubeランキング
      </Breadcrumb.Section>
    </Link>
  );
});

export const TwitterSection = React.memo<{ active?: boolean }>(({ active = false }) => {
  return (
    <Link href="/youtube">
      <Breadcrumb.Section href="/twitter" active={active}>
        Twitterランキング
      </Breadcrumb.Section>
    </Link>
  );
});

export const InstagramSection = React.memo<{ active?: boolean }>(({ active = false }) => {
  return (
    <Link href="/instagram">
      <Breadcrumb.Section href="/instagram" active={active}>
        Instagramランキング
      </Breadcrumb.Section>
    </Link>
  );
});

export const TiktokSection = React.memo<{ active?: boolean }>(({ active = false }) => {
  return (
    <Link href="/tiktok">
      <Breadcrumb.Section href="/tiktok" active={active}>
        Tiktokランキング
      </Breadcrumb.Section>
    </Link>
  );
});

export const AccountSection = React.memo<{ active?: boolean }>(({ active = false }) => {
  return <Breadcrumb.Section active={active}>Account</Breadcrumb.Section>;
});

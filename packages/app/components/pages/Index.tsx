import React from "react";

import { css } from "@emotion/react";
import Link from "next/link";
import { Button, Divider, Icon } from "semantic-ui-react";

import { useIndexData } from "../../hooks/useIndexData";
import { InstagramCard } from "../organisms/InstagramCard";
import { TiktokCard } from "../organisms/TiktokCard";
import { TwitterCard } from "../organisms/TwitterCard";
import { YoutubeCard } from "../organisms/YoutubeCard";

export const Index = React.memo(() => {
  const { youtubeData, twitterData, instagramData, tiktokData } = useIndexData();

  return (
    <>
      <img
        src="/logo.png"
        alt="logo"
        css={css`
          width: 100%;
        `}
      />

      <p
        css={css`
          text-align: center;
        `}
      >
        Talenteeで世界が注目するインフルエンサーを見つけよう！
      </p>

      {youtubeData.length > 0 && (
        <>
          <Divider />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              @media (max-width: 600px) {
                display: block;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                @media (max-width: 600px) {
                  display: block;
                  margin-bottom: 10px;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <Icon name="youtube" color="red" size="big" />
                <h2
                  css={css`
                    color: red;
                    font-size: 20px;
                    margin: 0;
                  `}
                >
                  Youtube
                </h2>
              </div>
              <span
                css={css`
                  color: black;
                  font-size: 16px;
                  font-weight: bold;
                  margin-left: 5px;
                  @media (max-width: 600px) {
                    display: block;
                  }
                `}
              >
                チャンネル登録者数ランキング
              </span>
            </div>

            <Link href="/youtube/all" passHref>
              <Button
                color="red"
                as="a"
                css={css`
                  @media (max-width: 600px) {
                    &&& {
                      width: 100%;
                    }
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>

          <div
            css={css`
              margin: 14px 0;
            `}
          >
            {youtubeData.map((data, index) => {
              return <YoutubeCard key={data.id} data={data} rankNum={index + 1} showDetails={false} />;
            })}
          </div>

          <div
            css={css`
              text-align: right;
            `}
          >
            <Link href="/youtube/all" passHref>
              <Button
                color="red"
                as="a"
                css={css`
                  &&& {
                    width: 100%;
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>
        </>
      )}

      {twitterData.length > 0 && (
        <>
          <Divider />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              @media (max-width: 600px) {
                display: block;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                @media (max-width: 600px) {
                  display: block;
                  margin-bottom: 10px;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <Icon name="twitter" color="blue" size="big" />
                <h2
                  css={css`
                    color: #2185d0;
                    font-size: 20px;
                    margin: 0;
                  `}
                >
                  Twitter
                </h2>
              </div>
              <span
                css={css`
                  color: black;
                  font-size: 16px;
                  font-weight: bold;
                  margin-left: 5px;
                  @media (max-width: 600px) {
                    display: block;
                  }
                `}
              >
                フォロワー数ランキング
              </span>
            </div>

            <Link href="/twitter" passHref>
              <Button
                color="blue"
                as="a"
                css={css`
                  @media (max-width: 600px) {
                    &&& {
                      width: 100%;
                    }
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>

          <div
            css={css`
              margin: 14px 0;
            `}
          >
            {twitterData.map((data, index) => {
              return <TwitterCard key={data.id} data={data} rankNum={index + 1} />;
            })}
          </div>

          <div
            css={css`
              text-align: right;
            `}
          >
            <Link href="/twitter" passHref>
              <Button
                color="blue"
                as="a"
                css={css`
                  &&& {
                    width: 100%;
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>
        </>
      )}

      {instagramData.length > 0 && (
        <>
          <Divider />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              @media (max-width: 600px) {
                display: block;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                @media (max-width: 600px) {
                  display: block;
                  margin-bottom: 10px;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <img
                  src="/icon_instagram.svg"
                  css={css`
                    width: 32px;
                    margin-right: 5px;
                  `}
                />
                <h2
                  css={css`
                    font-size: 20px;
                    margin: 0;
                  `}
                >
                  Instagram
                </h2>
              </div>
              <span
                css={css`
                  color: black;
                  font-size: 16px;
                  font-weight: bold;
                  margin-left: 5px;
                  @media (max-width: 600px) {
                    display: block;
                  }
                `}
              >
                フォロワー数ランキング
              </span>
            </div>

            <Link href="/instagram" passHref>
              <Button
                as="a"
                css={css`
                  &&& {
                    color: white;
                    background-color: #49769c;
                    @media (max-width: 600px) {
                      width: 100%;
                    }
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>

          <div
            css={css`
              margin: 14px 0;
            `}
          >
            {instagramData.map((data, index) => {
              return <InstagramCard key={data.id} data={data} rankNum={index + 1} />;
            })}
          </div>

          <div
            css={css`
              text-align: right;
            `}
          >
            <Link href="/instagram" passHref>
              <Button
                as="a"
                css={css`
                  &&& {
                    width: 100%;
                    color: white;
                    background-color: #49769c;
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>
        </>
      )}

      {tiktokData.length > 0 && (
        <>
          <Divider />
          <div
            css={css`
              display: flex;
              justify-content: space-between;
              align-items: center;
              @media (max-width: 600px) {
                display: block;
              }
            `}
          >
            <div
              css={css`
                display: flex;
                align-items: center;
                @media (max-width: 600px) {
                  display: block;
                  margin-bottom: 10px;
                }
              `}
            >
              <div
                css={css`
                  display: flex;
                  align-items: center;
                `}
              >
                <img
                  src="/icon_tiktok_black.svg"
                  css={css`
                    width: 32px;
                    margin-right: 5px;
                  `}
                />
                <h2
                  css={css`
                    font-size: 20px;
                    margin: 0;
                  `}
                >
                  TikTok
                </h2>
              </div>
              <span
                css={css`
                  color: black;
                  font-size: 16px;
                  font-weight: bold;
                  margin-left: 5px;
                  @media (max-width: 600px) {
                    display: block;
                  }
                `}
              >
                フォロワー数ランキング
              </span>
            </div>

            <Link href="/tiktok" passHref>
              <Button
                as="a"
                css={css`
                  &&& {
                    color: white;
                    background-color: black;
                    border: 1px solid black;
                    @media (max-width: 600px) {
                      width: 100%;
                    }
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>

          <div
            css={css`
              margin: 14px 0;
            `}
          >
            {tiktokData.map((data, index) => {
              return <TiktokCard key={data.user.id} data={data} rankNum={index + 1} />;
            })}
          </div>

          <div
            css={css`
              text-align: right;
            `}
          >
            <Link href="/tiktok" passHref>
              <Button
                as="a"
                css={css`
                  &&& {
                    width: 100%;
                    color: white;
                    background-color: black;
                    border: 1px solid black;
                  }
                `}
              >
                ランキングを見る
              </Button>
            </Link>
          </div>
        </>
      )}
    </>
  );
});

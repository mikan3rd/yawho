declare type InstagramUserType = {
  id: string;
  username: string;
  full_name: string;
  biography: string;
  external_url: string;
  edge_followed_by: { count: number };
  edge_follow: { count: number };
  is_private: boolean;
  is_verified: boolean;
  profile_pic_url: string;
  profile_pic_url_hd: string;
  edge_felix_video_timeline: unknown[];
  edge_media_collections: unknown[];
};

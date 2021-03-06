// export const APP_URL = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'
export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

export const UPLOAD_URL = process.env.NEXT_UPLOAD_URL || `${API_URL}/upload`;

export const createImgUrl = (url) => {
  return `${API_URL}${url}`;
};

// export const getAgentThumbnail = (agent) => {
//   if (agent.photo === null)
//     // return createImgUrl("/uploads/thumbnail_Empty_avatar_b19f97e300.jpg");
//     return "";

//   const thumbnail_url = agent.photo.formats.thumbnail.url;
//   return createImgUrl(thumbnail_url);
// };

export const getThumbnail = (image) => {
  if (image === null || image === undefined) return "";
  if (image.formats === null || image.formats === undefined) return "";

  const thumbnail_url = image.formats.thumbnail.url;
  return createImgUrl(thumbnail_url);
};

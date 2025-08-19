import baseUrl from "./baseUrls";
export const handleImageUpload = async (file, token) => {
  const url = `${baseUrl}/api/users/upload`;

  const body = new FormData();
  body.append("file", file);

  console.log("Check body", body);
  const response = await fetch(url, {
    method: "POST",
    body,
    headers: { Authorization: token },
  });

  if (response.status === 200) {
    const { url } = await response.json();
    return url;
  }
  return "";
};

export const handleImagesUpload = async (files, token, url_api) => {
  const url = url_api;

  const body = new FormData();
  body.append("files", files);
  const response = await fetch(url, {
    method: "POST",
    body,
    headers: { Authorization: token },
  });

  if (response.status === 200) {
    const { url } = await response.json();
    return url;
  }
  return "";
};

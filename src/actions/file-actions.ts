"use server"



export async function uploadFileAndGetUrl(file: File) {
  if (!file) return null
  const fileForm = new FormData();
  fileForm.append("file", file);

  const fileUploadResponse = await fetch("https://api.filedoge.com/upload", {
    method: "POST",
    body: fileForm,
  });

  const fileResponseJson = await fileUploadResponse.json();

  const fileToken = fileResponseJson.token;

  const fileUrl = `http://api.filedoge.com/download/${fileToken}`;

  return fileUrl;
}

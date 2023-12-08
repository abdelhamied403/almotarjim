export const downloadURI = async (uri: string, name?: string) => {
  const file = await fetch(uri);
  const fileBlob = await file.blob();
  const fileUrl = URL.createObjectURL(fileBlob);

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = name || uri.split("/")[uri.split("/").length - 1];
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

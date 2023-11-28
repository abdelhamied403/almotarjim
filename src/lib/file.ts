export const downloadURI = async (uri: string, name: string) => {
  const file = await fetch(import.meta.env.VITE_API_ORIGIN + uri);
  const fileBlob = await file.blob();
  const fileUrl = URL.createObjectURL(fileBlob);

  const link = document.createElement("a");
  link.href = fileUrl;
  link.download = name;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

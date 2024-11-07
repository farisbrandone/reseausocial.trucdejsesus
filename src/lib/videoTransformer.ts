export const videoTransformer = (url: string): string => {
  let dataString = "";
  if (url?.match(/(?:youtu|youtube)(?:\.com|\.be)\/([\w\W]+)/i)) {
    dataString = "";
    if (url?.match(/(?:youtu)(?:\.com|\.be)\/([\w\W]+)/i)) {
      dataString = url.replace(/youtu/i, "youtube");
      const data = dataString.split("/");
      data.splice(data.length - 1, 0, "embed");
      dataString = data.join("/");
      return dataString;
    } else {
      if (url.split("/").includes("shorts")) {
        dataString = url.replace(/shorts/i, "embed");

        return dataString;
      } else {
        let id = url.split("?v=")[1]; //sGbxmsDFVnE

        var embedlink = "https://www.youtube.com/embed/" + id; //www.youtube.com/embed/sGbxmsDFVnE
        return embedlink;
      }
    }
  }
  return url;
};

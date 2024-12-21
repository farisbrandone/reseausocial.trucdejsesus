import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";
const SocialMediaShare = () => {
  const shareUrl = "https://trucdejesus.com/rejoindre";
  const title = "Découvrez ce contenu impressionnant!";
  return (
    <div>
      {" "}
      <h2>Partager sur:</h2>{" "}
      <FacebookShareButton
        url={shareUrl}
        title={title}
        className="share-button"
      >
        {" "}
        <FacebookIcon size={32} round />{" "}
      </FacebookShareButton>{" "}
      <TwitterShareButton url={shareUrl} title={title} className="share-button">
        {" "}
        <TwitterIcon size={32} round />{" "}
      </TwitterShareButton>{" "}
      <LinkedinShareButton
        url={shareUrl}
        title={title}
        summary="Découvrez ce contenu impressionnant!"
        source={shareUrl}
        className="share-button"
      >
        {" "}
        <LinkedinIcon size={32} round />{" "}
      </LinkedinShareButton>{" "}
      <WhatsappShareButton url={shareUrl}>
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </div>
  );
};
export default SocialMediaShare;

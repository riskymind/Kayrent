"use client";

import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  EmailIcon,
} from "react-share";
import { useEffect, useState } from "react";

const ShareButtons = ({ property }) => {
  const [shareUrl, setShareUrl] = useState("");
  const [useNativeShare, setUseNativeShare] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/properties/${property._id}`);

      const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(
        navigator.userAgent
      );

      if (navigator.share && isMobile) {
        setUseNativeShare(true);
      }
    }
  }, [property._id]);

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: property.name,
        text: "Check out this property",
        url: shareUrl,
      });
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("Link copied to clipboard!");
    } catch {
      alert("Failed to copy link.");
    }
  };

  return (
    <>
      <h3 className="text-xl font-bold text-center pt-2 text-black">
        Share This Property:
      </h3>

      <div className="flex gap-3 justify-center pb-5 flex-wrap">
        {useNativeShare ? (
          <button
            onClick={handleNativeShare}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Share via Mobile
          </button>
        ) : (
          <>
            <FacebookShareButton
              url={shareUrl}
              quote={property.name}
              hashtag={`#${property.type.replace(/\s/g, "")}ForRent`}
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TwitterShareButton
              url={shareUrl}
              title={property.name}
              hashtags={[`${property.type.replace(/\s/g, "")}ForRent`]}
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <WhatsappShareButton
              url={shareUrl}
              title={property.name}
              separator=":: "
            >
              <WhatsappIcon size={40} round />
            </WhatsappShareButton>

            <EmailShareButton
              url={shareUrl}
              subject={property.name}
              body={`Check out this property listing: ${shareUrl}`}
            >
              <EmailIcon size={40} round />
            </EmailShareButton>
          </>
        )}

        {/* Always show copy button */}
        <button
          onClick={handleCopyToClipboard}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Copy Link
        </button>
      </div>
    </>
  );
};

export default ShareButtons;

import React, { useState } from 'react'
import PropTypes from 'prop-types'

import ReactTooltip from 'react-tooltip'
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  PocketShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailIcon,
  FacebookIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  PocketIcon,
  RedditIcon,
  TwitterIcon,
  WhatsappIcon,
} from 'react-share'

import ShareIcon from './ShareIcon'

const ShareButtons = ({ description, title, postUrl }) => {
  const [showTooltip, setShowTooltip] = useState(true)

  const handleGetContent = () => {
    return (
      <div>
        <div>Share</div>
        <ul>
          <li>*Copy link button here*</li>
          <li className="flex items-center pb-2">
            <LineShareButton url={postUrl}>
              <LineIcon size={32} round />
            </LineShareButton>
            <div className="pl-2">Share on Line</div>
          </li>
          <li className="flex items-center pb-2">
            <WhatsappShareButton url={postUrl}>
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <div className="pl-2">Share on Whatsapp</div>
          </li>
          <li className="flex items-center pb-2">
            <EmailShareButton url={postUrl}>
              <EmailIcon size={32} round />
            </EmailShareButton>
            <div className="pl-2">Email link</div>
          </li>
          <li className="flex items-center pb-2">
            <InstapaperShareButton url={postUrl}>
              <InstapaperIcon size={32} round />
            </InstapaperShareButton>
            <div className="pl-2">Share to Instapaper</div>
          </li>
          <li className="flex items-center pb-2">
            <PocketShareButton url={postUrl}>
              <PocketIcon size={32} round />
            </PocketShareButton>
            <div className="pl-2">Share to Pocket</div>
          </li>
          <li className="flex items-center pb-2">
            <RedditShareButton url={postUrl}>
              <InstapaperIcon size={32} round />
            </RedditShareButton>
            <div className="pl-2">Share on Reddit</div>
          </li>
        </ul>
      </div>
    )
  }

  // TODO do we need FB developer app id?
  return (
    <div className="flex justify-between w-40">
      <FacebookShareButton url={postUrl}>
        <FacebookIcon size={32} round />
      </FacebookShareButton>
      <TwitterShareButton url={postUrl}>
        <TwitterIcon size={32} round />
      </TwitterShareButton>
      <LineShareButton url={postUrl}>
        <LineIcon size={32} round />
      </LineShareButton>
      {showTooltip && (
        <ReactTooltip
          border
          clickable
          effect="solid"
          event="click focus"
          getContent={handleGetContent}
          globalEventOff="click"
          place="bottom"
          type="light"
        />
      )}
      <div data-tip="share tooltip">
        <ShareIcon />
      </div>
    </div>
  )
}

export default ShareButtons

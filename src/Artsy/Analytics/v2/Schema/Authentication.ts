import { ContextModule } from "./ContextModule"

/*
 * Shared schema for authentication events
 */

/*
 * the component where the modal was triggered.
 */
export type AuthContextModule =
  | ContextModule.aboutTheWork
  | ContextModule.artistHeader
  | ContextModule.artistsToFollowRail
  | ContextModule.artworkGrid
  | ContextModule.artworkSidebar
  | ContextModule.auctionInfo
  | ContextModule.auctionRail
  | ContextModule.auctionResults
  | ContextModule.auctionsInfo
  | ContextModule.bannerPopUp
  | ContextModule.categoryRail
  | ContextModule.collectionDescription
  | ContextModule.consignSubmissionFlow
  | ContextModule.featuredArtistsRail
  | ContextModule.footer
  | ContextModule.header
  | ContextModule.intextTooltip
  | ContextModule.mainCarousel
  | ContextModule.otherWorksByArtistRail
  | ContextModule.otherWorksByGalleryRail
  | ContextModule.popUpModal
  | ContextModule.relatedArtistsRail
  | ContextModule.relatedWorksRail
  | ContextModule.saveWorksCTA
  | ContextModule.worksByPopularArtistsRail
  | ContextModule.worksForSaleRail

/**
 * the type of modal to display.
 */
export enum AuthModalType {
  forgot = "forgot",
  login = "login",
  signup = "signup",
}

/**
 * the action taken that prompted user to signup or login.
 */
export enum AuthIntent {
  bid = "bid",
  buyNow = "buyNow",
  consign = "consign",
  followArtist = "followArtist",
  followGallery = "followGallery",
  followGene = "followGene",
  forgot = "forgot",
  inquire = "inquire",
  login = "login",
  loginToSeeEstimate = "loginToSeeEstimate",
  loginToSeePrice = "loginToSeePrice",
  loginToSeeRealizedPrice = "loginToSeeRealizedPrice",
  makeOffer = "makeOffer",
  registerToBid = "registerToBid",
  requestConditionReport = "requestConditionReport",
  saveArtwork = "saveArtwork",
  signup = "signup",
  viewAuctionResults = "viewAuctionResults",
  viewEditorial = "viewEditorial",
}

/**
 * the type of action that opened the modal
 */
export type AuthTrigger = "click" | "timed"

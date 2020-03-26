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
  | ContextModule.auctionRail
  | ContextModule.auctionResults
  | ContextModule.categoryRail
  | ContextModule.collectionDescription
  | ContextModule.featuredArtistsRail
  | ContextModule.footer
  | ContextModule.header
  | ContextModule.homeBanner
  | ContextModule.intextTooltip
  | ContextModule.otherWorksByArtistRail
  | ContextModule.otherWorksByGalleryRail
  | ContextModule.relatedArtistsRail
  | ContextModule.relatedWorksRail
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

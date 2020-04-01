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
  | ContextModule.artistRecentlySold
  | ContextModule.artistsTab
  | ContextModule.artistsToFollowRail
  | ContextModule.artworkGrid
  | ContextModule.artworkImage
  | ContextModule.artworkSidebar
  | ContextModule.auctionInfo
  | ContextModule.auctionRail
  | ContextModule.auctionResults
  | ContextModule.auctionsInfo
  | ContextModule.bannerPopUp
  | ContextModule.browseFair
  | ContextModule.categoryRail
  | ContextModule.collectionDescription
  | ContextModule.consignSubmissionFlow
  | ContextModule.currentShowsRail
  | ContextModule.fairInfo
  | ContextModule.fairsHeader
  | ContextModule.featuredArtistsRail
  | ContextModule.footer
  | ContextModule.geneHeader
  | ContextModule.header
  | ContextModule.intextTooltip
  | ContextModule.liveAuctionsRail
  | ContextModule.mainCarousel
  | ContextModule.otherWorksByArtistRail
  | ContextModule.otherWorksFromPartnerRail
  | ContextModule.otherWorksFromShowRail
  | ContextModule.otherWorksInAuctionRail
  | ContextModule.partnerHeader
  | ContextModule.pastFairs
  | ContextModule.popUpModal
  | ContextModule.recentlyViewedRail
  | ContextModule.relatedArtistsRail
  | ContextModule.relatedWorksRail
  | ContextModule.saveWorksCTA
  | ContextModule.showHeader
  | ContextModule.showInfo
  | ContextModule.tagHeader
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
  followPartner = "followPartner",
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

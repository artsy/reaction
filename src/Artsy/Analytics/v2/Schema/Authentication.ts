import { ContextModule } from "./ContextModule"

/*
 * Shared schema for authentication events
 */

/*
 * the component where the modal was triggered.
 */
export type AuthContextModule =
  | ContextModule.aboutTheWork
  | ContextModule.artistsToFollowRail
  | ContextModule.artworkGrid
  | ContextModule.auctionRail
  | ContextModule.categoryRail
  | ContextModule.featuredArtistsRail
  | ContextModule.header
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
  login = "login",
  makeOffer = "makeOffer",
  registerToBid = "registerToBid",
  saveArtwork = "saveArtwork",
  signup = "signup",
}

/**
 * the type of action that opened the modal
 */
export type AuthTrigger = "click" | "timed"

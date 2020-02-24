import { ContextModule } from "./ContextModule"
import { Intent } from "./Intent"

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
export type AuthIntent =
  | Intent.bid
  | Intent.buyNow
  | Intent.followArtist
  | Intent.followGallery
  | Intent.followGene
  | Intent.forgot
  | Intent.login
  | Intent.makeOffer
  | Intent.registerToBid
  | Intent.saveArtwork
  | Intent.signup

/**
 * the type of action that opened the modal
 */
export type AuthTrigger = "click" | "timed"

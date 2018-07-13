/**
 * The global tracking-info keys in Artsy’s schema.
 *
 * TODO: This is copied straight over from Emission, this should be centralised
 *       ASAP, but for now try to keep them in sync.
 */
export interface Global {
  /**
   * The name of an event.
   *
   * Options are: Tap, Fail, Success
   *
   * This is unique to a "Track" event, meaning a "screen view" in Segment does not have this
   * This is how we distinguish the two type of events in Eigen
   * Track data inherits the screen view (called "context_screen") properties
   *
   * NOTE: In the old Force schema, this was the event name.
   */
  action_type: ActionTypes

  /**
   * The discription of an event
   *
   * E.g. Conversation artwork attachment tapped
   *
   * NOTE: In the old Force schema, this was the `label` field.
   */
  action_name: ActionNames

  /**
   * OPTIONAL: Additional properties of the action
   */
  additional_properties?: object

  /*****************************************************************************
   * Old schema
   *
   * TODO: Figure out if any of these should actually have new names in the new
   *       schema.
   ****************************************************************************/

  type: string
  context_module?: string
}

// export interface GlobalOld {
//   type: "Link" | "thumbnail" | "dismiss"
//   label?: string
//   // TODO: If this were a union of whole payload types, then this wouldn’t need
//   //       to be optional in case of e.g. a Link
//   destination_path?: string
//   context_module: string
// }

// export interface Artist extends Global {
//   context_module: "carousel" | "Artist header"
//   tab?: string
// }

export interface Link extends Global {
  type: "Link"
  destination_path: string
}

export interface ArtistTabs extends Link {
  // TODO Use enum defined in tabs component?
  tab: string
}

// TODO Rename once this file is split up
export type ActionableTypes = Global | Link | ArtistTabs

export interface PageView {
  /**
   * The root container component should specify this as the screen context.
   */
  context_screen: PageNames

  /**
   * The public slug for the entity that owns this page (e.g. for the Artist page)
   */
  context_screen_owner_slug?: string

  /**
   * The ID of the entity in its database. E.g. the Mongo ID for entities that reside in Gravity.
   *
   * OPTIONAL: This may not always be available before the relay call for props has been made
   */
  context_screen_owner_id?: string

  /**
   * The type of entity (owner), E.g. Artist, Artwork, etc.
   */
  context_screen_owner_type: OwnerEntityTypes
}

export enum ActionTypes {
  /**
   * User actions
   *
   * TODO: Check if Emission’s ‘tap’ and this can be combined.
   */
  // Tap = "tap",
  Click = "Click",

  /**
   * Events / results
   */
  Fail = "fail",
  Success = "success",
}

/**
 * Action event discriptors / names
 */
export enum ActionNames {
  /**
   * Artist Page Events
   */
  ArtistAbout = "artistAbout",
  ArtistFollow = "artistFollow",
  ArtistUnfollow = "artistUnfollow",
  ArtistWorks = "artistWorks",
  ArtistShows = "artistShows",
  ArtistTab = "Clicked artist page tab", // TODO: Old schema
  ArtistCarousel = "Clicked artist page carousel image", // TODO: Old schema

  /**
   * Gene Page Events
   */
  GeneAbout = "geneAbout",
  GeneFollow = "geneFollow",
  GeneUnfollow = "geneUnfollow",
  GeneWorks = "geneWorks",
  Refine = "geneRefine",

  /**
   * Home page events
   */
  HomeArtistRailFollow = "homeArtistRailFollow",
  HomeArtistArtworksBlockFollow = "homeArtistArtworksBlockFollow",

  /**
   * Conversations / Inbox / Messaging Events
   */
  ConversationSelected = "conversationSelected",
  ConversationSendReply = "conversationSendReply",
  ConversationAttachmentShow = "conversationAttachmentShow",
  ConversationAttachmentArtwork = "conversationAttachmentArtwork",
  ConversationAttachmentInvoice = "conversationAttachmentInvoice",
  ConversationLink = "conversationLinkUsed",
  InquiryCancel = "inquiryCancel",
  InquirySend = "inquirySend",

  /**
   *  Saves And Follows Events
   */
  SavesAndFollowsWorks = "savesAndFollowsWorks",
  SavesAndFollowsArtists = "savesAndFollowsArtists",
  SavesAndFollowsCategories = "savesAndFollowsCategories",

  /**
   *  Consignment flow
   */
  ConsignmentDraftCreated = "consignmentDraftCreated",
  ConsignmentSubmitted = "consignmentSubmitted",
  ConsignmentInterest = "Interested in selling a work learn more", // TODO: Old schema

  /**
   * Bid flow
   */
  BidFlowAddBillingAddress = "addBillingAddress",
  BidFlowPlaceBid = "placeBid",
  BidFlowSaveBillingAddress = "saveBillingAddress",

  /**
   * Generic
   */
  ReadMoreExpanded = "readMoreExpanded", // TODO: This differs from old event
  InSale = "In current auction", // TODO: Old schema
  InShow = "In featured show", // TODO: Old schema
}

export enum OwnerEntityTypes {
  Artist = "Artist",
  Artwork = "Artwork",
  Conversation = "Conversation",
  Gene = "Gene",
  Show = "Show",
  Invoice = "Invoice",
  Consignment = "ConsignmentSubmission",
}

export enum PageNames {
  ArtistPage = "Artist",
  BidFlowMaxBidPage = "YourMaxBid",
  BidFlowConfirmBidPage = "ConfirmYourBid",
  BidFlowBillingAddressPage = "YourBillingAddress",
  BidFlowRegistration = "Registration",
  BidFlowRegistrationResultConfirmed = "RegistrationConfirmed",
  BidFlowRegistrationResultPending = "RegistrationPending",
  BidFlowRegistrationResultError = "RegistrationError",
  ConversationPage = "Conversation",
  ConsignmentsWelcome = "ConsignmentsWelcome",
  ConsignmentsOverView = "ConsignmentsOverview",
  ConsignmentsSubmission = "ConsignmentsSubmit",
  GenePage = "Gene",
  InboxPage = "Inbox",
  InquiryPage = "Inquiry",
  HomeArtistsWorksForYou = "HomeArtistsWorksForYou",
  HomeForYou = "HomeForYou",
  HomeAuctions = "HomeAuctions",
  SavesAndFollows = "SavesAndFollows",
}

/**
 * Pages that the user can view.
 */
export enum PageName {
  ArticlePage = "Article",
  ArtistPage = "Artist",
  ArtworkPage = "Artwork page",
}

/**
 * An entity in the data model that has an ownership relationship to the entity
 * being described, be it a straightforward model such as ‘Artist’ or a more
 * conceptual one like a ‘Consignment Submission’
 *
 * @see {Result.owner}
 * @see {PageView.owner}
 */
export enum OwnerType {
  Article = "Article",
  Artist = "Artist",
  Artwork = "Artwork",
  Consignment = "ConsignmentSubmission",
  Conversation = "Conversation",
  Gene = "Gene",
  Invoice = "Invoice",
  Partner = "Partner",
  Show = "Show",
}

/**
 * User actions, which can be active or passive ones.
 *
 * TODO: Distinguishing between Click and Tap is a little confusing. Do we always
 *       use Click on Force or do we use Tap when browsing from a mobile device?
 */
export enum ActionType {
  /**
   * A click on a UI element using a mouse-like input device.
   *
   * TODO: Check if ‘Tap’ and this can be combined.
   */
  Click = "Click",

  /**
   * A click on 'Buy Now' or 'Make offer' buttons.
   */
  ClickedBuyNow = "Clicked buy now",
  ClickedMakeOffer = "Clicked make offer",
  ClickedContactGallery = 'Clicked "Contact Gallery"',
  ClickedBid = 'Clicked "Bid"',

  /**
   * Triggers a pageview in force, skips segment
   */
  ClickedReadMore = "Clicked read more",

  /**
   * A/B Test Experiments
   */
  ExperimentViewed = "Experiment Viewed",

  /**
   * Moving the mouse pointer over a UI element or, when browsing on a mobile
   * device, by first tapping the UI element once making it switch into
   * continuous hover mode.
   */
  Hover = "Hover",

  /**
   * A UI element was rendered in the viewport
   */
  Impression = "Impression",
  AuthImpression = "Auth impression",

  /**
   * A UI element that links out to another location
   */
  Link = "Link",

  /**
   * A tap on a UI element using a finger-like input device.
   *
   * TODO: Check if ‘Click’ and this can be combined.
   */
  Tap = "Tap",

  /**
   * BNMO
   */
  SubmittedOrder = "submitted_order",
  SubmittedOffer = "submitted_offer",
  SubmittedCounterOffer = "submitted_counter_offer",
  ViewedProduct = "Viewed Product",
}

/**
 * The identifier that ties an interaction to a result.
 */
export enum ActionName {
  /**
   * Artist Page
   */
  ArtistFollow = "artistFollow",
  ArtistUnfollow = "artistUnfollow",
  ArtworkAboutTheWork = "Artwork about the work",

  /**
   * Authentication
   */
  ViewEditorial = "viewed editorial",
  Dismiss = "dismiss",
  EmailNextButton = "emailNextButton",
  PasswordNextButton = "passwordNextButton",

  /**
   * Gene Page
   */
  GeneFollow = "geneFollow",
  GeneUnfollow = "geneUnfollow",

  /**
   * Home page events
   */
  HomeArtistRailFollow = "homeArtistRailFollow",
  HomeArtistArtworksBlockFollow = "homeArtistArtworksBlockFollow",

  /**
   * Conversations / Inbox / Messaging
   */
  ConversationSendReply = "conversationSendReply",
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

/**
 * Identifier of content that was interacted with
 */
export enum Subject {
  /*
  * Articles
  * TODO: Old schema
  */
  FurtherReading = "Further reading",
  ReadMore = "Read more",
  RelatedArticles = "Related articles",

  /**
   * Buy now checkout flow
   */
  BNMOAskSpecialist = "ask a specialist",
  BNMOReadFAQ = "read faq",
  BNMOProvideShipping = "provide shipping address",
  BNMOArrangePickup = "arrange for pickup",
  BNMOUseShippingAddress = "use shipping address",

  AuctionConditionsOfSale = "conditions of sale",
  AuctionFAQ = "auction faq",
  AuctionAskSpecialist = "ask a specialist",
  AuctionBuyerPremium = "Buyer premium",

  CollectorFAQ = "collector faq",

  ConsignLearnMore = "learn more",

  // Artwork Page
  Classification = "Classification info",
  ContactGallery = "Contact Gallery",
  EnterLiveAuction = "Enter live auction",
}

/**
 * Identifier of a conceptual module on the page.
 */
export enum ContextModule {
  Header = "Header",
  NavigationTabs = "NavigationTabs",
  RecentlyViewedArtworks = "recently_viewed_artworks",

  /**
   * Artist page
   */
  AboutTheWork = "About the work",
  AboutTheWorkPartner = "About the Work (Partner)",
  ArtistOverview = "ArtistOverview",
  ArtistBio = "ArtistBio",
  ArtistInsights = "ArtistInsights",
  Biography = "Biography",
  Sidebar = "Sidebar",

  /**
   * Artwork page
   */
  ArtworkTabs = "Artwork tabs",
  OtherWorksByArtist = "Other works by artist",
  OtherWorksInAuction = "Other works in auction",
  OtherWorksInFair = "Other works in fair",
  OtherWorksFromGallery = "Other works from gallery",
  OtherWorksFromShow = "Other works from show",
  RelatedArtists = "RelatedArtists",
  RelatedWorks = "RelatedWorks",
  ShareButton = "Share button",
  Zoom = "Zoom",

  /*
  * Articles
  * TODO: Old schema
  */
  FurtherReading = "Further reading",
  ReadMore = "Read more",
  RelatedArticles = "Related articles",

  /**
   * Authentication modal
   */
  MinimalCtaBanner = "MinimalCtaBanner",

  /**
   * Buy Now Make Offer ("Works For You")
   */
  BNMOBanner = "BNMO Banner",

  /**
   * Collection page
   */
  CollectionDescription = "CollectionDescription",
}

export enum Flow {
  ArtworkAboutTheWork = "Artwork about the work",
  ArtworkAboutTheArtist = "Artwork about the artist",
  ArtworkShare = "Artwork share",
  ArtworkZoom = "Artwork zoom",
  Auctions = "Auctions",
  BuyNow = "Buy now",
  MakeOffer = "Make offer",
}

export enum Label {
  AboutTheWork = "about_the_work",
  Articles = "articles",
  Biography = "biography",
  ExhibitionHighlights = "exhibition_highlights",
  ReadMore = "ReadMore",
}

export enum Type {
  ArtistCard = "Artist card",
  ArtworkBrick = "Artwork brick",
  Button = "Button",
  Link = "Link",
  Tab = "Tab",
  Thumbnail = "thumbnail",
}

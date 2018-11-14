import Article from "./article"
import Articles from "./articles"
import Artist from "./artist"
import Artists from "./artists"
import PopularArtists from "./artists/popular"
import TrendingArtists from "./artists/trending"
import Artwork from "./artwork"
import Artworks from "./artworks"
import { City } from "./city"
import Collection from "./collection"
import { CreditCard } from "./credit_card"
import { ApproveOrderMutation } from "./ecommerce/approve_order_mutation"
import { ConfirmPickupMutation } from "./ecommerce/confirm_pickup_mutation"
import { CreateOfferOrderWithArtworkMutation } from "./ecommerce/create_offer_order_with_artwork_mutation"
import { CreateOrderWithArtworkMutation } from "./ecommerce/create_order_with_artwork_mutation"
import { FulfillOrderAtOnceMutation } from "./ecommerce/fulfill_order_at_once_mutation"
import { Order } from "./ecommerce/order"
import { Orders } from "./ecommerce/orders"
import { RejectOrderMutation } from "./ecommerce/reject_order_mutation"
import { SetOrderPaymentMutation } from "./ecommerce/set_order_payment_mutation"
import { SetOrderShippingMutation } from "./ecommerce/set_order_shipping_mutation"
import { SubmitOrderMutation } from "./ecommerce/submit_order_mutation"
import ExternalPartner from "./external_partner"
import Fair from "./fair"
import Fairs from "./fairs"
import filterArtworks from "./filter_artworks"
import FilterPartners from "./filter_partners"
import FilterSaleArtworks from "./filter_sale_artworks"
import Gene from "./gene"
import GeneFamilies from "./gene_families"
import GeneFamily from "./gene_family"
import Genes from "./genes"
import HomePage from "./home"
import MatchArtist from "./match/artist"
import MatchGene from "./match/gene"
import Me from "./me"
import FollowArtist from "./me/follow_artist"
import FollowGene from "./me/follow_gene"
import FollowProfile from "./me/follow_profile"
import OrderedSet from "./ordered_set"
import OrderedSets from "./ordered_sets"
import Partner from "./partner"
import PartnerCategories from "./partner_categories"
import PartnerCategory from "./partner_category"
import PartnerShow from "./partner_show"
import PartnerShows from "./partner_shows"
import Partners from "./partners"
import Profile from "./profile"
import Sale from "./sale/index"
import SaleArtwork from "./sale_artwork"
import SaleArtworks from "./sale_artworks"
import Sales from "./sales"
import Services from "./services"
import Show from "./show"
import Status from "./status"
import SuggestedGenes from "./suggested_genes"
import System from "./system"
import Tag from "./tag"
import { UserByEmail } from "./user"
import Users from "./users"

import CreateAssetRequestLoader from "./asset_uploads/create_asset_request_mutation"
import CreateGeminiEntryForAsset from "./asset_uploads/finalize_asset_mutation"
import { BidderPositionMutation } from "./me/bidder_position_mutation"
import AddAssetToConsignmentSubmission from "./me/consignments/add_asset_to_submission_mutation"
import CreateSubmissionMutation from "./me/consignments/create_submission_mutation"
import UpdateSubmissionMutation from "./me/consignments/update_submission_mutation"
import SendConversationMessageMutation from "./me/conversation/send_message_mutation"
import UpdateConversationMutation from "./me/conversation/update_conversation_mutation"
import createBidderMutation from "./me/create_bidder_mutation"
import createCreditCardMutation from "./me/create_credit_card_mutation"
import { deleteCreditCardMutation } from "./me/delete_credit_card_mutation"
import SaveArtworkMutation from "./me/save_artwork_mutation"
import UpdateCollectorProfile from "./me/update_collector_profile"
import UpdateMyUserProfileMutation from "./me/update_me_mutation"
import { endSaleMutation } from "./sale/end_sale_mutation"

import { GraphQLObjectType, GraphQLSchema } from "graphql"
import CausalityJWT from "./causality_jwt"
import ObjectIdentification from "./object_identification"

import config from "config"
import { InitialOfferMutation } from "./ecommerce/initial_offer_mutation"
const { ENABLE_CONSIGNMENTS_STITCHING, ENABLE_ECOMMERCE_STITCHING } = config

// TODO: Remove this any
const rootFields: any = {
  article: Article,
  articles: Articles,
  artwork: Artwork,
  artworks: Artworks,
  artist: Artist,
  artists: Artists,
  causality_jwt: CausalityJWT,
  city: City,
  collection: Collection,
  credit_card: CreditCard,
  external_partner: ExternalPartner,
  fair: Fair,
  fairs: Fairs,
  filter_partners: FilterPartners,
  filter_artworks: filterArtworks(),
  filter_sale_artworks: FilterSaleArtworks,
  gene: Gene,
  genes: Genes,
  suggested_genes: SuggestedGenes,
  gene_families: GeneFamilies,
  gene_family: GeneFamily,
  home_page: HomePage,
  match_artist: MatchArtist,
  match_gene: MatchGene,
  me: Me,
  node: ObjectIdentification.NodeField,
  ordered_set: OrderedSet,
  ordered_sets: OrderedSets,
  partner: Partner,
  partner_categories: PartnerCategories,
  partner_category: PartnerCategory,
  partner_show: PartnerShow,
  partner_shows: PartnerShows,
  partners: Partners,
  profile: Profile,
  sale: Sale,
  sale_artwork: SaleArtwork,
  sale_artworks: SaleArtworks,
  sales: Sales,
  services: Services,
  show: Show,
  status: Status,
  system: System,
  tag: Tag,
  trending_artists: TrendingArtists,
  user: UserByEmail,
  users: Users,
  popular_artists: PopularArtists,
}

const ViewerType = new GraphQLObjectType({
  name: "Viewer",
  description: "A wildcard used to support complex root queries in Relay",
  fields: rootFields,
})

const Viewer = {
  type: ViewerType,
  description: "A wildcard used to support complex root queries in Relay",
  resolve: x => x,
}

// A set of fields which are overridden when coming in from stitching
const stitchedRootFields: any = {}

// If you're using stitching then we _don't_ want to include particular mutations
// which come from the stitching instead of our manual version
const stitchedMutations: any = {}

if (!ENABLE_CONSIGNMENTS_STITCHING) {
  stitchedMutations.createConsignmentSubmission = CreateSubmissionMutation
  stitchedMutations.updateConsignmentSubmission = UpdateSubmissionMutation
  stitchedMutations.addAssetToConsignmentSubmission = AddAssetToConsignmentSubmission
}

if (!ENABLE_ECOMMERCE_STITCHING) {
  // Deprecated
  stitchedRootFields.order = Order
  stitchedRootFields.orders = Orders

  stitchedRootFields.ecommerceOrder = Order
  stitchedRootFields.ecommerceOrders = Orders

  // Deprecated
  stitchedMutations.createOrderWithArtwork = CreateOrderWithArtworkMutation
  stitchedMutations.setOrderShipping = SetOrderShippingMutation
  stitchedMutations.setOrderPayment = SetOrderPaymentMutation
  stitchedMutations.approveOrder = ApproveOrderMutation
  stitchedMutations.fulfillOrderAtOnce = FulfillOrderAtOnceMutation
  // stitchedMutations.confirmPickup = ConfirmPickupMutation
  stitchedMutations.rejectOrder = RejectOrderMutation
  stitchedMutations.submitOrder = SubmitOrderMutation

  stitchedMutations.ecommerceCreateOrderWithArtwork = CreateOrderWithArtworkMutation
  stitchedMutations.ecommerceCreateOfferOrderWithArtwork = CreateOfferOrderWithArtworkMutation
  stitchedMutations.ecommerceSetOrderShipping = SetOrderShippingMutation
  stitchedMutations.ecommerceSetOrderPayment = SetOrderPaymentMutation
  stitchedMutations.ecommerceApproveOrder = ApproveOrderMutation
  stitchedMutations.ecommerceConfirmPickup = ConfirmPickupMutation
  stitchedMutations.ecommerceFulfillOrderAtOnce = FulfillOrderAtOnceMutation
  stitchedMutations.ecommerceRejectOrder = RejectOrderMutation
  stitchedMutations.ecommerceSubmitOrder = SubmitOrderMutation
  stitchedMutations.ecommerceInitialOffer = InitialOfferMutation
}

export default new GraphQLSchema({
  allowedLegacyNames: ["__id"],
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
      createBidder: createBidderMutation,
      createBidderPosition: BidderPositionMutation,
      createCreditCard: createCreditCardMutation,
      deleteCreditCard: deleteCreditCardMutation,
      followArtist: FollowArtist,
      followProfile: FollowProfile,
      followGene: FollowGene,
      updateCollectorProfile: UpdateCollectorProfile,
      updateMyUserProfile: UpdateMyUserProfileMutation,
      updateConversation: UpdateConversationMutation,
      sendConversationMessage: SendConversationMessageMutation,
      saveArtwork: SaveArtworkMutation,
      endSale: endSaleMutation,
      requestCredentialsForAssetUpload: CreateAssetRequestLoader,
      createGeminiEntryForAsset: CreateGeminiEntryForAsset,
      ...stitchedMutations,
    },
  }),
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      ...rootFields,
      ...stitchedRootFields,
      viewer: Viewer,
    },
  }),
})

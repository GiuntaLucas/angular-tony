import { BaseResponse } from "../interfaces/BaseResponse"
import { Link, LinkCategoryLight, LinkCategoryFull } from "../interfaces/Link"

export interface LinkForm {
  businessId?: number
  name: string
  description: string
  url: string
}

export interface LinkCategoryForm {
  name: string
  description: string
}

// Responses :
export interface GetAllLinksResponse extends BaseResponse {
  linksList: Link[]
}
export interface GetAllLinkCategoriesResponse extends BaseResponse {
  linkCategories: LinkCategoryLight[]
}
export interface GetLinksByCategoryResponse extends BaseResponse {
  linksListByCategory: Link[]
}
export interface GetOneLinkDetailsResponse extends BaseResponse {
  link: Link
}
export interface GetOneLinkCategoryDetailsResponse extends BaseResponse {
  linkCategory: LinkCategoryFull
}
export interface CreateLinkResponse extends BaseResponse {
  link: Link
}

export interface getLinkCategoriesCheckBoxesResponse extends BaseResponse {
  linkCategoriesCheckBoxes: LinkCategoryLight[]
}
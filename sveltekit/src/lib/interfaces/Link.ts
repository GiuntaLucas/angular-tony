export class Link {
  businessId: number = 0
  name: string = ''
  description: string = ''
  url: string = ''
  created: Date = new Date()
  createdBy: string = ''
  modified: Date = new Date()
  modifiedBy: string = ''
}
export class LinkCategoryLight {
  businessId: number = 0
  name: string = ''
}
export class LinkCategoryFull {
  businessId: number = 0
  name: string = ''
  description: string = ''
  created: Date = new Date()
  createdBy: string = ''
  modified: Date = new Date()
  modifiedBy: string = ''
}
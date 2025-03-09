export interface EmailMessage {
  subject: string
  text?: string
  html?: string
}

export interface EmailDeliveryInfo {
  accepted?: string[]
  messageId?: string
}
export interface EmailDelivery {
  error?: string
  attempts?: number
  startTime?: Date
  endTime?: Date
  leaseExpireTime?: Date
  state?: 'SUCCESS' | 'ERROR' | 'PENDING'
  info?: EmailDeliveryInfo
}

// export type EmailTemplate = EmailTemplateApproval

export type EmailTemplate = {
  name: 'ticket-confirmation' | 'ticket-cancelled'
  data?: EmailTemplateDataTicketInfo
}
export interface EmailTemplateDataTicketInfo {
  id: string
  status: string
  name: string
  number: string
  route: string
  company: string
  departure: string
  departureReturn: string
  image: string
  total: string
}

export interface Email {
  to: string[]
  message?: EmailMessage
  delivery?: EmailDelivery
  template?: EmailTemplate
}
// function assertFields(obj: Email): asserts obj is Required<Email> {
//   if (obj.fieldA && !obj.fieldB) {
//     throw new Error("fieldB is required when fieldA is present");
//   }
//   if (obj.fieldB && !obj.fieldA) {
//     throw new Error("fieldA is required when fieldB is present");
//   }
// }

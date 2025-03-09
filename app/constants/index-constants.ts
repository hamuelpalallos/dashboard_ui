// USER ROLES

export const USER_BASE_PAGE: { [key in UserRole | '']: string } = {
  'company-admin': '/admin',
  'port-admin': '/admin-port',
  'super-admin': '/',
  'port-conductor': '/conductor',
  'guest': '/guest',
  '': '/',
  'admin': '/',
  'port-inspector': '/'
}
export const DEV_USER_ID: string = 'UMOzG1YFeeaUzG0dAfKRcRcir0y1'
export const DEV_USER_EMAIL: string = 'hamuelpalallos@gmail.com'
export const MAAYO_SHIPPING_ID: string = '0-maayo-shipping-inc'
export const OCEAN_JET_ID: string = '02-ocean-jet'
export const AUTH_LOGIN_PATH: string = '/login'
// const x: MiddlewareKey = 'admin'

export type RoleKey = UserRole | string

export const USER_INDEX_PAGE: { [key in UserRole]: string } = {
  'company-admin': `${USER_BASE_PAGE['company-admin']}/dashboards/trips`,
  'port-admin': `${USER_BASE_PAGE['port-admin']}/`,
  'super-admin': '/',
  'port-conductor': '/conductor',
  'guest': '/guest',
  'admin': '/',
  'port-inspector': '/conductor'
}

export type UserCollapseConfig = {
  [key in UserRole]: TairoCollapse
}
export type UserSidebarConfig = {
  [key in UserRole]: TairoSidebar
}

export function useIcon(iconCategory: 'hero' | 'ph' = 'hero') {
  const ph = {
    company: 'ph:buildings-duotone',
    trip: 'ph:rocket-launch-duotone',
    ticket: 'ph:ticket-duotone',
    account: 'ph:user-circle-duotone',
    user: 'ph:user-duotone',
    conductor: 'ph:user-focus-duotone',
    dashboard: 'ph:sidebar-duotone',
    car: 'ph:car-profile-duotone',
    vehicle: 'ph:car-profile-duotone',
    category: 'ph:bounding-box-duotone',
    conveyance: 'ph:boat-duotone',
    passenger: 'ph:person-duotone',
    customize: 'ph:drop-half-bottom-duotone',
    record: 'ph:database-duotone',
    maintenance: 'ph:magic-wand-duotone',
    route: 'ph:arrows-left-right-duotone',
    port: 'ph:anchor-simple-duotone',
    users: 'ph:users-three-duotone',
    profile: 'ph:circles-four-duotone',
    report: 'ph:projector-screen-chart-duotone',
    statistics: 'ph:chart-bar-duotone',
    sales: 'ph:chart-line-up-duotone',
    check_circle: 'ph:check-circle-duotone',
    edit: 'ph:pencil-duotone',
    pen: 'ph:pencil-duotone',
    email: 'ph:envelope-duotone',
    location: 'ph:map-pin-duotone',
    close: 'ph:x-circle-duotone',
    x_circle: 'ph:x-circle-duotone',
    calendar: 'ph:calendar-blank-duotone',
    trash: 'ph:trash-duotone',
    plus_circle: 'ph:plus-circle-duotone',
    minus_circle: 'ph:minus-circle-duotone',
    plus: 'ph:plus',
    add: 'ph:plus',
    print: 'ph:printer-duotone',
    pdf: 'ph:file-pdf-duotone',
    paper: 'ph:file-text-duotone',
    enabled: 'ph:check-circle-duotone',
    phone: 'ph:phone-duotone',
    web: 'ph:globe-simple-duotone',
    x: 'ph:x-duotone',
    notice: 'ph:exclamation-mark-duotone',
    cancel: 'ph:x-circle-duotone',
    type: 'ph:stack-duotone',
    exclamation: 'ph:exclamation-mark-duotone',
    passenger_type: (type?: PassengerType) => {
      const name = type?.name?.toLowerCase()
      if (name === 'student') {
        return 'ph:student-duotone'
      } else if (name === 'senior') {
        return 'material-symbols:elderly-rounded'
      } else if ((type?.class?.ageRange?.max ?? 0) < 3) {
        return 'ic:twotone-child-friendly'
      } else if ((type?.class?.ageRange?.max ?? 0) < 10) {
        return 'ic:twotone-child-care'
      } else {
        return 'ph:person-duotone'
      }
    }
  }
  const hero = {
    company: 'i-heroicons-building-office-2',
    trip: 'i-heroicons-rocket-launch',
    ticket: 'i-heroicons-ticket',
    // account: 'i-heroicons-user-circle',
    profile: 'i-heroicons-user-circle',
    user: 'i-heroicons-user',
    inspector: 'i-heroicons-identification',
    conductor: 'i-heroicons-viewfinder-circle',
    vehicle: 'i-heroicons-truck',
    passenger: 'i-heroicons-users',
    dashboard: 'i-heroicons-window',
    category: 'i-heroicons-squares-2x2',
    record: 'i-heroicons-table-cells',
    customize: 'i-heroicons-fire',
    route: 'i-heroicons-map',
    port: 'i-heroicons-map-pin',
    location: 'i-heroicons-map-pin',
    close: 'i-heroicons-x-mark',
    users: 'i-heroicons-user-group',
    plus: 'i-heroicons-plus',
    minus: 'i-heroicons-minus',
    phone: 'i-heroicons-phone',
    qr: 'i-heroicons-qr-code',
    print: 'i-heroicons-printer',
    delete: 'i-heroicons-trash',
    maintenance: 'i-heroicons-sparkles',
    conveyance: 'i-heroicons-paper-airplane',
    pdf: 'i-heroicons-document-text',
    excel: 'i-heroicons-document-chart-bar',
    pen: 'i-heroicons-pencil',
    email: 'i-heroicons-envelope',
    calendar: 'i-heroicons-calendar',
    sales: 'i-heroicons-chart-bar-square',
    report: 'i-heroicons-chart-pie',
    statistics: 'i-heroicons-chart-bar',
    paper: 'i-heroicons-document',
    web: 'i-heroicons-globe-alt',
    cog: 'i-heroicons-cog-8-tooth',
    type: 'i-heroicons-square-2-stack',
    swatch: 'i-heroicons-swatch',
    archive: 'i-heroicons-archive-box',
    inbox: 'i-heroicons-inbox',
    notice: 'i-heroicons-exclamation-circle',
    footprint: 'i-heroicons-arrows-pointing-out',

    plus_circle: 'i-heroicons-plus-circle',
    minus_circle: 'i-heroicons-minus-circle',
    cancel: 'i-heroicons-x-circle',
    disabled: 'i-heroicons-no-symbol',
    enabled: 'i-heroicons-check-circle',
    check: 'i-heroicons-check',
    check_circle: 'i-heroicons-check-circle',
    exclamation: 'i-heroicons-exclamation-circle',
    x_circle: 'i-heroicons-x-circle',
    x: 'i-heroicons-x-mark',
    key: 'i-heroicons-key',
    sun: 'i-heroicons-sun',
    moon: 'i-heroicons-moon'
  }
  const social = {
    social_facebook: 'fa6-brands:facebook-f',
    social_twitter: 'fa6-brands:twitter',
    social_linkedin: 'fa6-brands:linkedin-in',
    social_x: 'fa6-brands:x-twitter'
  }

  const logos = {
    google: 'fa6-brands:google',
    github: 'fa6-brands:github'
  }
  if (iconCategory === 'ph') {
    return {
      ...ph,
      ...social,
      ...logos
    }
  }

  return {
    ...hero,
    ...social,
    ...logos
  }
}

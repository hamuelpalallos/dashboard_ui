export function usePlaceholder() {
  const image = '/images/icon/placeholder.png'
  const person = '/images/team/placeholder-male.jpg'
  const person_email = '/images/team/placeholder-female.jpg'
  const tripket_ph = '/images/app/tripket-ph-icon.png'
  const tripket_contact: User = {
    id: 'tripket-contact',
    image: tripket_ph,
    name: {
      first: 'Tripket',
      last: 'PH',
    },
    companyData: {
      id: 'tripket',
      role: 'company-admin',
    },
    // email: 'tripket@yahoo.com',
    email: 'support@tripketph.com',
    address: {
      text: '2nd Floor Mat\'s Place, 8894+WR2, Hibbard Ave, Dumaguete, Negros Oriental, Philippines',
    },
    phone: {
      countryCode: '+63',
      countryISOCode: 'PH',
      modular: true,
      // number: '9173003170',
      // text: '+63 917 300 3170',
      number: '9763412190',
      text: '+63 976 341 2190',
    },
  }
  const avatar = (sex?: Sex) => {
    if (sex === 'female')
      return person_email
    return person
  }

  return {
    avatar,
    image,
    person,
    person_email,
    tripket_ph,
    tripket_contact,
  }
}

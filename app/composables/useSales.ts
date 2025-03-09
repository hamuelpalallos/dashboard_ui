export function useSales() {
  // const clientAdminStore = useClientStore()

  // const ports = computed(() => {
  //   return clientAdminStore.ports
  // })

  // const portOptions = computed(() => {
  //   return ports.value.map((port: any) => ({
  //     label: port.name,
  //     value: port.id,
  //   }))
  // })
  const passenger = (items?: Ticket[]): number => {
    if (!items) return 0
    let passengers = TicketInstance.toPassengers(items)
    passengers = passengers.filter((pp) => !pp.type?.free && !pp.ticket?.isFree)
    return passengers.reduce((a, b) => a + (b.type?.classSnapshot?.rate ?? 0), 0)
  }

  const cargo = (items?: Ticket[]): number => {
    if (!items) return 0
    const cargos = TicketInstance.toCargos(items)
    return cargos.reduce((a, b) => a + (b?.type?.classSnapshot?.rate ?? 0), 0)
  }

  const tickets = (items?: Ticket[]): number => {
    if (!items) return 0
    return items.reduce((a, b) => a + (b?.subtotal ?? 0), 0)
  }

  return {
    tickets,
    passenger,
    cargo,
  }
}

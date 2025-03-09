/* eslint-disable sonarjs/no-identical-functions */
import { jsPDF } from 'jspdf'
import autoTable from 'jspdf-autotable'

export function useExport() {
  const format = useFormat()

  const exportManifest = (compound: Trip) => {
    const currentX = 0
    let currentY = 0
    const newLine = (num?: number) => {
      if (num)
        return currentY += num
      else
        return currentY += 6
    }

    const adjustedLongSize = [216, 325]
    const doc = new jsPDF({ orientation: 'p', format: adjustedLongSize })
    doc.setFontSize(12)

    doc.text(format.company(compound.company), 10, newLine(10))
    doc.text('PASSENGER MANIFEST', 10, newLine())
    doc.text(`POINT OF ORIGIN: ${compound.route?.origin?.name}`, 10, newLine())
    doc.text(`NAME OF VESSEL: ${compound.conveyance?.name ?? ''}`, 10, newLine())
    doc.text(`TIME OF DEPARTURE: ${format.time(compound.departure)}`, 10, newLine())
    doc.text(`VOYAGE NO: ${compound.number ?? ''}`, 10, newLine())
    doc.text(`DESTINATION: ${compound.route?.destination?.name}`, 10, newLine())
    doc.text(`DATE: ${format.date(compound.departure)}`, 10, newLine())

    // const generateData = function (amount: number) {
    //   const sex = ['M', 'F']
    //   const result = []

    //   for (let i = 0; i < amount; i += 1) {
    //     const data: any = {
    //       'Name': 'John Doe',
    //       'Age': Math.floor(Math.random() * 100).toString(),
    //       'Sex': sex[Math.floor(Math.random() * sex.length)],
    //       'Nationality': 'Filipino',
    //       'Address': truncate(
    //         'San Miguel, Bacong, Negros Oriental, Philippines',
    //         40,
    //       ),
    //       'Ticket No': '20sdf4e124c8s51 - 1',
    //     }
    //     data.No = (i + 1).toString()
    //     result.push(data)
    //   }
    //   return result
    // }

    // const passengers = generateData(196).map(data => [data["No"], data["Name"], data["Age"], data["Sex"], data["Nationality"], data["Address"], data["Ticket No"]]);
    // const passengers = useMap().passengerListToPDFRows(compound?.passengers ?? [])
    const instance = new TripInstance(compound)
    const passengers: string[][] = instance.toPassengerPDFRows()
    // add index no in the passengers
    const passengersIndexed = passengers.map((passenger, index) => [
      `${index + 1}`, // Convert index to string
      ...passenger,
    ])

    const tempDoc = new jsPDF({ orientation: 'p', format: adjustedLongSize })
    autoTable(tempDoc, {
      startY: newLine(),
      head: [
        ['No', 'Name', 'Age', 'Sex', 'Nationality', 'Address', 'Ticket No'],
      ],
      body: passengersIndexed,
      styles: { fontSize: 8, valign: 'middle', halign: 'center' },
    })
    // totalPages = tempDoc.internal.pages.length

    autoTable(doc, {
      startY: newLine(),
      theme: 'grid',
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      head: [
        ['No', 'Name', 'Age', 'Sex', 'Nationality', 'Address', 'Ticket No'],
      ],
      body: passengersIndexed,
      styles: { fontSize: 8, valign: 'middle', halign: 'center' },
      didDrawCell: (data) => {
        if (
          data.section === 'body'
          && data.row.index === passengers.length - 1
          && data.column.index === data.table.columns.length - 1
        )
          currentY = data.cell.y + data.cell.height + 20 // Update the Y-coordinate after the table
      },
    })

    if (currentY > doc.internal.pageSize.height - 80) {
      // If the table extends beyond a certain point
      doc.addPage() // Add a new page
      currentY = 20 // Reset the Y-coordinate to the top of the new page
    }

    doc.setFontSize(12)
    doc.text(
      'DISTRICT OF ....................................)',
      10,
      newLine(20),
    )
    doc.text('S.S', 90, newLine())
    doc.text(
      'PORT OF ...........................................)',
      10,
      newLine(4),
    )
    doc.text(
      'I, ____________________, master of the ____________________ do solemnly swear or (affirm) that',
      10,
      newLine(20),
    )
    doc.text(
      'foregoing is a full and complete manifest of all passengers taken aboard on the said vessel on its present',
      10,
      newLine(),
    )
    doc.text(
      'voyage, and that all statements contained therein are true and correct to best of my knowledge and',
      10,
      newLine(),
    )
    doc.text('belief.', 10, newLine())
    doc.text('____________________', 155, newLine(10))
    doc.text('MASTER', 170, newLine(5))
    doc.setFontSize(8)
    doc.text('MARITEST 101', 10, newLine(10))

    const totalPages = doc.internal.pages.length - 1
    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      const str = `Page ${i} of ${totalPages}`

      const pageHeight
        = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
      const pageWidth
        = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
      doc.text(str, pageWidth - 25, pageHeight - 4)
    }
    const filename = `PassengerManifest_${compound.route?.destination?.name}_${compound.departure}_${format.time(compound.departure)}.pdf`
    const updatedFilename = filename.replace(/:/g, '_')
    doc.save(updatedFilename)
  }

  const exportCargoManifest = (trip: Trip) => {
    const currentX = 0
    let currentY = 0
    const newLine = (num?: number) => {
      if (num)
        return currentY += num
      else
        return currentY += 7 - 1
    }

    const adjustedLongSize = [216, 325]
    const doc = new jsPDF({ orientation: 'p', format: adjustedLongSize })
    doc.setFontSize(12)

    doc.text(format.company(trip.company), 10, newLine(10))
    doc.text('VEHICLE MANIFEST', 10, newLine())
    doc.text(`POINT OF ORIGIN: ${trip.route?.origin?.name}`, 10, newLine())
    doc.text(`NAME OF VESSEL: ${trip.conveyance?.name ?? ''}`, 10, newLine())
    doc.text(`TIME OF DEPARTURE: ${format.time(trip.departure)}`, 10, newLine())
    doc.text(`VOYAGE NO: ${trip.number ?? ''}`, 10, newLine())
    doc.text(`DESTINATION: ${trip.route?.destination?.name}`, 10, newLine())
    doc.text(`DATE: ${format.date(trip.departure)}`, 10, newLine())

    const instance = new TripInstance(trip)

    const cargos = instance.toCargoPDFRows()
    const cargosIndexed = cargos.map((cargo, index) => [
      `${index + 1}`, // Convert index to string
      ...cargo,
    ])

    autoTable(doc, {
      startY: newLine(),
      theme: 'grid',
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      head: [
        ['No', 'Plate No', 'Type', 'Description', 'Ticket No'],
        // ['No', 'Plate No', 'Type', 'Category', 'Description'],
      ],
      body: cargosIndexed,
      styles: { fontSize: 8, valign: 'middle', halign: 'center' },
      didDrawCell: (data) => {
        if (
          data.section === 'body'
          && data.row.index === cargos.length - 1
          && data.column.index === data.table.columns.length - 1
        )
          currentY = data.cell.y + data.cell.height + 20 // Update the Y-coordinate after the table
      },
    })

    if (currentY > doc.internal.pageSize.height - 80) {
      // If the table extends beyond a certain point
      doc.addPage() // Add a new page
      currentY = 20 // Reset the Y-coordinate to the top of the new page
    }

    doc.setFontSize(12)
    doc.text(
      'DISTRICT OF ....................................)',
      10,
      newLine(20),
    )
    doc.text('S.S', 90, newLine())
    doc.text(
      'PORT OF ...........................................)',
      10,
      newLine(4),
    )
    doc.text(
      'I, ____________________, master of the ____________________ do solemnly swear or (affirm) that',
      10,
      newLine(20),
    )
    doc.text(
      'foregoing is a full and complete manifest of all passengers taken aboard on the said vessel on its present',
      10,
      newLine(),
    )
    doc.text(
      'voyage, and that all statements contained therein are true and correct to best of my knowledge and',
      10,
      newLine(),
    )
    doc.text('belief.', 10, newLine())
    doc.text('____________________', 155, newLine(10))
    doc.text('MASTER', 170, newLine(5))
    doc.setFontSize(8)
    doc.text('MARITEST 101', 10, newLine(10))

    const totalPages = doc.internal.pages.length - 1
    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      const str = `Page ${i} of ${totalPages}`

      const pageHeight
        = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
      const pageWidth
        = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
      doc.text(str, pageWidth - 25, pageHeight - 4)
    }
    const filename = `VehicleManifest_${trip.route?.destination?.name}_${trip.departure}_${format.time(trip.departure)}.pdf`
    const updatedFilename = filename.replace(/:/g, '_')
    doc.save(updatedFilename)
  }

  const exportSales = (compound: SalesCompound) => {
    const currentX = 0
    let currentY = 0
    const newLine = (num?: number) => {
      if (num)
        return currentY += num
      else
        return currentY += 6
    }

    const adjustedLongSize = [216, 325]
    const doc = new jsPDF({ orientation: 'p', format: adjustedLongSize })
    doc.setFontSize(12)

    doc.text(format.company(compound.company), 10, newLine(10))
    doc.text('SALES REPORT', 10, newLine())
    doc.text(`ROUTES: ${format.routes(compound.routes)}`, 10, newLine())
    doc.text(`DATE: ${format.date_setting(compound.dateSetting)}`, 10, newLine())
    console.log('🚀 ~ exportSales ~ compound.routes:', compound.routes)

    // const generateData = function (amount: number) {
    //   const sex = ['M', 'F']
    //   const result = []

    //   for (let i = 0; i < amount; i += 1) {
    //     const data: any = {
    //       'Name': 'John Doe',
    //       'Age': Math.floor(Math.random() * 100).toString(),
    //       'Sex': sex[Math.floor(Math.random() * sex.length)],
    //       'Nationality': 'Filipino',
    //       'Address': truncate(
    //         'San Miguel, Bacong, Negros Oriental, Philippines',
    //         40,
    //       ),
    //       'Ticket No': '20sdf4e124c8s51 - 1',
    //     }
    //     data.No = (i + 1).toString()
    //     result.push(data)
    //   }
    //   return result
    // }

    // const passengers = generateData(196).map(data => [data["No"], data["Name"], data["Age"], data["Sex"], data["Nationality"], data["Address"], data["Ticket No"]]);
    // const passengers = useMap().passengerListToPDFRows(compound?.passengers ?? [])
    // const instances = TicketInstance.toInstances(compound.tickets)
    // const instance = new TripInstance(compound)
    // const passengers: string[][] = instance.toPassengerPDFRows()
    // // add index no in the passengers
    const rows = TicketInstance.toPDFRows(compound.tickets)
    const rowsIndexed = rows.map((r, idx) => [
            `${idx + 1}`,
            ...r,
    ])

    // const numberOfPassengers = compound.tickets.reduce(())
    // count the total number of passengers
    const passengerCount = TicketInstance.passengerCount(compound.tickets)
    const cargoCount = TicketInstance.cargoCount(compound.tickets)

    const headers = TicketInstance.PDFHeaders
    const tempDoc = new jsPDF({ orientation: 'p', format: adjustedLongSize })
    autoTable(tempDoc, {
      startY: newLine(),
      head: [
        ['No', ...headers],
      ],
      body: rowsIndexed,
      styles: { fontSize: 8, valign: 'middle', halign: 'center' },
    })
    // totalPages = tempDoc.internal.pages.length

    autoTable(doc, {
      startY: newLine(),
      theme: 'grid',
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      head: [
        ['No', ...headers],
      ],
      body: rowsIndexed,
      styles: { fontSize: 8, valign: 'middle', halign: 'center' },
      didDrawCell: (data) => {
        if (
          data.section === 'body'
          && data.row.index === rowsIndexed.length - 1
          && data.column.index === data.table.columns.length - 1
        )
          currentY = data.cell.y + data.cell.height + 20 // Update the Y-coordinate after the table
      },
    })

    if (currentY > doc.internal.pageSize.height - 80) {
      // If the table extends beyond a certain point
      doc.addPage() // Add a new page
      currentY = 20 // Reset the Y-coordinate to the top of the new page
    }

    doc.setFontSize(12)

    doc.text(
      `SALES SUMMARY`,
      10,
      newLine(20),
    )
    doc.text(
      // `-------------------------------------------------------------------------------------------------------------------------------------------`,
      `___________________________________________________________________________________`,
      10,
      newLine(2),
    )
    doc.text(
      `NO. OF TICKETS: ${compound.tickets.length.toString()}`,
      10,
      newLine(8),
    )
    doc.text(
      `NO. OF VEHICLES: ${cargoCount.toString()}`,
      10,
      newLine(7),
    )
    doc.text(
      `NO. OF PASSENGERS: ${passengerCount.toString()}`,
      10,
      newLine(7),
    )
    doc.text(
      `TOTAL SALES: ${format.currency_text(compound.total)}`,
      10,
      newLine(7),
    )
    // doc.text(
    //   'PORT OF ...........................................)',
    //   10,
    //   newLine(4),
    // )
    // doc.text(
    //   'I, ____________________, master of the ____________________ do solemnly swear or (affirm) that',
    //   10,
    //   newLine(20),
    // )
    // doc.text(
    //   'foregoing is a full and complete manifest of all passengers taken aboard on the said vessel on its present',
    //   10,
    //   newLine(),
    // )
    // doc.text(
    //   'voyage, and that all statements contained therein are true and correct to best of my knowledge and',
    //   10,
    //   newLine(),
    // )
    // doc.text('belief.', 10, newLine())
    // doc.text('____________________', 155, newLine(10))
    // doc.text('MASTER', 170, newLine(5))
    // doc.setFontSize(8)
    // doc.text('MARITEST 101', 10, newLine(10))

    const totalPages = doc.internal.pages.length - 1
    // Add page numbers
    // generate 4 letter with random numbers code as serial number
    const serialNumber = Math.random().toString(36).substring(2, 6).toUpperCase()
    const serialString = `Serial No: ${serialNumber}`
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      const str = `Page ${i} of ${totalPages}`

      const pageHeight
        = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
      const pageWidth
        = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
      doc.text(str, pageWidth - 25, pageHeight - 4)
      // add the serial number at the bottom of the page same line as the page number but on the left side
      doc.text(serialString, 10, pageHeight - 4)
    }
    const filename = `ShippingCompany_SalesReport_${format.date_setting(compound.dateSetting).replace(/ /g, '_')}.pdf`
    doc.save(filename)
  }

  const exportSalesFee = (compound: SalesCompound) => {
    const currentX = 0
    let currentY = 0
    const newLine = (num?: number) => {
      if (num)
        return currentY += num
      else
        return currentY += 6
    }

    const adjustedLongSize = [216, 325]
    const doc = new jsPDF({ orientation: 'p', format: adjustedLongSize })
    doc.setFontSize(12)

    // doc.text(format.company(compound.company), 10, newLine(10))
    doc.text('TRIPKET PH', 10, newLine(10))
    doc.text('SALES REPORT', 10, newLine())
    doc.text(`ROUTES: ${format.routes(compound.routes)}`, 10, newLine())
    doc.text(`DATE: ${format.date_setting(compound.dateSetting)}`, 10, newLine())
    console.log('🚀 ~ exportSales ~ compound.routes:', compound.routes)

    // const generateData = function (amount: number) {
    //   const sex = ['M', 'F']
    //   const result = []

    //   for (let i = 0; i < amount; i += 1) {
    //     const data: any = {
    //       'Name': 'John Doe',
    //       'Age': Math.floor(Math.random() * 100).toString(),
    //       'Sex': sex[Math.floor(Math.random() * sex.length)],
    //       'Nationality': 'Filipino',
    //       'Address': truncate(
    //         'San Miguel, Bacong, Negros Oriental, Philippines',
    //         40,
    //       ),
    //       'Ticket No': '20sdf4e124c8s51 - 1',
    //     }
    //     data.No = (i + 1).toString()
    //     result.push(data)
    //   }
    //   return result
    // }

    // const passengers = generateData(196).map(data => [data["No"], data["Name"], data["Age"], data["Sex"], data["Nationality"], data["Address"], data["Ticket No"]]);
    // const passengers = useMap().passengerListToPDFRows(compound?.passengers ?? [])
    // const instances = TicketInstance.toInstances(compound.tickets)
    // const instance = new TripInstance(compound)
    // const passengers: string[][] = instance.toPassengerPDFRows()
    // // add index no in the passengers
    const rows = TicketInstance.toPDFFeeRows(compound.tickets)
    const rowsIndexed = rows.map((r, idx) => [
            `${idx + 1}`,
            ...r,
    ])

    // const numberOfPassengers = compound.tickets.reduce(())
    // count the total number of passengers
    const passengerCount = TicketInstance.passengerCount(compound.tickets)
    const cargoCount = TicketInstance.cargoCount(compound.tickets)

    const headers = TicketInstance.PDFFeeHeaders
    const tempDoc = new jsPDF({ orientation: 'p', format: adjustedLongSize })
    autoTable(tempDoc, {
      startY: newLine(),
      head: [
        ['No', ...headers],
      ],
      body: rowsIndexed,
      styles: { fontSize: 8, valign: 'middle', halign: 'center' },
    })
    // totalPages = tempDoc.internal.pages.length

    autoTable(doc, {
      startY: newLine(),
      theme: 'grid',
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      head: [
        ['No', ...headers],
      ],
      body: rowsIndexed,
      styles: { fontSize: 8, valign: 'middle', halign: 'center' },
      didDrawCell: (data) => {
        if (
          data.section === 'body'
          && data.row.index === rowsIndexed.length - 1
          && data.column.index === data.table.columns.length - 1
        )
          currentY = data.cell.y + data.cell.height + 20 // Update the Y-coordinate after the table
      },
    })

    if (currentY > doc.internal.pageSize.height - 80) {
      // If the table extends beyond a certain point
      doc.addPage() // Add a new page
      currentY = 20 // Reset the Y-coordinate to the top of the new page
    }

    doc.setFontSize(12)

    doc.text(
      `SALES SUMMARY`,
      10,
      newLine(20),
    )
    doc.text(
      // `-------------------------------------------------------------------------------------------------------------------------------------------`,
      `___________________________________________________________________________________`,
      10,
      newLine(2),
    )
    doc.text(
      `NO. OF TICKETS: ${compound.tickets.length.toString()}`,
      10,
      newLine(8),
    )
    doc.text(
      `NO. OF VEHICLES: ${cargoCount.toString()}`,
      10,
      newLine(7),
    )
    doc.text(
      `NO. OF PASSENGERS: ${passengerCount.toString()}`,
      10,
      newLine(7),
    )
    compound.cargoClassCount.forEach((cargoClass) => {
      doc.text(
        `NO. OF ${cargoClass.name}: ${cargoClass.count.toString()}`,
        10,
        newLine(7),
      )
    })
    doc.text(
      `SUBTOTAL: ${format.currency_text(compound.subtotal)}`,
      10,
      newLine(7),
    )
    doc.text(
      `TOTAL FEE: ${format.currency_text(compound.fee)}`,
      10,
      newLine(7),
    )
    doc.text(
      `OVERALL TOTAL: ${format.currency_text(compound.total)}`,
      10,
      newLine(7),
    )
    // doc.text(
    //   'PORT OF ...........................................)',
    //   10,
    //   newLine(4),
    // )
    // doc.text(
    //   'I, ____________________, master of the ____________________ do solemnly swear or (affirm) that',
    //   10,
    //   newLine(20),
    // )
    // doc.text(
    //   'foregoing is a full and complete manifest of all passengers taken aboard on the said vessel on its present',
    //   10,
    //   newLine(),
    // )
    // doc.text(
    //   'voyage, and that all statements contained therein are true and correct to best of my knowledge and',
    //   10,
    //   newLine(),
    // )
    // doc.text('belief.', 10, newLine())
    // doc.text('____________________', 155, newLine(10))
    // doc.text('MASTER', 170, newLine(5))
    // doc.setFontSize(8)
    // doc.text('MARITEST 101', 10, newLine(10))

    const totalPages = doc.internal.pages.length - 1
    // Add page numbers
    // generate 4 letter with random numbers code as serial number
    const serialNumber = Math.random().toString(36).substring(2, 6).toUpperCase()
    const serialString = `Serial No: ${serialNumber}`
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)
      doc.setFontSize(8)
      const str = `Page ${i} of ${totalPages}`

      const pageHeight
        = doc.internal.pageSize.height || doc.internal.pageSize.getHeight()
      const pageWidth
        = doc.internal.pageSize.width || doc.internal.pageSize.getWidth()
      doc.text(str, pageWidth - 25, pageHeight - 4)
      // add the serial number at the bottom of the page same line as the page number but on the left side
      doc.text(serialString, 10, pageHeight - 4)
    }
    const filename = `TripketPH_SalesReport_${format.date_setting(compound.dateSetting).replace(/ /g, '_')}.pdf`
    doc.save(filename)
  }

  return {
    exportSalesFee,
    exportSales,
    exportManifest,
    exportCargoManifest,
  }
}

import ExcelJS from 'exceljs'

export function useExcel() {
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    // Add data to worksheet
    worksheet.columns = [
      { header: 'Name', key: 'name', width: 20 },
      { header: 'Age', key: 'age', width: 10 },
      { header: 'Gender', key: 'gender', width: 10 },
    ]

    worksheet.addRow({ name: 'John Doe', age: 30, gender: 'Male' })
    worksheet.addRow({ name: 'Jane Doe', age: 25, gender: 'Female' })

    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()

    // Download file
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'data.xlsx'
    link.click()
  }

  // const exportToExcelTest = async () => {
  //   const workbook = new ExcelJS.Workbook()
  //   const worksheet = workbook.addWorksheet('Sheet1')

  //   // Add data to worksheet
  //   worksheet.columns = [
  //     { header: 'Name', key: 'name', width: 20 },
  //     { header: 'Age', key: 'age', width: 10 },
  //     { header: 'Gender', key: 'gender', width: 10 },
  //   ]

  //   worksheet.addRow({ name: 'John Doe', age: 30, gender: 'Male' })
  //   worksheet.addRow({ name: 'Jane Doe', age: 25, gender: 'Female' })

  //   // Generate buffer
  //   const buffer = await workbook.xlsx.writeBuffer()

  //   // Download file
  //   const blob = new Blob([buffer], {
  //     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //   })
  //   const url = window.URL.createObjectURL(blob)
  //   const link = document.createElement('a')
  //   link.href = url
  //   link.download = 'data.xlsx'
  //   link.click()
  // }

  const ticketTableToExcel = async (data: any[]) => {
    console.log('Exporting to excel', data.length)
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    // Add data to worksheet
    worksheet.columns = [
      { header: 'ID', key: 'id', width: 30 },
      { header: 'User', key: 'user', width: 20 },
      { header: 'Passengers', key: 'passengers', width: 30 },
      { header: 'Route', key: 'route', width: 20 },
      { header: 'Departure', key: 'departure', width: 20 },
      { header: 'Vehicles', key: 'vehicles', width: 30 },
      { header: 'Status', key: 'status', width: 10 },
      { header: 'Total', key: 'total', width: 10 },
    ]

    data.map((item) => {
      worksheet.addRow({
        id: item.id,
        user: item.user,
        route: item.route,
        departure: excelDateToExcelDate(item.departure),
        passengers: `No. of Passengers: ${item.passengers}`,
        vehicles: `Has ${item.vehicles} vehicle`,
        status: item.status,
        total: item.total,
      })
      if (item.passengerList) {
        item.passengerList.forEach((x: any, index: number) => {
          // add the row to the sheet with the data from the passengerList

          // if (item.vehicleList.length !== 0) {
          const y = item.vehicleList[index]
          // }
          worksheet.addRow({
            passengers: `${x.name.first} ${x.name.last} - ${x.type.name}`,
            vehicles:
              index === 0 && item.vehicleList.length !== 0
                ? ` ${y.type.name} - ${y.plateNumber}`
                : '',
          })
        })
      }
    })

    // Format the cells to display both date and time
    const dateCol = worksheet.getColumn('departure')
    dateCol.eachCell((cell, rowNumber) => {
      if (rowNumber === 1) {
        // Skip the header row
        return
      }
      cell.numFmt = 'dd/mm/yyyy hh:mm AM/PM'
    })

    // worksheet.addRow({ name: "John Doe", age: 30, gender: "Male" })
    // worksheet.addRow({ name: "Jane Doe", age: 25, gender: "Female" })

    await createExcelDownload(workbook, 'tickets')
  }

  const createExcelDownload = async (
    workbook: ExcelJS.Workbook,
    filename: string,
  ) => {
    // Generate buffer
    const buffer = await workbook.xlsx.writeBuffer()

    // Download file
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${filename}.xlsx`
    link.click()
  }

  function excelDateToExcelDate(date: any) {
    const myDate = date
    myDate.setMinutes(myDate.getMinutes() - myDate.getTimezoneOffset()) // Convert to UTC
    //  worksheet.getCell("A1").value = myDate
    return myDate
  }

  return {
    exportToExcel,
    // exportToExcelTest,
    ticketTableToExcel,
  }
}

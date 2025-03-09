// import axios from "axios";

export function useGetAddress() {
  const baseURL = 'https://psgc.gitlab.io/api'

  // const apiRequest = async (url: string) => {
  //   return await axios.request({
  //     url: `${baseURL}/${url}`,
  //     method: "GET",
  //   });
  // };

  const apiRequest = async (url: string) => {
    return await $fetch(`${baseURL}/${url}`)
  }

  // = =====================================================>>
  // console.log(response.data);

  function toArray(json: any): any[] {
    return json.map((e: any) => {
      return {
        name: e.name,
        code: e.code
      }
    })
  }

  const regions = async () => {
    try {
      const response: any = await apiRequest('regions')
      return toArray(response.data)
    } catch (e: any) {
      return e.message
    }
  }

  /**
   * @param code
   * @returns all provinces base on region code parameter.
   */
  const provincesByRegionCode = async (code: string) => {
    try {
      const response: any = await apiRequest(`regions/${code}/provinces`)
      return toArray(response.data)
    } catch (e: any) {
      return e.message
    }
  }

  /**
   * @param code
   * @returns all cities base on province code parameter.
   */

  // https://psgc.gitlab.io/api/regions/070000000/cities-municipalities/
  const citiesByProvinceCode = async (code: string) => {
    try {
      const response: any = await apiRequest(
        `provinces/${code}/cities-municipalities`
      )
      return toArray(response.data)
    } catch (e: any) {
      return e.message
    }
  }

  /**
   * @param code
   * @returns all barangays base on city code parameter.
   */
  const barangaysByCityCode = async (code: string) => {
    try {
      const response: any = await apiRequest(
        `/cities-municipalities/${code}/barangays/`
      )
      return toArray(response.data)
    } catch (e: any) {
      return e.message
    }
  }

  return {
    regions,
    provincesByRegionCode,
    citiesByProvinceCode,
    barangaysByCityCode
  }
}

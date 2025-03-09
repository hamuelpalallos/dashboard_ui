import { deleteObject, getDownloadURL, ref as storageRef } from 'firebase/storage'
import { v4 as uuidv4 } from 'uuid'

export function useStorageRepo() {
  const storage = useFirebaseStorage()

  const uploadCompanyImage = async (companyId: string, image: File) => {
    console.log('uploading TYPE: ', image.type)
    // get the file extension from the image
    const extension = image.type.split('/')[1]
    // create a new generated file name with the extension using the uuid package
    const fileName = `${uuidv4()}.${extension}`

    const companyImageFileRef = storageRef(storage, `companies/${companyId}/${fileName}`)
    const {
      upload,
    } = useStorageFile(companyImageFileRef)

    await upload(image)

    // const storageRef = ref(storage, `companies/${companyId}/${fileName}`);
    // const snap = await uploadBytes(storageRef, image)
    const downloadURL = await getDownloadURL(companyImageFileRef)
    console.log('uploading image...', downloadURL)
    return downloadURL
  }

  const uploadUserImage = async (userId: string, image: File) => {
    console.log('uploading TYPE: ', image.type)
    // get the file extension from the image
    const extension = image.type.split('/')[1]
    // create a new generated file name with the extension using the uuid package
    const fileName = `${uuidv4()}.${extension}`
    const fileRef = storageRef(storage, `users/${userId}/${fileName}`)
    const {
      upload,
    } = useStorageFile(fileRef)
    await upload(image)
    const downloadUrl = await getDownloadURL(fileRef)
    console.log('uploading image...', downloadUrl)
    return downloadUrl
  }

  const deleteCompanyImage = async (downloadUrl: string) => deleteFirestoreImage(downloadUrl)

  const deleteUserImage = async (downloadUrl: string) => deleteFirestoreImage(downloadUrl)

  const deleteFirestoreImage = async (downloadUrl: string) => {
    try {
      await deleteStorageFile(downloadUrl)
    }
    catch (error) {
      console.log('deleteCompanyImage', error)
    }
  }

  const deleteStorageFile = async (url: string) => {
    const fileRef = storageRef(storage, url)

    await deleteObject(fileRef)
  }

  return {
    deleteCompanyImage,
    deleteUserImage,
    uploadCompanyImage,
    uploadUserImage,
  }
}

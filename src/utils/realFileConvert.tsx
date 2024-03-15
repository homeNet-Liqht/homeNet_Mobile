import RNFetchBlob from 'rn-fetch-blob';

export const convertFile = async (uri: string) => {
  const response = await RNFetchBlob.fs.readFile(uri, 'base64');
  const buffer = Buffer.from(response, 'base64');
  return buffer
}
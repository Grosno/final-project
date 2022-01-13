import { RcFile } from 'antd/es/upload';
import { API_KEY } from '../constants/api/imgbbAPI';

export type ReaderResult = string | ArrayBuffer | null;

function createFormData(key: string, base64Url: any) {
  const formData = new FormData();
  formData.set('key', key);
  formData.set('image', base64Url.replace(/^.*,/, ''));
  return formData;
}

export function toBase64Url(file: RcFile, base64: (result: FormData) => void) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    base64(createFormData(API_KEY, reader.result));
  };
}

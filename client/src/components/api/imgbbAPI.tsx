import { uploadUrl } from '../../constants/api/imgbbAPI';
import { METHOD_POST } from '../../constants/api/dummyAPI';

export const uploadImage = (formData: FormData) => fetch(uploadUrl, {
  method: METHOD_POST,
  body: formData,
})
  .then((response) => response.json());

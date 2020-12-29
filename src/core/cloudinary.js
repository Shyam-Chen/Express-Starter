import url from 'url';
import { v2 as cloudinary } from 'cloudinary';

import { CLOUDINARY_URL } from '~/env';

const parseCloudinaryUrl = str => {
  const uri = url.parse(str, true);

  return {
    cloud_name: uri.host,
    api_key: uri.auth && uri.auth.split(':')[0],
    api_secret: uri.auth && uri.auth.split(':')[1],
    private_cdn: uri.pathname != null,
    secure_distribution: uri.pathname && uri.pathname.substring(1),
  };
};

cloudinary.config(parseCloudinaryUrl(CLOUDINARY_URL));

export default cloudinary;

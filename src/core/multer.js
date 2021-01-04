import url from 'url';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

import { NODE_ENV, CLOUDINARY_URL } from '~/env';

let storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  },
});

if (NODE_ENV === 'production') {
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

  storage = new CloudinaryStorage({
    cloudinary,
  });
}

const upload = multer({ storage });

export default upload;

// @flow

import cloudinary from 'cloudinary';

import { CLOUDINARY_CONFIG } from '~/env';

cloudinary.config(CLOUDINARY_CONFIG);

export default cloudinary;

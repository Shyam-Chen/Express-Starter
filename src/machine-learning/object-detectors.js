import tf from '@tensorflow/tfjs-node';
import cocoSsd from '@tensorflow-models/coco-ssd';
import mobilenet from '@tensorflow-models/mobilenet';
import uint8array from 'base64-to-uint8array';

export default class ObjectDetectors {
  loadCocoSsdModal = async () => {
    const modal = await cocoSsd.load({
      base: 'mobilenet_v2',
    });

    return modal;
  };

  loadMobileNetModal = async () => {
    const modal = await mobilenet.load({
      version: 1,
      alpha: 1.0,
    });

    return modal;
  };

  constructor(image, type) {
    this.inputImage = image;
    this.type = type;
  }

  getTensor3dObject(numOfChannels) {
    const imageData = this.inputImage
      .replace('data:image/jpeg;base64', '')
      .replace('data:image/png;base64', '');

    const imageArray = uint8array(imageData);
    const tensor3d = tf.node.decodeJpeg(imageArray, numOfChannels);

    return tensor3d;
  }

  async process() {
    let predictions = null;
    const tensor3D = this.getTensor3dObject(3);

    if (this.type === 'imagenet') {
      const model = await this.loadMobileNetModal();
      predictions = await model.classify(tensor3D);
    } else {
      const model = await this.loadCocoSsdModal();
      predictions = await model.detect(tensor3D);
    }

    tensor3D.dispose();

    return { data: predictions, type: this.type };
  }
}

import Pica from 'pica';
import axiosClient from './api';
// eslint-disable-next-line
export const pica = Pica();

export const FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png'];

//15Mb - this file size can be increased as phone images get larger as it is all done on client side now
export const MAX_FILE_SIZE = 15 * 1048576; // 15MB;

export const COPY = {
  fileTypeError: 'Please upload a JPG or PNG.',
  fileSizeError: 'Max file size is 1MB.',
  dimensionError: 'Please upload a 120x120 image.',
  genericError: 'Something went wrong. Try again.'
};

export const FileService = {
  getPresignedImageURL: async () => {
    const response: { imageURL: string; presignedUrl: string } =
      await axiosClient.get('/presigned-url');
    return response;
  },
  getBase64: (file: File) => {
    return new Promise<{ photoBase64: string; file: File }>(
      (resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({ photoBase64: reader.result as string, file });
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      }
    );
  },
  calculateAspectRatioFit: (
    srcWidth: number,
    srcHeight: number,
    maxWidth: number,
    maxHeight: number
  ) => {
    // if it's not bigger than our max just return and do nothing
    if (srcWidth <= maxWidth && srcHeight <= maxHeight) {
      return {
        width: srcWidth,
        height: srcHeight
      };
    }
    const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return {
      width: srcWidth * ratio,
      height: srcHeight * ratio
    };
  },

  getImagePreview: (file: File) => {
    const mimeType = file.type;
    const name = file.name;
    const offscreenCanvas = document.createElement('canvas');
    try {
      return FileService.getBase64(file).then(({ photoBase64 }) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            if (img.width < 120 || img.height < 120) {
              reject(new Error(COPY.dimensionError));
            }
            const resizedDimensions = FileService.calculateAspectRatioFit(
              img.width,
              img.height,
              800,
              800
            );
            offscreenCanvas.width = resizedDimensions.width;
            offscreenCanvas.height = resizedDimensions.height;

            pica
              .resize(img, offscreenCanvas, {
                unsharpAmount: 160,
                unsharpRadius: 0.6,
                unsharpThreshold: 1
              })
              .then((result) => pica.toBlob(result, mimeType))
              // convert the resized image back to base64 for return
              .then((blob) =>
                resolve(
                  FileService.getBase64(
                    new File([blob], name, {
                      type: mimeType
                    })
                  )
                )
              );
          };
          img.src = photoBase64;
        });
      });
    } catch (e: any) {
      throw Error(e);
    }
  }
};

export default FileService;

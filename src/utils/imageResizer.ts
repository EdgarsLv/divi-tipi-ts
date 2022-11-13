import Resizer from 'react-image-file-resizer';

export function imageResizer(file: Blob, quality: number) {
  return new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      1024,
      1024,
      'JPEG',
      quality,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });
}

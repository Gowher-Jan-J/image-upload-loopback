import {BindingScope, injectable} from '@loopback/core';
import multer from 'multer';
import path from 'path';

@injectable({scope: BindingScope.TRANSIENT})
export class FileUploadService {
  private storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

  private fileFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and GIF are allowed.'));
    }
  };

  private upload = multer({
    storage: this.storage,
    fileFilter: this.fileFilter,
  });

  single(fieldName: string) {
    return this.upload.single(fieldName);
  }
}

// keys.ts

import {BindingKey} from '@loopback/core';
import {FileUploadService} from './services/user.services';


export const FILE_UPLOAD_SERVICE = BindingKey.create<FileUploadService>('services.FileUploadService');


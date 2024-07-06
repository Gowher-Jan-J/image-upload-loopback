import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  post,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import {User} from '../models';
import {UserRepository} from '../repositories';



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({storage: storage});

export class UploadController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) { }

  @post('/image', {
    responses: {
      '200': {
        description: 'Uploaded image file',
        content: {'application/json': {schema: {type: 'object'}}},
      },
    },
  })
  async image(
    @requestBody.file() request: any,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<object> {
    try {

      return new Promise<object>((resolve, reject) => {
        upload.single('file')(request, response, async (err: any) => {
          if (err) {
            reject(err);
          } else {
            const file = request.file;
            if (!file) {
              reject(new Error('No file uploaded.'));
            } else {
              const savedFile = await this.saveFileToDatabase(file);
              resolve(savedFile);
            }
          }
        });
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  async saveFileToDatabase(file: Express.Multer.File): Promise<any> {
    try {
      const filePath = file.path;

      const USER = new User();


      USER.file = filePath;

      return await this.userRepository.create(USER);
    } catch (error) {
      console.error('Error saving file to database:', error);
      throw error;
    }

  }
}

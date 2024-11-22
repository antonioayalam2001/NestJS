import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {

  constructor(  ){}


  uploadFile(fileURL: string) {

    return {
      fileURL
    };
  }

  getFile(imageName: string) {    
    const path = join(__dirname, '..', '..', 'static', 'products', imageName);
    if (!existsSync(path)) {
      throw new BadRequestException('File not found');
    }
    return path;
  }

}

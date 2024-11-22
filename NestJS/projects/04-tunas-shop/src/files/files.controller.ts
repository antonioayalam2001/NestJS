import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { FilesService } from './files.service';
import { fileFilter } from './helpers/fileFilter.helper';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly envConfigService: ConfigService

  ) { }

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    /*
     * @destination: The destination of the file
      * @filename: (req, file, callback) => { } 
      *  - req: The request object
      *   - file: The file object
      *  - callback: The callback function null | Error, filename
     */
    storage: diskStorage({
      destination: "./static/products",
      filename: (req, file, callback) => {
        const filename = `${uuid()}-${file.originalname.replace(/\s/g, "-")}`;

        callback(null, filename);
      }
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No hay archivo');
    }
    const secureURL = `${this.envConfigService.get('HOST_API')}/files/product/${file.filename}`;
    return this.filesService.uploadFile(secureURL);
  }

  @Get('product/:imageName')
  getFile(
    @Param('imageName') imageName: string,
    @Res() res: Response
  ) {
    const path = this.filesService.getFile(imageName);
    return res.sendFile(path);
  }


}

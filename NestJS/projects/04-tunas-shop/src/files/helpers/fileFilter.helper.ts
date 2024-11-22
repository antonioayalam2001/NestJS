import { Request } from "express";

export function fileFilter(req: Request, file: Express.Multer.File, callback: Function) {
    
    if (!file) return callback(new Error('No hay archivo'), false);

    const fileExtenstion = file.mimetype.split('/')[1];
    const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'svg+xml'];
    
    if (!validExtensions.includes(fileExtenstion)) {
        return callback(new Error('Tipo de archivo no permitido'), false);
    }
    // @param {Error} | null - If the file is allowed
    // @param {Boolean} true | false - If the file is allowed
  callback(null, true);
    
}
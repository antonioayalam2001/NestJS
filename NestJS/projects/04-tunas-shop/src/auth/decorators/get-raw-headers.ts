import { createParamDecorator } from "@nestjs/common";

export const GetRawHeaders = createParamDecorator((data, ctx) => {
    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders || [];
})
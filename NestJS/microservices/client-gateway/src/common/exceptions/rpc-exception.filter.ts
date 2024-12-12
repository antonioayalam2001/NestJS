import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";

@Catch(RpcException)
export class RpcCustomExceptionFilter implements ExceptionFilter {
    catch(excepetion: RpcException, host: ArgumentsHost) {
        //tomando contexto de ejecucion pueder ser que estemos con express o fastify u otros
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()


        const rpcError = excepetion.getError()

        if (typeof rpcError === 'object' && 'status' in rpcError && 'message' in rpcError) {            
            return response.status(rpcError.status).json(rpcError)
        }

        return response.status(400).json({
            status: 400,
            message: rpcError
        })
    }
}


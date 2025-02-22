import { Response } from 'express';
import { constants } from 'http2';
import debugLib from 'debug';
import { ErrorService } from './ErrorService';

const debug = debugLib('bdb:HttpUtils');

export class HttpUtils {
    static handleError(res: Response, error: any): void {
        debug('Error in path %s: %s', res.req?.path, error);

        if (error instanceof Error) {
            const errorStatus = ErrorService.replayError(error);
            res.status(errorStatus.Status.StatusCode).send(errorStatus);
        } else {
            res.status(constants.HTTP_STATUS_INTERNAL_SERVER_ERROR).send(error);
        }
    }
}

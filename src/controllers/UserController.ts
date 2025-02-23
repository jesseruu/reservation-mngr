import { Router, Request, Response } from "express";
import debugLib from "debug";
import { HttpUtils } from "../utilities/HttpUtils";
import { AuthService } from "../services/AuthService";
import { User } from "../interfaces/Users";

const debug = debugLib('api:UserController')
const UserController = Router();

UserController.post('/auth/signin', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const body = req.body as User;
    console.log(body);
    debug('<%s> Start to sign in', rquid);
    try {
        const { status, data } = await AuthService.signin(rquid, body);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

UserController.post('/auth/signup', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const body = req.body as User;
    console.log(body);
    debug('<%s> Start to sign up', rquid);
    try {
        const { status, data } = await AuthService.signup(rquid, body);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

export { UserController }
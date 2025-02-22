import { User } from "../interfaces/Users";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import config from "../../config";
import { UserModel } from "../models/UserModel";
import debugLib from "debug";
const debug = debugLib('api:AuthService');

const saltRounds = 10;

export class AuthService {
    public static async signup(rquid: string, body: User) {
        debug('<%s> Start create user', rquid);
        try {
            const user = await UserModel.findOne({
                where: {
                    email: body.email
                }
            });

            if (user) {
                debug('<%s> User already exists', rquid);
                return { status: 403, data: 'User already exists' }
            }

            const passwordhash = await bcrypt.hash(body.password, saltRounds);
            body.password = passwordhash;

            const userCreated = await UserModel.create({...body},
                {
                    fields: Object.keys({ ...body }),
                    raw: true
                }
            );

            debug('<%s> User created: %s', rquid);
            return { status: 200, data: userCreated.id };
        } catch (error) {
            debug(`<${rquid}> - Error creating user: ${error}`);
            throw error;
        }
    }

    public static async signin(rquid: string, body: User) {
        try {
            const user = await UserModel.findOne({
                where: {
                    email: body.email
                },
                raw: true
            });

            if (!user) {
                debug('<%s> User does not exist ', rquid);
                return { status: 404, data: 'User does not exist' }
            }

            const checkPassword = await bcrypt.compare(body.password, user.password);
            if (!checkPassword) {
                return { status: 401, data: 'Email or password are not correct' }
            }

            const token = sign({
                ...user
            }, config.secretKey, {});

            debug('<%s> User sign in', rquid);
            return { status: 200, data: token };
        } catch (error) {
            debug(`<${rquid}> - Error signin: ${error}`);
            throw error;
        }
    }
}
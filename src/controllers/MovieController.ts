import { Router, Request, Response } from "express";
import debugLib from "debug";
import config from "../../config";
import { MovieService } from "../services/MovieService";
import { HttpUtils } from "../utilities/HttpUtils";
import { Movies } from "../interfaces/Movies";

const debug = debugLib('api:MovieController')
const MovieController = Router();

MovieController.get('/movies/:movieId', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const { movieId } = req.params;
    debug('<%s> Start get movie', rquid);
    try {
        const { status, data } = await MovieService.getMovie(rquid, movieId);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

MovieController.get('/movies', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const { filterConfig } = config
    debug('<%s> Start get movies', rquid);
    const { limit, offset } = req.query;
    const options = {
        limit: limit ? +limit : +filterConfig.defaultLimit,
        offset: offset ? +offset : +filterConfig.defaultOffset,
    }
    try {
        const response = await MovieService.getMovies(rquid, options);
        res.send(response);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

MovieController.post('/movies', async(req: Request, res: Response) => {
    const rquid = req.header('X-RqUID') as string;
    const body = req.body as Movies;
    debug('<%s> Start get movie', rquid);
    try {
        const { status, data } = await MovieService.createMovie(rquid, body);
        res.status(status).send(data);
    } catch (error) {
        HttpUtils.handleError(res, error);
    }
});

export { MovieController };
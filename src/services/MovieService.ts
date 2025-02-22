import { MovieModel } from "../models/MovieModel";
import { ClassificationModel } from "../models/ClassificationModel";
import debugLib from "debug";
import { Movies } from "../interfaces/Movies";

const debug = debugLib('api:MovieService');
export class MovieService {
    public static async getMovies(rquid: string, options: { limit: number, offset: number }) {
        debug('<%s> Start to movies from db', rquid);
        try {
            const { count, rows: movies } = await MovieModel.findAndCountAll({
                attributes: ['id', 'title', 'release_date', 'genres', 'duration', 'description', 'imageUrl'],
                include: [
                    {
                        model: ClassificationModel,
                        as: 'classification',
                        attributes: ['name']
                    }
                ],
                limit: options.limit,
                offset: options.offset,
                raw: true,
                nest: true
            });
            debug('<%s> Query successfull', rquid);
            return { count, movies };
        } catch (error) {
            debug(`<${rquid}> - Error getting movies: ${error}`);
            throw error;
        }
    }

    public static async getMovie(rquid: string, movieId: string) {
        debug('<%s> Start to movies from db with id: %s', rquid, movieId);
        try {
            const movie = await MovieModel.findOne({
                attributes: { exclude: ['classification_id']},
                where: {
                    id: movieId
                }
            });

            if (!movie) {
                debug('<%s> No movie found', rquid);
                return { status: 404, data: 'No movie found' };
            }
            debug('<%s> Query successfull', rquid);
            return { status: 200, data: movie }
        } catch (error) {
            debug(`<${rquid}> - Error getting movie: ${error}`);
            throw error;
        }
    }

    public static async createMovie(rquid: string, body: Movies) {
        debug('<%s> Start create movie: %s', rquid);
        try {
            const classification = await ClassificationModel.findOne({
                attributes: ['id'],
                where: {
                    name: body.classification
                }
            });

            if (!classification) {
                debug('<%s> No classification found', rquid);
                return { status: 404, data: 'No classification found'}
            }

            delete body.classification;

            const movie = await MovieModel.findOne({
                where: {
                    title: body.title
                }
            });

            if (movie) {
                debug('<%s> No classification found', rquid);
                return { status: 403, data: 'Movie already exist'}
            }

            const movieCreated = await MovieModel.create({
                classificationId: classification.id,
                ...body
            }, {
                fields: Object.keys({...body, classificationId: classification.id }),
                raw: true
            });
            debug('<%s> Movie created: %s', rquid);
            return { status: 200, data: movieCreated }
        } catch (error) {
            debug(`<${rquid}> - Error creating movie: ${error}`);
            throw error;
        }
    }
}
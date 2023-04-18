import { AuthenticatedRequest } from '@/middlewares';
import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import hotelsService from '@/services/hotels-service';

async function getHotels(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = Number(req.userId);

    // const ticketId = Number(req.query.ticketId);

    // if (!ticketId) {
    //   return res.sendStatus(httpStatus.BAD_REQUEST);
    // }

    const hotels = await hotelsService.getHotels(userId);

    return res.status(httpStatus.OK).send(hotels);
  } catch (error) {
    switch (error.name) {
      case 'notFoundError':
        return res.sendStatus(httpStatus.NOT_FOUND);
      case 'requestError':
        return res.sendStatus(httpStatus.BAD_REQUEST);
      case 'unauthorizedError':
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      default:
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

async function getRoomsHotel(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = Number(req.userId);

    const ticketId = Number(req.query.ticketId);

    if (!ticketId) {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    const roomsHotel = await hotelsService.getRoomsHotel();

    return res.status(httpStatus.OK).send(roomsHotel);
  } catch (error) {
    switch (error.name) {
      case 'notFoundError':
        return res.sendStatus(httpStatus.NOT_FOUND);
      case 'requestError':
        return res.sendStatus(httpStatus.BAD_REQUEST);
      case 'unauthorizedError':
        return res.sendStatus(httpStatus.UNAUTHORIZED);
      default:
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

export default {
  getHotels,
  getRoomsHotel,
};

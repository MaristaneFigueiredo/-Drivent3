import { Response } from 'express';
import httpStatus from 'http-status';
import { Hotel } from '@prisma/client';
import { AuthenticatedRequest } from '@/middlewares';
import hotelsService from '@/services/hotels-service';

async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);

  try {
    
    const hotels = await hotelsService.getHotels(userId);
    return res.status(httpStatus.OK).send(hotels);

  } catch (error) {
    switch (error.name) {
      case 'notFoundError':
        return res.sendStatus(httpStatus.NOT_FOUND);
      case 'paymentNotFound':
        return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
      case 'unauthorizedError':
          return res.sendStatus(httpStatus.UNAUTHORIZED);
      default:
        return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

async function getRoomsHotel(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);

  const hotelId = Number(req.params.hotelId);

  try {
    const roomsHotels = await hotelsService.getRoomsHotel(userId, hotelId);
    return res.status(httpStatus.OK).send(roomsHotels);
  } catch (error) {
    switch (error.name) {
      case 'notFoundError':
        return res.sendStatus(httpStatus.NOT_FOUND);
      case 'paymentNotFound':
        return res.sendStatus(httpStatus.PAYMENT_REQUIRED);
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

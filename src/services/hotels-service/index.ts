import { Hotel } from '@prisma/client';
import { notFoundError } from '@/errors';
import hotelRepository from '@/repositories/hotel-repository';
import enrollmentsService from '@/services/enrollments-service';
import ticketsService from '@/services/tickets-service';

async function getHotels(userId: number): Promise<Hotel[]> {
  checkEnrollmentAndDataTicketByUser(userId);

  const hotels = await hotelRepository.getHotels();
  return hotels;
}

async function getHotelById(hotelId: number) {
  const hotel = await hotelRepository.getHotelById(hotelId);

  if (!hotel) {
    throw notFoundError();
  }

  return hotel;
}

async function getRoomsHotel(userId: number, hotelId: number) {
  checkEnrollmentAndDataTicketByUser(userId);

  getHotelById(hotelId);

  const roomsHotels = await hotelRepository.getRoomsHotel(hotelId);
  return roomsHotels;
}

async function checkEnrollmentAndDataTicketByUser(userId: number) {
  //verificar se tem enrollment
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);

  const dataTicket = await ticketsService.checkTiketsByUser(enrollment.id);
}

const hotelsService = {
  getHotels,
  getRoomsHotel,
};

export default hotelsService;

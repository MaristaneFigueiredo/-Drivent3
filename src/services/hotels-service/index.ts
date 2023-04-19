import hotelRepository from '@/repositories/hotel-repository';
import enrollmentsService from '@/services/enrollments-service';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsService from '@/services/tickets-service';
import { notFoundError } from '@/errors';

async function getHotels(userId: number) {
  checkEnrollmentAndDataTicketByUser(userId);

  const hotels = await hotelRepository.getHotels();
  return hotels;
}

async function checkEnrollmentAndDataTicketByUser(userId: number) {
  //verificar se tem enrollment
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);

  const dataTicket = await ticketsService.checkTiketsByUser(enrollment.id);
}

async function getRoomsHotel() {}

const hotelsService = {
  getHotels,
  getRoomsHotel,
};

export default hotelsService;

import hotelRepository from '@/repositories/payment-repository';
import enrollmentsService from '@/services/enrollments-service';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsService from '@/services/tickets-service';
import { notFoundError } from '@/errors';


async function getHotels(userId: number) {
  /* //testa se tem inscrição
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);

  //testa se tem ingresso
  const ticket = await ticketRepository.getTiketsByUser(enrollment.id);
  if (!ticket) {
    throw notFoundError;
  }
  //testa se Ele tem hotel
  verifyHotel(ticket.ticketTypeId);

  //testa se Ele pagou
  const payment = await enrollmentsService.getPaymentByTicketId(ticket.id); */

  checkEnrollmentHasBeenPaidByUser(userId)

  //buscar hotels

}

async function checkEnrollmentHasBeenPaidByUser(userId:number) {  
  
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId)
  
  /*
  se eu usar essa função não preciso usar a função de cima, pois ela já consta na função abaixo acionada
  const dataEnrollmentUser = await ticketsService.getTiketsByUser(userId);
  */
  

  const dataTicketPaymentUser = await ticketsService.getTiketWithTicketTypeAndPaymentByUser(enrollment.id);

 
}





async function verifyHotel(ticketTypeId: number) {
  const ticketType = await ticketsService.getTicketType(ticketTypeId);

  if (ticketType.includesHotel === false) {
    throw notFoundError;
  }
}

async function getRoomsHotel() {}

const hotelsService = {
  getHotels,
  getRoomsHotel,
};

export default hotelsService;

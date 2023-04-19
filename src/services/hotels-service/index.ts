import hotelRepository from '@/repositories/hotel-repository';
import enrollmentsService from '@/services/enrollments-service';
import ticketRepository from '@/repositories/ticket-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import ticketsService from '@/services/tickets-service';
import { notFoundError } from '@/errors';


async function getHotels(userId: number) {  
  checkEnrollmentHasBeenPaidByUser(userId)

  const hotels = await hotelRepository.getHotels();
  return hotels;  

}

async function checkEnrollmentHasBeenPaidByUser(userId:number) {  
  
  //verificar se tem enrollment
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

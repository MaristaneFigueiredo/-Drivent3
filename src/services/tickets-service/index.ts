import { Ticket, TicketStatus, TicketType } from '@prisma/client';
import ticketRepository from '@/repositories/ticket-repository';
import { notFoundError, paymentRequiredError } from '@/errors';
import { TicketInput } from '@/protocols';
import enrollmentsService from '@/services/enrollments-service';

async function getTicketsType(): Promise<TicketType[]> {
  const TicketsType = await ticketRepository.getTicketsType();
  return TicketsType;
}

async function getTicketType(ticketTypeId: number): Promise<TicketType> {
  const TicketType = await ticketRepository.getTicketType(ticketTypeId);

  if (!TicketType) {
    throw notFoundError;
  }
  return TicketType;
}

async function findTicket(ticketTypeId: number): Promise<Ticket> {  
  const ticket = await ticketRepository.findTicket(ticketTypeId);  

  if (!ticket) {
    throw notFoundError;
  }
  return ticket;
}

async function createTiket(ticketTypeId: number, userId: number) {
  /* const enrollment = await enrollmentRepository.getEnrollmentByUserId(userId);
   if (!enrollment) {
    throw notFoundError;    
  } */

  //if (!ticketTypeId) {
  // throw BAD_REQUEST;
  // return res.sendStatus(httpStatus.BAD_REQUEST);
  //}

  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);

  const ticketType = await getTicketType(ticketTypeId);

  const data = {
    ticketTypeId: ticketType.id,
    enrollmentId: enrollment.id,
    status: TicketStatus.RESERVED,
  } as TicketInput;
  const ticket = await ticketRepository.createTiket(data);

  const ticketDetails = await ticketRepository.findTicketWithTicketTypeById(ticket.id);

  return ticketDetails;
}

async function getTiketsByUser(userId: number) {
  const enrollment = await enrollmentsService.getEnrollmentByUserId(userId);
  const ticketsByUser = await ticketRepository.getTiketsByUser(enrollment.id);

  if (!ticketsByUser) {
    throw notFoundError;
  }

  return ticketsByUser;
}

async function setTicketAsPaid(ticketId: number) {
  return await ticketRepository.setTicketAsPaid(ticketId);
}

async function getTiketWithTicketTypeAndPaymentByUser(enrollmentId: number) {

  const dataTicketPaymentUser = await ticketRepository.getTiketWithTicketTypeAndPaymentByUser(enrollmentId);

  console.log('ticketService dataTicketPaymentUser', dataTicketPaymentUser)
  
  //não existe ticket
  if(!dataTicketPaymentUser.ticketTypeId)
      throw notFoundError
  
   // não inclui hotel
   if(!dataTicketPaymentUser.TicketType.includesHotel)
   throw notFoundError

  // não existe pagamento
  if (dataTicketPaymentUser.Payment.length === 0) 
    throw paymentRequiredError()
  
 

  return dataTicketPaymentUser
  
}


const ticketsService = {
  getTicketsType,
  createTiket,
  getTiketsByUser,
  findTicket,
  getTicketType,
  setTicketAsPaid,
  getTiketWithTicketTypeAndPaymentByUser
};

export default ticketsService;

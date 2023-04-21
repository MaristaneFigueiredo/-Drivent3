import supertest from 'supertest';
import httpStatus from 'http-status';
import app, { init } from '@/app';
import { TicketStatus } from '@prisma/client';
import { User } from '@prisma/client';
import { cleanDb, generateValidToken } from '../helpers';

import { createEnrollmentWithAddress, createUser, createTicketType, createTicket } from '../factories';
//, createHotels

const server = supertest(app)

beforeAll( async () =>{
    await init()
    await cleanDb()
})

beforeEach(async () => {
    await cleanDb();
});

describe('GET /hotels', () => {
   
    it('should return with status 401 without token', async () => {
        const response = await server.get('/hotels')
        expect(response.status).toEqual(httpStatus.UNAUTHORIZED)
    })

    it('should return with status 401 with token invalid', async () => {
        const response = await server.get('/hotels').set('Authorization', 'Bearer invalidToken')
        expect(response.status).toEqual(httpStatus.UNAUTHORIZED)
    })

     describe('When token is valid', () => {

        it('should return with status 404 WHEN Enrollment, ticket or Hotel not exits', async () => {
            const user = await createUser()
            const token = await generateValidToken(user)
            
            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);            
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })

        it('should return with status 402 WHEN there is NOT paid ticket', async () => {
            const user = await createUser()
            const token = await generateValidToken(user)
            const enrollment = await createEnrollmentWithAddress(user);
            const ticketType = await createTicketType();
            await createTicket(enrollment.id, ticketType.id, TicketStatus.RESERVED);

            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);            
            expect(response.status).toEqual(httpStatus.PAYMENT_REQUIRED);
        })
        
    })

    // /there is NO ticket with hotel'

   /*  it('should return all hotels with status 200', async () => {
        const user = await createUser();
        const enrollment = await createEnrollmentWithAddress(user);
        const token = await generateValidToken(user);
  
        const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
  
        // Matcher para status code
        expect(response.status).toBe(httpStatus.OK);
        // Matcher para body response
        expect(response.body).toHaveLength(1) // pelo menos um elemento
        expect(response.body).toEqual({
          id: enrollment.id,
          name: enrollment.name,
          image: enrollment.cpf,
          createdAt: enrollment.birthday.toISOString(),
          updatedAt: enrollment.phone,          
        });
      }); */ 

}

)

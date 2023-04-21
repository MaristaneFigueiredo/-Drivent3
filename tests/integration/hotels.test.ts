import supertest from 'supertest';
import httpStatus from 'http-status';
import app, { init } from '@/app';
import { User } from '@prisma/client';
import { cleanDb, generateValidToken } from '../helpers';

import { createEnrollmentWithAddress, createUser } from '../factories';
//, createHotels

const server = supertest(app)

beforeAll( async () =>{
    await init()
    await cleanDb()
})

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

        it('shoul return with status 404 WHEN Enrollment, ticket or Hotel not exits', async () => {
            const user = await createUser()
            const token = await generateValidToken(user)

            console.log('user',user)
            console.log('token', token)

            const response = await server.get('/hotels').set('Authorization', `Bearer ${token}`);
            console.log('status', response.status)
            expect(response.status).toEqual(httpStatus.NOT_FOUND);
        })
        
    })

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

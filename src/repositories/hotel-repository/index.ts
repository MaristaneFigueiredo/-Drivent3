import { prisma } from '@/config';

async function getHotels() {}

async function getRoomsHotel() {}

const hotelRepository = {
  getHotels,
  getRoomsHotel,
};

export default hotelRepository;

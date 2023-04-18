import { prisma } from '@/config';

async function getHotels() {
  const hotels = await prisma.hotel.findMany();
  return hotels;
}

async function getRoomsHotel() {}

const hotelRepository = {
  getHotels,
  getRoomsHotel,
};

export default hotelRepository;

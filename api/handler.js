import { PrismaClient } from '@prisma/client';
import cors from 'cors';
const prisma = new PrismaClient();

app.use(
  cors({
    origin: 'https://gis-gizi.vercel.app', // Domain frontend setelah deployment
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

export default async function handler(req, res) {
  const { method, url } = req;

  // Login route
  if (url === '/api/login' && method === 'POST') {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'admin') {
      return res.status(200).json({ msg: 'Login successful' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  }

  // Create Laporan Gizi route
  if (url === '/api/laporan-gizi' && method === 'POST') {
    const {
      kecamatan,
      puskesmas,
      jumlah_balita_ditimbang,
      bb_u_kurang,
      persen_bb_u_kurang,
      jumlah_balita_diukur_tinggi_badan,
      tb_u_pendek,
      persen_tb_u_pendek,
      jumlah_balita_diukur_bb_tb,
      bb_tb_gizi_kurang,
      persen_gizi_kurang,
      bb_tb_gizi_buruk,
      persen_gizi_buruk,
    } = req.body;

    if (
      !kecamatan ||
      !puskesmas ||
      !jumlah_balita_ditimbang ||
      !bb_u_kurang ||
      !persen_bb_u_kurang ||
      !jumlah_balita_diukur_tinggi_badan ||
      !tb_u_pendek ||
      !persen_tb_u_pendek ||
      !jumlah_balita_diukur_bb_tb ||
      !bb_tb_gizi_kurang ||
      !persen_gizi_kurang ||
      !bb_tb_gizi_buruk ||
      !persen_gizi_buruk
    ) {
      return res.status(400).json({ message: 'Form tidak boleh kosong!' });
    }

    try {
      const newLaporan = await prisma.gizi.create({
        data: {
          kecamatan,
          puskesmas,
          jumlah_balita_ditimbang: parseInt(jumlah_balita_ditimbang) || 0,
          bb_u_kurang: parseInt(bb_u_kurang) || 0,
          persen_bb_u_kurang: parseFloat(persen_bb_u_kurang) || 0.0,
          jumlah_balita_diukur_tinggi_badan:
            parseInt(jumlah_balita_diukur_tinggi_badan) || 0,
          tb_u_pendek: parseInt(tb_u_pendek) || 0,
          persen_tb_u_pendek: parseFloat(persen_tb_u_pendek) || 0.0,
          jumlah_balita_diukur_bb_tb: parseInt(jumlah_balita_diukur_bb_tb) || 0,
          bb_tb_gizi_kurang: parseInt(bb_tb_gizi_kurang) || 0,
          persen_gizi_kurang: parseFloat(persen_gizi_kurang) || 0.0,
          bb_tb_gizi_buruk: parseInt(bb_tb_gizi_buruk) || 0,
          persen_gizi_buruk: parseFloat(persen_gizi_buruk) || 0.0,
          laporan_tanggal: new Date(),
        },
      });

      return res
        .status(201)
        .json({ message: 'Data created successfully', data: newLaporan });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error creating data' });
    }
  }

  // Get All Laporan Gizi route
  if (url === '/api/laporan-gizi' && method === 'GET') {
    try {
      const data = await prisma.gizi.findMany();
      if (data.length === 0) {
        return res.status(404).json({ message: 'Data not found' });
      }
      return res.status(200).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error retrieving data' });
    }
  }

  // Update Laporan Gizi route by ID
  if (url.startsWith('/api/laporan-gizi') && method === 'PUT') {
    const id = url.split('/').pop(); // Ambil ID dari URL

    const {
      kecamatan,
      puskesmas,
      jumlah_balita_ditimbang,
      bb_u_kurang,
      persen_bb_u_kurang,
      jumlah_balita_diukur_tinggi_badan,
      tb_u_pendek,
      persen_tb_u_pendek,
      jumlah_balita_diukur_bb_tb,
      bb_tb_gizi_kurang,
      persen_gizi_kurang,
      bb_tb_gizi_buruk,
      persen_gizi_buruk,
    } = req.body;

    try {
      const updatedLaporan = await prisma.gizi.update({
        where: { id: parseInt(id) },
        data: {
          kecamatan,
          puskesmas,
          jumlah_balita_ditimbang: parseInt(jumlah_balita_ditimbang) || 0,
          bb_u_kurang: parseInt(bb_u_kurang) || 0,
          persen_bb_u_kurang: parseFloat(persen_bb_u_kurang) || 0.0,
          jumlah_balita_diukur_tinggi_badan:
            parseInt(jumlah_balita_diukur_tinggi_badan) || 0,
          tb_u_pendek: parseInt(tb_u_pendek) || 0,
          persen_tb_u_pendek: parseFloat(persen_tb_u_pendek) || 0.0,
          jumlah_balita_diukur_bb_tb: parseInt(jumlah_balita_diukur_bb_tb) || 0,
          bb_tb_gizi_kurang: parseInt(bb_tb_gizi_kurang) || 0,
          persen_gizi_kurang: parseFloat(persen_gizi_kurang) || 0.0,
          bb_tb_gizi_buruk: parseInt(bb_tb_gizi_buruk) || 0,
          persen_gizi_buruk: parseFloat(persen_gizi_buruk) || 0.0,
          laporan_tanggal: new Date(),
        },
      });
      return res
        .status(200)
        .json({ message: 'Data updated successfully', data: updatedLaporan });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error updating data' });
    }
  }

  // Delete Laporan Gizi route by ID
  if (url.startsWith('/api/laporan-gizi') && method === 'DELETE') {
    const id = url.split('/').pop(); // Ambil ID dari URL
    try {
      const deletedLaporan = await prisma.gizi.delete({
        where: { id: parseInt(id) },
      });
      return res
        .status(200)
        .json({ message: 'Data deleted successfully', data: deletedLaporan });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Error deleting data' });
    }
  }

  // Handle method not allowed
  return res.status(405).json({ message: 'Method not allowed' });
}

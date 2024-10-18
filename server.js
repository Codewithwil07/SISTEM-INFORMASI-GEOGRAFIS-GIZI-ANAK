import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

dotenv.config();
const app = express();
const prisma = new PrismaClient();
const PORT = 3000;

// const SECRET_KEY = process.env.SECRET_KEY;

app.use(cookieParser());
app.use(express.json());

app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

const basicAuth = (req, res, next) => {
  const { username, password } = req.body;

  console.log(username, password);

  if (username === 'admin' && password === 'admin') {
    next();
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// **LOGIN** - Login user
app.post('/api/login', basicAuth, async (req, res) => {
  try {
    res.status(200).send({ msg: 'Login successful' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).send({ msg: 'Server error' });
  }
});

// **CREATE** - meembuat data baru
app.post('/api/data/laporan-gizi', async (req, res) => {
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
    return res.status(400).send('Form tidak boleh kosong!');
  }

  try {
    const newLaporan = await prisma.gizi.create({
      data: {
        kecamatan,
        puskesmas,
        jumlah_balita_ditimbang: parseInt(jumlah_balita_ditimbang) || 0,
        bb_u_kurang: parseInt(bb_u_kurang) || 0,
        persen_bb_u_kurang: parseFloat(persen_bb_u_kurang) || 0.0, // Ubah ke float
        jumlah_balita_diukur_tinggi_badan:
          parseInt(jumlah_balita_diukur_tinggi_badan) || 0,
        tb_u_pendek: parseInt(tb_u_pendek) || 0,
        persen_tb_u_pendek: parseFloat(persen_tb_u_pendek) || 0.0, // Ubah ke float
        jumlah_balita_diukur_bb_tb: parseInt(jumlah_balita_diukur_bb_tb) || 0,
        bb_tb_gizi_kurang: parseInt(bb_tb_gizi_kurang) || 0,
        persen_gizi_kurang: parseFloat(persen_gizi_kurang) || 0.0, // Ubah ke float
        bb_tb_gizi_buruk: parseInt(bb_tb_gizi_buruk) || 0,
        persen_gizi_buruk: parseFloat(persen_gizi_buruk) || 0.0, // Ubah ke float
        laporan_tanggal: new Date(),
      },
    });

    res
      .status(201)
      .json({ message: 'Data created successfully', data: newLaporan });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error creating data' });
  }
});

// **READ** - Mengambil semua data laporan gizi
app.get('/api/data/laporan-gizi', async (req, res) => {
  try {
    const data = await prisma.gizi.findMany();

    // Check if the data array is empty
    if (data.length === 0) {
      return res.status(404).json({ message: 'Data not found' });
    }

    // Respond with data
    res.status(200).json(data);
  } catch (error) {
    console.error('Error retrieving data:', error); // Log the full error
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

// **READ by ID** - Mengambil data laporan gizi berdasarkan ID
app.get('/api/data/laporan-gizi/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.gizi.findUnique({
      where: { id: parseInt(id) },
    });
    if (data) {
      res.status(200).json({ data });
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error retrieving data' });
  }
});

// **UPDATE** - Mengupdate data laporan gizi berdasarkan ID
app.put('/api/data/laporan-gizi/:id', async (req, res) => {
  const { id } = req.params;

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
    laporan_tanggal,
  } = req.body;

  try {
    const updatedLaporan = await prisma.gizi.update({
      where: { id: parseInt(id) },
      data: {
        kecamatan,
        puskesmas,
        jumlah_balita_ditimbang: parseInt(jumlah_balita_ditimbang) || 0,
        bb_u_kurang: parseInt(bb_u_kurang) || 0,
        persen_bb_u_kurang: parseFloat(persen_bb_u_kurang) || 0.0, // Ubah ke float
        jumlah_balita_diukur_tinggi_badan:
          parseInt(jumlah_balita_diukur_tinggi_badan) || 0,
        tb_u_pendek: parseInt(tb_u_pendek) || 0,
        persen_tb_u_pendek: parseFloat(persen_tb_u_pendek) || 0.0, // Ubah ke float
        jumlah_balita_diukur_bb_tb: parseInt(jumlah_balita_diukur_bb_tb) || 0,
        bb_tb_gizi_kurang: parseInt(bb_tb_gizi_kurang) || 0,
        persen_gizi_kurang: parseFloat(persen_gizi_kurang) || 0.0, // Ubah ke float
        bb_tb_gizi_buruk: parseInt(bb_tb_gizi_buruk) || 0,
        persen_gizi_buruk: parseFloat(persen_gizi_buruk) || 0.0, // Ubah ke float
        laporan_tanggal: new Date(),
      },
    });
    res
      .status(200)
      .json({ message: 'Data updated successfully', data: updatedLaporan });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error updating data' });
  }
});

// **DELETE** - Menghapus data laporan gizi berdasarkan ID
app.delete('/api/data/laporan-gizi/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedLaporan = await prisma.gizi.delete({
      where: { id: parseInt(id) },
    });
    res
      .status(200)
      .json({ message: 'Data deleted successfully', data: deletedLaporan });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: 'Error deleting data' });
  }
});
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

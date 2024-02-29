import express from 'express';
import axios from 'axios';
import multer from 'multer';

const router = express.Router();
const upload = multer(); // No need for the storage configuration

router.route('/').post(upload.single('file'), async (req, res) => {
  try {
    
    const imageBuffer = req.file.buffer;
  
    const response = await axios.post('http://localhost:5000/upload', {
      image: imageBuffer.toString('base64'),
    });

   
    console.log(response.data);

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

export default router;
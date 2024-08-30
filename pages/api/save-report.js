import dbConnect from '@/lib/db';
import Report from '@/models/report';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, email, incidentType, location, description } = req.body;

      const newReport = new Report({
        name,
        email,
        incidentType,
        location,
        description,
      });

      await newReport.save();

      res.status(201).json({ success: true, data: newReport });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

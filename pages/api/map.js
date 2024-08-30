import dbConnect from '@/lib/db';
import MapTag from '@/models/MapTag';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name, description, latitude, longitude } = req.body;

      // Create a new map tag
      const newTag = new MapTag({
        name,
        description,
        latitude,
        longitude,
      });

      // Save the new tag to the database
      await newTag.save();

      // Respond with the newly created tag
      res.status(201).json({ success: true, data: newTag });
    } catch (error) {
      console.error('Error saving the map tag:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    try {
      // Fetch all map tags from the database
      const tags = await MapTag.find({});
      res.status(200).json({ success: true, data: tags });
    } catch (error) {
      console.error('Error fetching map tags:', error);
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}

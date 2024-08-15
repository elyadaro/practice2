export default async function handler(req, res) {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcLug_IKOMlSlUjoe-fytNBLtUiQnKPsCxwkYHfPZphfxJal4Ydddeg1wJ_lilUo4l/exec';

  console.log('Received request:', req.method);

  if (req.method === 'GET') {
    try {
      console.log('Fetching data from:', SCRIPT_URL);
      const response = await fetch(SCRIPT_URL);
      const data = await response.json();
      console.log('Received data:', data);
      res.status(200).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'Failed to fetch data' });
    }
  } else if (req.method === 'POST') {
    try {
      const { key, value } = req.body;
      console.log('Posting data:', { key, value });
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ key, value }),
      });
      const result = await response.json();
      console.log('Received response:', result);
      res.status(200).json(result);
    } catch (error) {
      console.error('Error posting data:', error);
      res.status(500).json({ error: 'Failed to post data' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

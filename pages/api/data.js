export default async function handler(req, res) {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwcLug_IKOMlSlUjoe-fytNBLtUiQnKPsCxwkYHfPZphfxJal4Ydddeg1wJ_lilUo4l/exec';

  if (req.method === 'GET') {
    const response = await fetch(SCRIPT_URL);
    const data = await response.json();
    res.status(200).json(data);
  } else if (req.method === 'POST') {
    const { key, value } = req.body;
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
    const result = await response.json();
    res.status(200).json(result);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

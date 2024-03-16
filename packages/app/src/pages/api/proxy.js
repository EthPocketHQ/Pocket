export default async function handler(req, res) {
  const url = 'https://safe-transaction-mainnet.safe.global/api/v1/safes/' + req.query.safeAddress + '/balances?trusted=true&exclude_spam=true';

  try {
    const apiResponse = await fetch(url, {
      method: 'GET', // Asegúrate de usar el método adecuado
      headers: {
        // Aquí puedes agregar cualquier encabezado requerido por la API externa
      },
    });

    const data = await apiResponse.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error al realizar la solicitud a la API externa' });
  }
}

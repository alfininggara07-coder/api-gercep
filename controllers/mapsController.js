export const getLocation = async (req, res) => {
  try {
    const { q } = req.query;
    const result = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        q
      )}&format=json&addressdetails=1&limit=5&countrycodes=id`,
      {
        headers: {
          "User-Agent": "GercepApp/1.0 (inggaraalfin07@gmail.com)",
        },
      }
    );
    const data = await result.json();
    res.json({
      code: 200,
      status: "OK",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      code: 500,
      status: "Internal Server Error",
      message: error.message,
    });
  }
};

import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/orcid/:orcidId", async (req, res) => {
  const { orcidId } = req.params;
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const url = `https://api.orcid.org/v3.0/${orcidId}/activities`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: token,
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch ORCID data" });
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching ORCID data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});

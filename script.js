document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.getElementById("query").value.trim();
  if (!query) return;

  document.getElementById("results").classList.remove("hidden");
  document.getElementById("nameTitle").textContent = query;

  // Enlaces públicos
  document.getElementById("googleLink").href =
    `https://www.google.com/search?q=${encodeURIComponent(query + " heritage family background")}`;

  document.getElementById("wikiLink").href =
    `https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/ /g, "_"))}`;

  document.getElementById("newsLink").href =
    `https://news.google.com/search?q=${encodeURIComponent(query)}`;

  // Intentar obtener resumen de Wikipedia
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, "_"))}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    let summaryText = "";
    let heritageInfo = "";

    if (data.extract) {
      summaryText = data.extract;

      // Buscar menciones relevantes
      const lower = summaryText.toLowerCase();

      const keywords = [
        "jewish",
        "judaism",
        "heritage",
        "family",
        "background",
        "born",
        "parents",
        "ancestry",
        "religion"
      ];

      const found = keywords.filter(k => lower.includes(k));

      if (found.length > 0) {
        heritageInfo = `<strong>Origen familiar / cultural (según Wikipedia):</strong><br>
        Wikipedia menciona información relacionada con origen familiar, cultural o religioso.`;
      } else {
        heritageInfo = `<strong>Origen familiar / cultural:</strong><br>
        No hay información pública disponible sobre origen cultural o religioso.`;
      }

    } else {
      summaryText = "No public summary available. Use the links below to explore more information.";
      heritageInfo = `<strong>Origen familiar / cultural:</strong><br>
      No hay información pública disponible sobre origen cultural o religioso.`;
    }

    document.getElementById("summary").innerHTML =
      `<strong>Resumen público:</strong><br>${summaryText}<br><br>${heritageInfo}`;

  } catch {
    document.getElementById("summary").textContent =
      "Unable to load public information. Try the links below.";
  }
});

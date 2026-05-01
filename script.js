document.getElementById("searchForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const query = document.getElementById("query").value.trim();
  if (!query) return;

  document.getElementById("results").classList.remove("hidden");
  document.getElementById("nameTitle").textContent = query;

  // Enlaces públicos
  document.getElementById("googleLink").href =
    `https://www.google.com/search?q=${encodeURIComponent(query + " jewish heritage")}`;

  document.getElementById("wikiLink").href =
    `https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/ /g, "_"))}`;

  document.getElementById("newsLink").href =
    `https://news.google.com/search?q=${encodeURIComponent(query)}`;

  // Intentar obtener resumen de Wikipedia
  const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query.replace(/ /g, "_"))}`;

  try {
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (data.extract) {
      document.getElementById("summary").textContent = data.extract;
    } else {
      document.getElementById("summary").textContent =
        "No public summary available. Use the links below to explore more information.";
    }
  } catch {
    document.getElementById("summary").textContent =
      "Unable to load public information. Try the links below.";
  }
});

import MeiliSearch from "meilisearch";

const SearchClient = new MeiliSearch({
  host: process.env.SEARCH_HOST as string,
  apiKey: process.env.SEARCH_API_KEY,
});

export default SearchClient;

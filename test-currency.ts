import { fetchCountriesWithCurrencies } from "./src/server/services/currency.service";

async function main() {
  try {
    const data = await fetchCountriesWithCurrencies();
    console.log(`Success! Fetched ${data.length} countries.`);
    console.log(data.slice(0, 3));
  } catch (err) {
    console.error("Failed:", err);
  }
}

main();

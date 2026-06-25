import { ingestAll } from "../src/services/ingestion.js";

const results = await ingestAll();

for (const result of results) {
  if (result.status === "ingested") {
    console.log(`✅ ${result.fileName} — ${result.chunkCount} chunks ingested`);
  } else {
    console.log(`❌ ${result.fileName} — ${result.error}`);
  }
}

console.log(`\nDone. ${results.filter((r) => r.status === "ingested").length}/${results.length} succeeded.`);
process.exit(results.some((r) => r.status === "error") ? 1 : 0);

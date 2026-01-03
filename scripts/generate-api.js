// scripts/generate-api.js
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const OPENAPI_URL = "http://127.0.0.1:8000/api/openapi.json";
const OUTPUT_FILE = path.join(__dirname, "../openapi.json"); // Temporary file
const OUTPUT_DIR = "./src/api";

async function generate() {
  console.log(`⏳ Fetching OpenAPI spec from ${OPENAPI_URL}...`);

  try {
    // 1. Fetch the JSON manually using Node's native fetch
    const response = await fetch(OPENAPI_URL);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }

    const data = await response.json();

    // 2. Save it to a temporary file
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(data, null, 2));
    console.log("✅ Spec downloaded successfully.");

    // 3. Run the generator using the LOCAL file
    console.log("⚙️  Generating client...");
    execSync(
      `npx openapi --input ${OUTPUT_FILE} --output ${OUTPUT_DIR} --client axios`,
      { stdio: "inherit" },
    );

    // 4. Cleanup (Optional: remove the temp file)
    fs.unlinkSync(OUTPUT_FILE);
    console.log("🚀 API Client generated successfully!");
  } catch (error) {
    console.error("❌ Error generating API client:", error.message);
    if (error.cause) console.error(error.cause);
    process.exit(1);
  }
}

generate();

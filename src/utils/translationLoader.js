
import fs from 'fs';
import path from 'path';
import { parse as csvParse } from 'csv-parse/sync';

/**
 * Loads all *.csv files from `localesDir` and converts them into
 * an i18next `resources` object:
 *
 * {
 *   en_US: {
 *     translation: { "title": "My Title", "home_description": "..." }
 *   },
 *   pt_BR: {
 *     translation: { "title": "Título", "home_description": "..." }
 *   }
 * }
 */
export function loadAllCsvTranslations(localesDir) {
    const resources = {};
    const files = fs.readdirSync(localesDir);

    for (const file of files) {
        if (file.endsWith('.csv')) {
            const langCode = path.basename(file, '.csv'); // e.g. "en_US"
            const csvData = fs.readFileSync(path.join(localesDir, file), 'utf-8');

            const records = csvParse(csvData, {
                skip_empty_lines: true,
                columns: false,
                delimiter: ',',
                trim: true,
                quote: true
            });
            resources[langCode] = { translation: {} };
            for (const row of records) {
                const key = row[0].trim();
                const val = row[1].trim();
                resources[langCode].translation[key] = val;
            }
        }
    }

    return resources;
}

/**
 * Downloads data for the last 12 months from npm registry and save to a JSON file for website usage.
 */

import { outputFileSync } from 'fs-extra';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const PACKAGES = ['whatsapp-web.js', 'create-wwebjs-app'];
const OUTPUT = join(
  dirname(fileURLToPath(import.meta.url)),
  '../apps/website/public/data/npm-downloads.json',
);

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

async function fetchDownloadRange(pkg, start, end) {
  const url = `https://api.npmjs.org/downloads/range/${start}:${end}/${pkg}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`);
  return res.json();
}

async function fetchMonthlyDownloads(pkg, startDate, endDate) {
  console.log(`[${pkg}] ${formatDate(startDate)} → ${formatDate(endDate)}`);

  const { downloads } = await fetchDownloadRange(
    pkg,
    formatDate(startDate),
    formatDate(endDate),
  );

  const downloadsByMonth = new Map();
  for (const { day, downloads: dailyCount } of downloads) {
    const yearMonth = day.slice(0, 7);
    downloadsByMonth.set(
      yearMonth,
      (downloadsByMonth.get(yearMonth) ?? 0) + dailyCount,
    );
  }

  return Array.from(downloadsByMonth.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([yearMonth, total]) => ({
      date: `${yearMonth}-01`,
      downloads: total,
    }));
}

async function main() {
  const today = new Date();
  const endDate = new Date(today.getFullYear(), today.getMonth(), 0);
  const startDate = new Date(
    endDate.getFullYear() - 1,
    endDate.getMonth() + 1,
    1,
  );

  const packageDownloads = await Promise.all(
    PACKAGES.map(async (pkg) => [
      pkg,
      await fetchMonthlyDownloads(pkg, startDate, endDate),
    ]),
  );

  outputFileSync(
    OUTPUT,
    JSON.stringify(Object.fromEntries(packageDownloads), null, 2) + '\n',
  );

  for (const [pkg, monthlyData] of packageDownloads) {
    console.log(`✓ ${pkg}: ${monthlyData.length} months`);
  }
  console.log(`Written to ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

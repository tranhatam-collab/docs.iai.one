import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("apps/docs/public");
const htmlFiles = [];
const failures = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walk(entryPath);
        return;
      }

      if (entry.isFile() && entry.name.endsWith(".html")) {
        htmlFiles.push(entryPath);
      }
    })
  );
}

function normalizeHref(rawHref) {
  if (!rawHref) return null;
  if (
    rawHref.startsWith("http://") ||
    rawHref.startsWith("https://") ||
    rawHref.startsWith("mailto:") ||
    rawHref.startsWith("tel:") ||
    rawHref.startsWith("#")
  ) {
    return null;
  }

  const [href] = rawHref.split("#");
  const [cleanHref] = href.split("?");
  return cleanHref || null;
}

async function pathExists(targetPath) {
  try {
    await stat(targetPath);
    return true;
  } catch {
    return false;
  }
}

function resolveTarget(currentFile, href) {
  if (href.startsWith("/")) {
    return path.join(root, href.slice(1));
  }

  return path.resolve(path.dirname(currentFile), href);
}

async function validateHref(currentFile, href) {
  const normalized = normalizeHref(href);
  if (!normalized) return;

  const candidate = resolveTarget(currentFile, normalized);
  const directExists = await pathExists(candidate);
  if (directExists) return;

  const htmlExists = await pathExists(`${candidate}.html`);
  if (htmlExists) return;

  const indexExists = await pathExists(path.join(candidate, "index.html"));
  if (indexExists) return;

  failures.push({
    file: path.relative(process.cwd(), currentFile),
    href
  });
}

async function main() {
  await walk(root);

  for (const file of htmlFiles) {
    const source = await readFile(file, "utf8");
    const matches = [
      ...source.matchAll(/\bhref="([^"]+)"/g),
      ...source.matchAll(/\bsrc="([^"]+)"/g)
    ];
    for (const match of matches) {
      await validateHref(file, match[1]);
    }
  }

  if (failures.length) {
    console.error("Broken local links detected:");
    failures.forEach((failure) => {
      console.error(`- ${failure.file} -> ${failure.href}`);
    });
    process.exitCode = 1;
    return;
  }

  console.log(`Validated ${htmlFiles.length} HTML files. No broken local links found.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

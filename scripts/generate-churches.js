const fs = require('fs');
const path = require('path');

const churchesDir = path.join(__dirname, '..', 'docs', 'churches');
const outputFile = path.join(__dirname, '..', 'src', 'data', 'churches.json');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-zа-яё0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateChurches() {
  const churches = [];

  const folders = fs.readdirSync(churchesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name);

  folders.forEach(folder => {
    const categoryPath = path.join(churchesDir, folder, '_category_.json');
    
    if (!fs.existsSync(categoryPath)) {
      console.warn(`⚠️  Пропущено: ${folder} (нет _category_.json)`);
      return;
    }

    try {
      const category = JSON.parse(fs.readFileSync(categoryPath, 'utf-8'));
      const props = category.customProps || {};

      const docs = fs.readdirSync(path.join(churchesDir, folder), { withFileTypes: true })
        .filter(dirent => dirent.isFile() && (dirent.name.endsWith('.md') || dirent.name.endsWith('.mdx')))
        .map(dirent => {
          const content = fs.readFileSync(path.join(churchesDir, folder, dirent.name), 'utf-8');
          const titleMatch = content.match(/^title:\s*(.+)$/m);
          const title = titleMatch ? titleMatch[1].trim() : dirent.name.replace(/\.mdx?$/, '');
          return {
            filename: dirent.name,
            title: title,
            url: `/docs/churches/${folder}/${dirent.name.replace(/\.mdx?$/, '').replace(/\s+/g, '-')}`
          };
        });

      // URL категории прихода
      const categorySlug = slugify(category.label || folder);
      const categoryUrl = `/docs/category/${categorySlug}`;

      churches.push({
        id: folder,
        name: category.label || folder,
        full_name: category.label || folder,
        type: props.type || 'orthodox',
        district: 'Восточно-Казахстанская область',
        lat: props.lat || 50.5,
        lng: props.lng || 82.0,
        founded: props.founded || '',
        description: props.description || '',
        doc_url: categoryUrl,
        docs: docs
      });

      console.log(`✅ Добавлено: ${category.label} (${docs.length} документов) → ${categoryUrl}`);
    } catch (error) {
      console.error(` Ошибка в ${folder}:`, error.message);
    }
  });

  fs.writeFileSync(outputFile, JSON.stringify(churches, null, 2), 'utf-8');
  console.log(`\n Сгенерировано ${churches.length} приходов → ${outputFile}`);
}

generateChurches();
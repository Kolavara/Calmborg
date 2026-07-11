const fs = require('fs');

let content = fs.readFileSync('src/app/products/page.tsx', 'utf8');

// 1. Add state for main category
if (!content.includes('const [activeMainCategory,')) {
  content = content.replace(
    'const [activeCategory, setActiveCategory] = useState<string | null>(null);',
    `const [activeMainCategory, setActiveMainCategory] = useState<string>("All");\n  const [activeCategory, setActiveCategory] = useState<string | null>(null);`
  );
}

// 2. Update the filter logic
const startFilter = content.indexOf('const filteredCategories = productCategories.filter');
const endFilter = content.indexOf('return matchesSearch && matchesCategory;\n  });');

if (startFilter !== -1 && endFilter !== -1) {
  const filterBlock = content.substring(startFilter, endFilter + 'return matchesSearch && matchesCategory;\n  });'.length);
  
  const newFilterLogic = `const filteredCategories = productCategories.filter((cat) => {
    const matchesSearch =
      searchQuery === "" ||
      cat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.products.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
    // @ts-ignore
    const matchesMainCategory = activeMainCategory === "All" || cat.mainCategory === activeMainCategory;
    const matchesCategory =
      activeCategory === null || cat.id === activeCategory;
    return matchesSearch && matchesMainCategory && matchesCategory;
  });
  
  // @ts-ignore
  const visibleSubCategories = activeMainCategory === "All" ? productCategories : productCategories.filter(cat => cat.mainCategory === activeMainCategory);
  const mainCategories = ["All", "Cutting Tools", "Tool Holders", "Work Holding System", "Accessories", "Measuring Touch Probes"];`;

  content = content.replace(filterBlock, newFilterLogic);
}

// 3. Update the UI layout
const startUI = content.indexOf('{/* Category Filter Grouped */}');
const endUI = content.indexOf('</section>', startUI);

if (startUI !== -1 && endUI !== -1) {
  const newUI = `{/* Main Category Tabs */}
              <div className="flex flex-wrap gap-2 pb-4 border-b border-[var(--border-shadow)]/30">
                {mainCategories.map((mainCat) => (
                  <button
                    key={mainCat}
                    onClick={() => {
                      setActiveMainCategory(mainCat);
                      setActiveCategory(null); // Reset sub-category when changing main
                    }}
                    className={\`rounded-lg px-5 py-3 font-sans text-sm font-bold tracking-wide transition-all \${
                      activeMainCategory === mainCat
                        ? "bg-[var(--accent)] text-white shadow-[2px_2px_6px_rgba(255,71,87,0.3)]"
                        : "bg-[var(--background)] text-[var(--text-muted)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-pressed)]"
                    }\`}
                  >
                    {mainCat}
                  </button>
                ))}
              </div>

              {/* Sub Category Filter */}
              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={\`rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all \${
                    activeCategory === null
                      ? "bg-[var(--dark-surface)] text-white shadow-[2px_2px_6px_rgba(0,0,0,0.3)]"
                      : "bg-[var(--muted)] text-[var(--text-muted)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-pressed)]"
                  }\`}
                >
                  All {activeMainCategory !== "All" ? activeMainCategory : "Products"}
                </button>
                {visibleSubCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() =>
                      setActiveCategory(
                        activeCategory === cat.id ? null : cat.id
                      )
                    }
                    className={\`rounded-lg px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-wider transition-all \${
                      activeCategory === cat.id
                        ? "bg-[var(--dark-surface)] text-white shadow-[2px_2px_6px_rgba(0,0,0,0.3)]"
                        : "bg-[var(--muted)] text-[var(--text-muted)] shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-pressed)]"
                    }\`}
                  >
                    {cat.title}
                  </button>
                ))}
              </div>\n            `;

  const before = content.substring(0, startUI);
  const after = content.substring(endUI);
  content = before + newUI + after;
} else {
  console.error("UI markers not found");
  process.exit(1);
}

fs.writeFileSync('src/app/products/page.tsx', content);
console.log('Successfully updated to 2-tier tabs');

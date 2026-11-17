import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PRODUCT_CATEGORIES,
  PRODUCTS,
  type ProductCategoryId,
} from '../data/ambiluxData';
import MediaFrame from '../components/MediaFrame';
import { Reveal, StaggerHeading, useDocumentMeta } from '../components/Reveal';

interface ProductsPageProps {
  initialCategory?: string;
  onNavigate: (path: string) => void;
}

export default function ProductsPage({ initialCategory, onNavigate }: ProductsPageProps) {
  const validCategoryIds = new Set(PRODUCT_CATEGORIES.map((c) => c.id));
  const resolvedInitial: 'all' | ProductCategoryId =
    initialCategory && validCategoryIds.has(initialCategory as ProductCategoryId)
      ? (initialCategory as ProductCategoryId)
      : 'all';

  const [selectedCategory, setSelectedCategory] = useState<'all' | ProductCategoryId>(
    resolvedInitial
  );
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setSelectedCategory(resolvedInitial);
    setSelectedSubCategory('All');
  }, [resolvedInitial]);

  useDocumentMeta(
    'Products — AmbiLux | Commercial, Decorative, Geometrical, Acoustic & Outdoor',
    'Explore verified architectural luminaires across Commercial, Decorative, Geometrical, Acoustic, and Outdoor series by AmbiLux (Ambient Works).'
  );

  const activeCategoryMeta = PRODUCT_CATEGORIES.find((c) => c.id === selectedCategory);

  const availableSubCategories = useMemo(() => {
    if (selectedCategory === 'all') return [];
    const subSet = new Set(
      PRODUCTS.filter((p) => p.category === selectedCategory).map((p) => p.subCategory)
    );
    return ['All', ...Array.from(subSet)];
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;
      if (selectedSubCategory !== 'All' && product.subCategory !== selectedSubCategory) {
        return false;
      }
      if (!q) return true;
      return (
        product.code.toLowerCase().includes(q) ||
        product.name.toLowerCase().includes(q) ||
        product.subCategory.toLowerCase().includes(q) ||
        (product.housing?.toLowerCase().includes(q) ?? false) ||
        (product.wattage?.toLowerCase().includes(q) ?? false)
      );
    });
  }, [selectedCategory, selectedSubCategory, searchQuery]);

  const handleCategoryChange = (cat: 'all' | ProductCategoryId) => {
    setSelectedCategory(cat);
    setSelectedSubCategory('All');
  };

  return (
    <div>
      {/* Editorial Catalogue Header (Light Ground) */}
      <section className="relative z-20 bg-[#F7F6F2] pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <p className="font-mono-num text-xs font-medium tracking-widest text-[#555555] uppercase">
            Architectural Luminaire Catalogue · {PRODUCTS.length} Verified Series Models
          </p>
          <StaggerHeading
            lines={[
              { text: 'Precision lighting fixtures' },
              { text: 'across five collections.', accent: true },
            ]}
            className="mt-4 max-w-4xl font-display text-4xl leading-[1.04] font-bold tracking-tight text-[#171717] sm:text-6xl"
          />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#555555]">
            Browse verified luminaire dimensions, optical housings, wattages, beam angles, and
            control compatibility directly from the Ambient Works specification catalogue.
          </p>

          {/* Segmented Category Filter Tabs */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-b border-[#171717]/12 pb-6">
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Product categories">
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategory === 'all'}
                onClick={() => handleCategoryChange('all')}
                className={`relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'text-[#F7F6F2]'
                    : 'bg-[#ECEAE3] text-[#171717] hover:bg-[#171717]/10'
                }`}
              >
                {selectedCategory === 'all' && (
                  <motion.span
                    layoutId="active-cat-tab"
                    transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                    className="absolute inset-0 rounded-lg bg-[#171717]"
                  />
                )}
                <span className="relative z-10">All Series ({PRODUCTS.length})</span>
              </button>

              {PRODUCT_CATEGORIES.map((cat) => {
                const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                const active = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`relative rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${
                      active
                        ? 'text-[#F7F6F2]'
                        : 'bg-[#ECEAE3] text-[#171717] hover:bg-[#171717]/10'
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-cat-tab"
                        transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                        className="absolute inset-0 rounded-lg bg-[#171717]"
                      />
                    )}
                    <span className="relative z-10">
                      {cat.name} ({count})
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#555555]"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search code, model, wattage..."
                aria-label="Search products"
                className="w-full rounded-lg border border-[#171717]/15 bg-[#FFFFFF] py-2.5 pr-9 pl-10 text-sm text-[#171717] placeholder:text-[#555555]/70 focus:border-[#171717] focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute top-1/2 right-2.5 -translate-y-1/2 rounded p-1 text-[#555555] hover:text-[#171717]"
                >
                  <X className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Sub-Category Filter Strip when category selected */}
          {availableSubCategories.length > 0 && (
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="mr-2 font-mono-num text-xs text-[#555555] uppercase">
                Sub-Series:
              </span>
              {availableSubCategories.map((sub) => (
                <button
                  key={sub}
                  type="button"
                  onClick={() => setSelectedSubCategory(sub)}
                  className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                    selectedSubCategory === sub
                      ? 'border-[#171717] bg-[#171717] text-[#F7F6F2]'
                      : 'border-[#171717]/15 bg-transparent text-[#555555] hover:border-[#171717]/40 hover:text-[#171717]'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          )}

          {/* Active Category Context Banner */}
          {activeCategoryMeta && (
            <Reveal>
              <div className="mt-8 grid items-center gap-8 rounded-xl border border-[#171717]/10 bg-[#ECEAE3] p-6 sm:grid-cols-12 sm:p-8">
                <div className="sm:col-span-7">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="h-2 w-6 rounded-full"
                      style={{ backgroundColor: activeCategoryMeta.accentColor }}
                      aria-hidden="true"
                    />
                    <span className="font-mono-num text-xs text-[#555555] uppercase">
                      Series {activeCategoryMeta.num}
                    </span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#171717] sm:text-3xl">
                    {activeCategoryMeta.name}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#555555] sm:text-base">
                    {activeCategoryMeta.shortDesc}
                  </p>
                </div>
                <div className="sm:col-span-5">
                  <MediaFrame
                    src={activeCategoryMeta.heroImage}
                    alt={activeCategoryMeta.name}
                    aspect="aspect-[16/9]"
                    className="rounded-lg"
                  />
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Product Plate Grid */}
      <section className="relative z-20 bg-[#F7F6F2] pb-24">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {filteredProducts.length === 0 ? (
            <div className="rounded-xl border border-[#171717]/12 bg-[#ECEAE3] p-12 text-center">
              <p className="font-display text-xl font-bold text-[#171717]">
                No luminaires matched “{searchQuery}”.
              </p>
              <p className="mt-2 text-sm text-[#555555]">
                Clear your search query or select All Series to browse the complete catalogue.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedSubCategory('All');
                  setSearchQuery('');
                }}
                className="mt-6 rounded-lg bg-[#171717] px-5 py-2.5 text-sm font-semibold text-[#F7F6F2]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map((product) => {
                const isSceneCover =
                  product.category === 'geometrical';
                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => onNavigate(`/products/${product.id}`)}
                    className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#171717]/10 bg-[#FFFFFF] text-left transition-all duration-300 hover:border-[#171717]/35 hover:shadow-sm"
                  >
                    <div className="border-b border-[#171717]/8 bg-[#ECEAE3] p-5">
                      <MediaFrame
                        src={product.image}
                        alt={product.name}
                        aspect="aspect-[4/3]"
                        fit={isSceneCover ? 'cover' : 'contain'}
                        imgClassName="group-hover:scale-105"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between p-5">
                      <div>
                        <p className="font-mono-num text-xs text-[#555555]">
                          {product.code} · {product.subCategory}
                        </p>
                        <h3 className="mt-1.5 font-display text-lg leading-snug font-bold text-[#171717] transition-colors group-hover:text-[#1685C7]">
                          {product.name}
                        </h3>
                      </div>

                      <div className="mt-5 space-y-1.5 border-t border-[#171717]/10 pt-4 font-mono-num text-xs text-[#555555]">
                        {product.wattage && (
                          <div className="flex justify-between gap-2">
                            <span>Wattage</span>
                            <span className="font-medium text-[#171717]">{product.wattage}</span>
                          </div>
                        )}
                        {product.dimension && (
                          <div className="flex justify-between gap-2">
                            <span>Dimension</span>
                            <span className="truncate font-medium text-[#171717]">
                              {product.dimension}
                            </span>
                          </div>
                        )}
                        {!product.wattage && !product.dimension && product.options && (
                          <div className="flex justify-between gap-2">
                            <span>Configuration</span>
                            <span className="truncate font-medium text-[#171717]">
                              {product.options[0]}
                            </span>
                          </div>
                        )}
                        <div className="flex items-center justify-between pt-2 font-sans text-xs font-semibold text-[#171717]">
                          <span>Specifications</span>
                          <ArrowUpRight
                            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

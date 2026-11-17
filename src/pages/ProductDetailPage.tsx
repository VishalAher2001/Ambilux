import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react';
import { COMPANY_INFO, PRODUCT_CATEGORIES, PRODUCTS } from '../data/ambiluxData';
import MediaFrame from '../components/MediaFrame';
import { MagneticButton, ParallaxFrame, Reveal, useDocumentMeta } from '../components/Reveal';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (path: string) => void;
}

export default function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const product = PRODUCTS.find((p) => p.id === productId);
  const category = product
    ? PRODUCT_CATEGORIES.find((c) => c.id === product.category)
    : undefined;

  useDocumentMeta(
    product
      ? `${product.code} — ${product.name} | AmbiLux Products`
      : 'Product Not Found — AmbiLux',
    product?.description ||
      `${product?.name ?? 'Luminaire'} technical specification and architectural lighting details by AmbiLux (Ambient Works).`
  );

  if (!product) {
    return (
      <section className="bg-[#F7F6F2] pt-36 pb-28">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
          <h1 className="font-display text-3xl font-bold text-[#171717]">
            Fixture specification not found.
          </h1>
          <button
            type="button"
            onClick={() => onNavigate('/products')}
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#171717] px-5 py-3 text-sm font-semibold text-[#F7F6F2]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Products Catalogue</span>
          </button>
        </div>
      </section>
    );
  }

  const specRows: { label: string; value: string }[] = [
    { label: 'Model Code', value: product.code },
    { label: 'Collection', value: category?.name || product.category },
    { label: 'Sub-Series', value: product.subCategory },
    ...(product.housing ? [{ label: 'Housing', value: product.housing }] : []),
    ...(product.mounting ? [{ label: 'Mounting', value: product.mounting }] : []),
    ...(product.diffuser ? [{ label: 'Diffuser / Optics', value: product.diffuser }] : []),
    ...(product.dimension ? [{ label: 'Dimensions', value: product.dimension }] : []),
    ...(product.lengths ? [{ label: 'Standard Lengths', value: product.lengths }] : []),
    ...(product.wattage ? [{ label: 'Wattage', value: product.wattage }] : []),
    ...(product.ledSource ? [{ label: 'LED Source', value: product.ledSource }] : []),
    ...(product.cri ? [{ label: 'CRI', value: product.cri }] : []),
    ...(product.cct ? [{ label: 'CCT Range', value: product.cct }] : []),
    ...(product.ip ? [{ label: 'IP Rating', value: `IP${product.ip}` }] : []),
    ...(product.beamAngle ? [{ label: 'Beam Angle', value: product.beamAngle }] : []),
    ...(product.options && product.options.length > 0
      ? [{ label: 'Options & Control', value: product.options.join(' · ') }]
      : []),
    ...(product.notes ? [{ label: 'Catalogue Note', value: product.notes }] : []),
  ];

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const isSceneCover = product.category === 'geometrical';

  return (
    <div className="bg-[#F7F6F2] pt-28 pb-24 lg:pt-36">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        {/* Back Navigation */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#171717]/10 pb-5">
          <button
            type="button"
            onClick={() => onNavigate(`/products?category=${product.category}`)}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#171717] transition-colors hover:text-[#1685C7]"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to {category?.name || 'Products'}</span>
          </button>

          <span className="font-mono-num text-xs text-[#555555]">
            {category?.name} · {product.subCategory} · {product.code}
          </span>
        </div>

        {/* Main Split Spec Showcase */}
        <div className="grid items-start gap-12 lg:grid-cols-12">
          {/* Left Visual Column */}
          <div className="space-y-6 lg:col-span-6">
            <Reveal>
              <div className="rounded-xl border border-[#171717]/10 bg-[#ECEAE3] p-8 sm:p-12">
                <MediaFrame
                  src={product.image}
                  alt={product.name}
                  aspect="aspect-[4/3]"
                  fit={isSceneCover ? 'cover' : 'contain'}
                />
              </div>
            </Reveal>

            {product.contextImage && product.contextImage !== product.image && (
              <Reveal delay={0.1}>
                <div>
                  <p className="mb-3 font-mono-num text-xs text-[#555555] uppercase">
                    Architectural Application Context
                  </p>
                  <ParallaxFrame
                    src={product.contextImage}
                    alt={`${product.subCategory} application context`}
                    aspect="aspect-[16/10]"
                    parallaxOffset={16}
                    className="rounded-xl"
                  />
                </div>
              </Reveal>
            )}
          </div>

          {/* Right Specifications Column */}
          <div className="lg:col-span-6">
            <Reveal>
              <div className="flex items-center gap-2.5">
                {category && (
                  <span
                    className="h-2 w-6 rounded-full"
                    style={{ backgroundColor: category.accentColor }}
                    aria-hidden="true"
                  />
                )}
                <span className="font-mono-num text-xs font-medium text-[#555555] uppercase">
                  {product.code}
                </span>
              </div>

              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#171717] sm:text-5xl">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-5 text-base leading-relaxed text-[#555555]">
                  {product.description}
                </p>
              )}

              {product.options && product.options.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-medium text-[#171717]">
                  {product.options.map((opt) => (
                    <span key={opt} className="inline-flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-[#159447]" aria-hidden="true" />
                      {opt}
                    </span>
                  ))}
                </div>
              )}

              {/* Verified Technical Datasheet Table */}
              <div className="mt-8 rounded-xl border border-[#171717]/12 bg-[#FFFFFF]">
                <div className="border-b border-[#171717]/10 px-6 py-4">
                  <h2 className="font-mono-num text-xs font-semibold tracking-wider text-[#555555] uppercase">
                    Verified Catalogue Specifications
                  </h2>
                </div>
                <dl className="divide-y divide-[#171717]/8">
                  {specRows.map((row) => (
                    <div
                      key={row.label}
                      className="grid gap-1 px-6 py-3.5 sm:grid-cols-12 sm:items-center sm:gap-4"
                    >
                      <dt className="font-mono-num text-xs text-[#555555] sm:col-span-4">
                        {row.label}
                      </dt>
                      <dd className="text-sm font-medium text-[#171717] sm:col-span-8">
                        {row.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Enquiry Call-to-Action */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticButton
                  onClick={() =>
                    onNavigate(
                      `/contact?enquiry=${encodeURIComponent(`${product.code} — ${product.name}`)}`
                    )
                  }
                  className="group inline-flex items-center gap-2.5 rounded-lg bg-[#171717] px-6 py-3.5 text-sm font-semibold text-[#F7F6F2] transition-colors hover:bg-[#F5A623] hover:text-[#171717]"
                >
                  <span>Request Specification / Quote for {product.code}</span>
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </MagneticButton>
              </div>

              <p className="mt-5 text-xs leading-relaxed text-[#555555]">
                {COMPANY_INFO.casambiNote}. Custom finishes, dimensions, and optical accessories
                can be coordinated directly with the {COMPANY_INFO.legalName} technical team.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Related Series Models */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-[#171717]/12 pt-16">
            <Reveal>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="font-mono-num text-xs text-[#555555] uppercase">
                    Same Series
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-[#171717] sm:text-3xl">
                    More in {category?.name}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => onNavigate(`/products?category=${product.category}`)}
                  className="text-sm font-semibold text-[#171717] hover:text-[#1685C7]"
                >
                  View all
                </button>
              </div>
            </Reveal>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((rel) => (
                <button
                  key={rel.id}
                  type="button"
                  onClick={() => onNavigate(`/products/${rel.id}`)}
                  className="group flex flex-col overflow-hidden rounded-xl border border-[#171717]/10 bg-[#FFFFFF] text-left transition-colors hover:border-[#171717]/35"
                >
                  <div className="bg-[#ECEAE3] p-4">
                    <MediaFrame
                      src={rel.image}
                      alt={rel.name}
                      aspect="aspect-[4/3]"
                      fit={rel.category === 'geometrical' ? 'cover' : 'contain'}
                      imgClassName="group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <p className="font-mono-num text-xs text-[#555555]">{rel.code}</p>
                    <h3 className="mt-1 font-display text-base font-bold text-[#171717] group-hover:text-[#1685C7]">
                      {rel.name}
                    </h3>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

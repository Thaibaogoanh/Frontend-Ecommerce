import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useProduct } from '../hooks/useProduct';
import { ProductCard } from './shared/ProductCard';

const ITEMS_PER_VIEW = 4;

export function ProductRecommendations() {
  const { products, loading, error, loadProducts } = useProduct();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    loadProducts({ limit: 8 });
  }, [loadProducts]);

  const maxIndex = Math.max(0, products.length - ITEMS_PER_VIEW);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  if (loading && products.length === 0) {
    return null;
  }

  if (error) {
    console.error('Failed to load recommendations:', error);
    return null;
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-['Lato'] uppercase tracking-wider mb-2">
              You Might Also Love
            </h2>
            <p className="text-gray-600">
              Các sản phẩm được gợi ý dựa trên sở thích của bạn
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={next}
              disabled={currentIndex >= maxIndex}
              className="border border-gray-300 p-2 rounded-full hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{
              transform: `translateX(-${currentIndex * (100 / ITEMS_PER_VIEW)}%)`,
            }}
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0"
                style={{ width: `calc(${100 / ITEMS_PER_VIEW}% - 12px)` }}
              >
                <ProductCard
                  product={product}
                  viewMode="grid"
                  showEcoBadges={true}
                  showCustomizeButton={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1 rounded-full transition-all ${
                currentIndex === index
                  ? 'bg-[#ca6946] w-8'
                  : 'bg-gray-300 w-1'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

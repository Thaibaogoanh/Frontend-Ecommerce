import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const recommendations = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1655141559787-25ac8cfca72f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGVkJTIwdHNoaXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Cotton T Shirt",
    name: "Basic Heavy Weight T-shirt",
    price: 199000,
    colors: 5,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1610518066693-8c9f6d3d6455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwb2dyYXBoeSUyMGRlc2lnbnxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Eco Design",
    name: "Vintage Typography Print",
    price: 249000,
    colors: 3,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1596723524688-176682618fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFuayUyMHdoaXRlJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Premium Blank",
    name: "Organic Cotton Basic Tee",
    price: 189000,
    colors: 5,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1759738099669-d64b0656f6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmYWJyaWMlMjB0ZXh0aWxlfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Henley Style",
    name: "Bamboo Blend Henley",
    price: 349000,
    colors: 4,
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwaG9vZGllfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Hoodie",
    name: "Eco Fleece Full Zip",
    price: 599000,
    colors: 2,
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1676134893614-fc13ef156284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMHBhdHRlcm58ZW58MXx8fHwxNjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Design Print",
    name: "Abstract Art Collection",
    price: 279000,
    colors: 4,
  },
];

export function ProductRecommendations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;
  const maxIndex = Math.max(0, recommendations.length - itemsPerView);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-['Lato'] uppercase tracking-wider mb-2">
              You Might Also Love
            </h2>
            <p className="text-gray-600">Các sản phẩm được gợi ý dựa trên sở thích của bạn</p>
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
            className="flex transition-transform duration-500 ease-in-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerView + 1.5)}%)`,
            }}
          >
            {recommendations.map((product) => (
              <div
                key={product.id}
                className="flex-shrink-0 w-[calc(25%-18px)] group cursor-pointer"
              >
                <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all">
                  <div className="relative overflow-hidden aspect-[3/4]">
                    <ImageWithFallback
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Favorite button */}
                    <button className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
                      <Heart className="w-5 h-5" />
                    </button>

                    {/* Quick add button */}
                    <button className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-[#ca6946] text-white px-6 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#b55835] whitespace-nowrap">
                      Add to Cart
                    </button>
                  </div>

                  <div className="p-4 space-y-2">
                    <p className="text-gray-500 text-sm">{product.category}</p>
                    <h3 className="font-['Lato']">{product.name}</h3>
                    <div className="flex items-center justify-between">
                      <p className="font-['Lato']">{product.price.toLocaleString('vi-VN')}₫</p>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-white border border-gray-400"></div>
                        <span className="text-gray-500 text-sm">+{product.colors}</span>
                      </div>
                    </div>
                  </div>
                </div>
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
                currentIndex === index ? 'bg-[#ca6946] w-8' : 'bg-gray-300 w-1'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
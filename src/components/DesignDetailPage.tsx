import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Heart, Share2, ChevronRight, Leaf, ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { useState } from 'react';

const design = {
  id: 1,
  title: "Minimalist Nature",
  artist: "Green Artist",
  artistAvatar: "https://images.unsplash.com/photo-1655141559812-42f8c1e8942d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwdHNoaXJ0JTIwcHJpbnR8ZW58MXx8fHwxNzYzODU1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  description: "A beautiful minimalist design celebrating nature and sustainability. Perfect for eco-conscious individuals who appreciate clean, modern aesthetics.",
  category: "Nature",
  tags: ["eco", "minimal", "leaf", "nature", "green", "sustainable"],
  price: 450000,
  likes: 234,
  views: 1520,
  sales: 89,
  rating: 4.8,
  reviews: 45,
  isEco: true,
  isTrending: true,
  images: [
    "https://images.unsplash.com/photo-1655141559787-25ac8cfca72f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGVkJTIwdHNoaXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1553474432-4202a2d5f6b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0c2hpcnQlMjBtb2NrdXAlMjBkaXNwbGF5fGVufDF8fHx8MTc2Mzg1NTY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1748712073377-5c200bf4cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBwbGFudHxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    "https://images.unsplash.com/photo-1758708536099-9f46dc81fffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjB0b3RlJTIwYmFnfGVufDF8fHx8MTc2Mzg1NTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  ],
  mockups: [
    { product: "T-Shirt", image: "https://images.unsplash.com/photo-1655141559787-25ac8cfca72f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGVkJTIwdHNoaXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { product: "Hoodie", image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwaG9vZGllfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { product: "Tote Bag", image: "https://images.unsplash.com/photo-1758708536099-9f46dc81fffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjB0b3RlJTIwYmFnfGVufDF8fHx8MTc2Mzg1NTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ],
  availableProducts: [
    { id: 1, name: "Organic Cotton T-Shirt", price: 299000, image: "https://images.unsplash.com/photo-1596723524688-176682618fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFuayUyMHdoaXRlJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: 2, name: "Eco Fleece Hoodie", price: 599000, image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwaG9vZGllfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { id: 3, name: "Recycled Tote Bag", price: 199000, image: "https://images.unsplash.com/photo-1758708536099-9f46dc81fffc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjB0b3RlJTIwYmFnfGVufDF8fHx8MTc2Mzg1NTY3Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ],
};

const relatedDesigns = [
  { id: 2, image: "https://images.unsplash.com/photo-1655141559812-42f8c1e8942d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFwaGljJTIwdHNoaXJ0JTIwcHJpbnR8ZW58MXx8fHwxNzYzODU1Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", title: "Save The Planet", artist: "Eco Designer", price: 399000 },
  { id: 3, image: "https://images.unsplash.com/photo-1748712073377-5c200bf4cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBwbGFudHxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", title: "Forest Spirit", artist: "Nature Lover", price: 520000 },
  { id: 4, image: "https://images.unsplash.com/photo-1676134893614-fc13ef156284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMHBhdHRlcm58ZW58MXx8fHwxNzYzNzg3Njg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", title: "Ocean Waves", artist: "Blue Artist", price: 480000 },
];

export function DesignDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(design.availableProducts[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("white");
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <div className="flex-1">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <a href="#home" className="hover:text-black">Home</a>
              <ChevronRight className="w-4 h-4" />
              <a href="#designs" className="hover:text-black">Designs</a>
              <ChevronRight className="w-4 h-4" />
              <a href="#designs" className="hover:text-black">{design.category}</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">{design.title}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4 aspect-square rounded-xl overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={design.images[selectedImage]}
                  alt={design.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {design.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#ca6946]' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <ImageWithFallback src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column - Info */}
            <div>
              {/* Badges */}
              <div className="flex gap-2 mb-4">
                {design.isEco && (
                  <div className="bg-[#BCF181] px-3 py-1 rounded-full flex items-center gap-1">
                    <Leaf className="w-4 h-4 text-green-800" />
                    <span className="text-green-800">Eco-Themed</span>
                  </div>
                )}
                {design.isTrending && (
                  <div className="bg-[#ca6946] px-3 py-1 rounded-full flex items-center gap-1 text-white">
                    <TrendingUp className="w-4 h-4" />
                    <span>Trending</span>
                  </div>
                )}
              </div>

              {/* Title */}
              <h1 className="font-['Lora'] mb-2">{design.title}</h1>

              {/* Artist */}
              <div className="flex items-center gap-3 mb-4">
                <ImageWithFallback src={design.artistAvatar} alt={design.artist} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium">by {design.artist}</p>
                  <button className="text-sm text-[#ca6946] hover:underline">View Profile</button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(design.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{design.rating} ({design.reviews})</span>
                </div>
                <span className="text-sm text-gray-600">{design.sales} sold</span>
                <span className="text-sm text-gray-600">{design.likes} likes</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{design.description}</p>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-['Lato'] mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag) => (
                    <span key={tag} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-['Lato'] mb-3">This product includes:</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="font-medium mb-2">{selectedProduct.name}</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>✓ Premium organic cotton</li>
                    <li>✓ Professional eco-friendly printing</li>
                    <li>✓ Pre-designed artwork included</li>
                    <li>✓ Ready to wear</li>
                  </ul>
                </div>
              </div>

              {/* Size & Color */}
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block font-['Lato'] mb-2">Size</label>
                    <Select value={selectedSize} onValueChange={setSelectedSize}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="S">S</SelectItem>
                        <SelectItem value="M">M</SelectItem>
                        <SelectItem value="L">L</SelectItem>
                        <SelectItem value="XL">XL</SelectItem>
                        <SelectItem value="XXL">XXL</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block font-['Lato'] mb-2">Color</label>
                    <Select value={selectedColor} onValueChange={setSelectedColor}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="black">Black</SelectItem>
                        <SelectItem value="gray">Gray</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <label className="block font-['Lato'] mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <button className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">-</button>
                  <input 
                    type="number" 
                    defaultValue="1" 
                    min="1"
                    className="w-20 text-center border-2 border-gray-300 rounded-lg py-2"
                  />
                  <button className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">+</button>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-gray-500 mb-1">Total Price (Product + Design)</p>
                <p className="text-3xl font-bold">
                  {(design.price + selectedProduct.price).toLocaleString('vi-VN')}₫
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Includes design artwork & premium printing
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-6">
                <button className="flex-1 bg-[#ca6946] hover:bg-[#b55835] text-white py-4 rounded-full transition-all flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsLiked(!isLiked)}
                  className={`w-14 h-14 border-2 rounded-full flex items-center justify-center transition-all ${
                    isLiked
                      ? 'border-red-500 bg-red-500 text-white'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                </button>
                <button className="w-14 h-14 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Share2 className="w-6 h-6" />
                </button>
              </div>

              {/* Info Message */}
              <div className="bg-[#BCF181]/20 border border-[#BCF181] rounded-lg p-4 flex items-start gap-3">
                <Leaf className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-green-900 mb-1">Ready-Made Eco Product</p>
                  <p className="text-green-800">This is a complete product with pre-designed artwork. Want to create your own? Visit our <a href="#blanks" className="underline font-medium">Blanks section</a> to customize from scratch.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Product Views */}
          <div className="mb-16">
            <h2 className="font-['Lato'] uppercase tracking-wider mb-6">More Product Views</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {design.mockups.map((mockup, idx) => (
                <div key={idx} className="bg-gray-50 rounded-xl overflow-hidden group cursor-pointer">
                  <ImageWithFallback 
                    src={mockup.image} 
                    alt={`${design.title} - View ${idx + 1}`} 
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="p-4">
                    <p className="font-medium">{design.title}</p>
                    <p className="text-sm text-gray-600">{mockup.product} - {selectedColor} color</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-gray-500 mt-6 text-sm">
              * All images show the same ready-made design on different angles and lighting
            </p>
          </div>

          {/* Related Designs */}
          <div>
            <h2 className="font-['Lato'] uppercase tracking-wider mb-6">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDesigns.map((relatedDesign) => (
                <a
                  key={relatedDesign.id}
                  href="#design-detail"
                  className="group cursor-pointer"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-3">
                    <ImageWithFallback
                      src={relatedDesign.image}
                      alt={relatedDesign.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-['Lato'] mb-1">{relatedDesign.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">by {relatedDesign.artist}</p>
                  <p className="font-medium">{relatedDesign.price.toLocaleString('vi-VN')}₫</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
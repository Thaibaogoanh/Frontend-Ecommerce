import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { Leaf, Recycle, Shield, Award, Star, Truck, RotateCcw, Info, Palette, ChevronRight, Heart } from 'lucide-react';
import { useState } from 'react';

const product = {
  id: 1,
  name: "Áo Phông Organic Cotton Unisex",
  category: "Áo Phông",
  price: 299000,
  rating: 4.8,
  reviews: 124,
  description: "Áo phông cổ tròn basic từ cotton hữu cơ 100%, được chứng nhận GOTS. Thiết kế tối giản, phù hợp cho mọi phong cách. Vải mềm mại, thoáng khí và thân thiện với làn da.",
  images: [
    { url: "https://images.unsplash.com/photo-1596723524688-176682618fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFuayUyMHdoaXRlJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", color: "white" },
    { url: "https://images.unsplash.com/photo-1675239514439-1c128b0cffcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", color: "black" },
    { url: "https://images.unsplash.com/photo-1586940069830-04cdba740ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwaGFuZ2VyfGVufDF8fHx8MTc2Mzg1NTY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", color: "gray" },
    { url: "https://images.unsplash.com/photo-1750343293522-2f08b60a317a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGNsb3RoaW5nJTIwc2hvcHxlbnwxfHx8fDE3NjM4NTU2Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", color: "blue" },
  ],
  certifications: [
    { icon: "https://images.unsplash.com/photo-1603873945428-67b1c22e6450?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwZmFicmljfGVufDF8fHx8MTc2Mzc5NjMzNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", name: "GOTS Certified" },
    { icon: "https://images.unsplash.com/photo-1668506904013-810e73073cfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGRyb3BsZXQlMjBuYXR1cmV8ZW58MXx8fHwxNzYzNzc2NzU0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", name: "OEKO-TEX" },
    { icon: "https://images.unsplash.com/photo-1642402806417-e451280d845b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjBzdXN0YWluYWJpbGl0eXxlbnwxfHx8fDE3NjM4MDMwMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", name: "Fair Trade" },
  ],
  greenBadges: [
    { icon: Leaf, label: "100% Organic Cotton", tooltip: "Cotton hữu cơ được trồng không sử dụng thuốc trừ sâu hóa học" },
    { icon: Recycle, label: "Eco-Friendly Inks", tooltip: "Mực in water-based không độc hại, phân hủy sinh học" },
    { icon: Shield, label: "GOTS Certified", tooltip: "Chứng nhận tiêu chuẩn dệt may hữu cơ toàn cầu" },
    { icon: Award, label: "Fair Trade", tooltip: "Sản xuất công bằng, đảm bảo quyền lợi người lao động" },
  ],
  colors: [
    { name: "White", hex: "#FFFFFF", available: true },
    { name: "Black", hex: "#000000", available: true },
    { name: "Gray", hex: "#6B7280", available: true },
    { name: "Blue", hex: "#3B82F6", available: true },
    { name: "Green", hex: "#10B981", available: false },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
  material: "100% Organic Cotton",
  weight: "180 GSM",
  fit: "Regular Fit",
  inkType: "Water-based Eco Inks",
};

const similarBlanks = [
  { id: 2, image: "https://images.unsplash.com/photo-1675239514439-1c128b0cffcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", name: "Recycled Cotton Tee", price: 259000, rating: 4.6 },
  { id: 3, image: "https://images.unsplash.com/photo-1759738099669-d64b0656f6cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYW1ib28lMjBmYWJyaWMlMjB0ZXh0aWxlfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", name: "Bamboo Blend Henley", price: 349000, rating: 4.9 },
  { id: 4, image: "https://images.unsplash.com/photo-1620799140188-3b2a02fd9a77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFpbiUyMHdoaXRlJTIwaG9vZGllfGVufDF8fHx8MTc2Mzg1NTM5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", name: "Eco Fleece Hoodie", price: 599000, rating: 4.7 },
  { id: 5, image: "https://images.unsplash.com/photo-1695548487486-3649bfc8dd9a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY28lMjBmcmllbmRseSUyMGFwcGFyZWx8ZW58MXx8fHwxNzYzODU1Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", name: "Hemp Cotton Blend", price: 319000, rating: 4.5 },
];

const reviews = [
  {
    id: 1,
    author: "Nguyễn Minh",
    rating: 5,
    date: "2 ngày trước",
    comment: "Chất vải rất mềm mại và thoáng. Mình rất hài lòng với chất lượng phôi áo này. In lên rất đẹp!",
    verified: true,
  },
  {
    id: 2,
    author: "Trần Anh",
    rating: 4,
    date: "1 tuần trước",
    comment: "Áo đẹp, form chuẩn. Giá hơi cao nhưng xứng đáng vì chất lượng tốt và thân thiện môi trường.",
    verified: true,
  },
  {
    id: 3,
    author: "Lê Hương",
    rating: 5,
    date: "2 tuần trước",
    comment: "Mình đã order nhiều màu. Tất cả đều rất đẹp và chất lượng ổn định. Recommend!",
    verified: true,
  },
];

export function BlankDetailPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

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
              <a href="#blanks" className="hover:text-black">Shop</a>
              <ChevronRight className="w-4 h-4" />
              <a href="#blanks" className="hover:text-black">{product.category}</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Left Column - Media Gallery */}
            <div>
              {/* Main Image */}
              <div className="mb-4 aspect-square rounded-xl overflow-hidden bg-gray-100">
                <ImageWithFallback
                  src={product.images[selectedImage].url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-[#ca6946]' : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <ImageWithFallback src={img.url} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Green Certifications */}
              <div className="bg-[#BCF181]/10 rounded-xl p-6">
                <h3 className="font-['Lato'] mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-700" />
                  Green Certifications
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {product.certifications.map((cert, idx) => (
                    <div key={idx} className="text-center">
                      <ImageWithFallback src={cert.icon} alt={cert.name} className="w-16 h-16 mx-auto mb-2 rounded-full object-cover" />
                      <p className="text-sm text-gray-700">{cert.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Product Info */}
            <div>
              {/* Product Name */}
              <h1 className="font-['Lato'] mb-2">{product.name}</h1>
              
              {/* Price */}
              <p className="mb-4">
                <span className="text-gray-500">Từ</span>{' '}
                <span className="font-bold">{product.price.toLocaleString('vi-VN')}₫</span>
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-medium">{product.rating}</span>
                <span className="text-gray-500">({product.reviews} reviews)</span>
              </div>

              {/* Green Badges */}
              <div className="mb-6 pb-6 border-b">
                <h3 className="font-['Lato'] mb-3">Đặc điểm xanh nổi bật</h3>
                <TooltipProvider>
                  <div className="grid grid-cols-2 gap-3">
                    {product.greenBadges.map((badge, idx) => (
                      <Tooltip key={idx}>
                        <TooltipTrigger asChild>
                          <div className="flex items-center gap-2 bg-[#BCF181]/20 px-3 py-2 rounded-lg cursor-help hover:bg-[#BCF181]/30 transition-colors">
                            <badge.icon className="w-4 h-4 text-green-700 flex-shrink-0" />
                            <span className="text-sm text-green-900">{badge.label}</span>
                            <Info className="w-3 h-3 text-green-700 ml-auto" />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>{badge.tooltip}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="font-['Lato'] mb-3">
                  Màu sắc: <span className="font-normal text-gray-600">{selectedColor.name}</span>
                </h3>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => color.available && setSelectedColor(color)}
                      disabled={!color.available}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor.name === color.name
                          ? 'border-[#ca6946] scale-110'
                          : 'border-gray-300'
                      } ${!color.available ? 'opacity-30 cursor-not-allowed' : 'hover:scale-105'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <h3 className="font-['Lato'] mb-3">Kích thước</h3>
                <div className="flex gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 border-2 rounded-lg transition-all ${
                        selectedSize === size
                          ? 'border-black bg-black text-white'
                          : 'border-gray-300 hover:border-black'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="font-['Lato'] mb-3">Số lượng</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex gap-3 mb-6">
                <a 
                  href="#customizer" 
                  className="flex-1 bg-[#ca6946] hover:bg-[#b55835] text-white py-4 rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <Palette className="w-5 h-5" />
                  START DESIGNING
                </a>
                <button className="w-14 h-14 border-2 border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
              </div>

              {/* Short Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

              {/* Shipping & Returns */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Truck className="w-5 h-5 text-gray-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Miễn phí vận chuyển</h4>
                    <p className="text-sm text-gray-600">Cho đơn hàng từ 500.000₫ trở lên</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <RotateCcw className="w-5 h-5 text-gray-700 mt-0.5" />
                  <div>
                    <h4 className="font-medium mb-1">Đổi trả dễ dàng</h4>
                    <p className="text-sm text-gray-600">Trong vòng 30 ngày nếu không hài lòng</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <Tabs defaultValue="description" className="mb-16">
            <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
              <TabsTrigger value="description" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ca6946] px-6 py-3">
                Description
              </TabsTrigger>
              <TabsTrigger value="green" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ca6946] px-6 py-3">
                Green Promise
              </TabsTrigger>
              <TabsTrigger value="reviews" className="rounded-none border-b-2 border-transparent data-[state=active]:border-[#ca6946] px-6 py-3">
                Reviews ({product.reviews})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <div className="max-w-4xl">
                <h3 className="font-['Lato'] mb-4">Chi tiết sản phẩm</h3>
                <p className="text-gray-600 mb-6">{product.description}</p>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Thông số kỹ thuật</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex justify-between">
                        <span>Chất liệu:</span>
                        <span className="font-medium text-black">{product.material}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Trọng lượng vải:</span>
                        <span className="font-medium text-black">{product.weight}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Form dáng:</span>
                        <span className="font-medium text-black">{product.fit}</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Loại mực in:</span>
                        <span className="font-medium text-black">{product.inkType}</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Hướng dẫn bảo quản</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Giặt máy ở nhiệt độ thấp (30°C)</li>
                      <li>• Không sử dụng chất tẩy</li>
                      <li>• Phơi khô tự nhiên</li>
                      <li>• Ủi ở nhiệt độ thấp</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="green" className="mt-6">
              <div className="max-w-4xl">
                <h3 className="font-['Lato'] mb-4">Cam kết xanh của chúng tôi</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#BCF181] rounded-full flex items-center justify-center flex-shrink-0">
                      <Leaf className="w-6 h-6 text-green-800" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Vật liệu hữu cơ 100%</h4>
                      <p className="text-gray-600">
                        Cotton hữu cơ được trồng không sử dụng thuốc trừ sâu hoặc phân bón hóa học. 
                        Được chứng nhận GOTS (Global Organic Textile Standard), đảm bảo quy trình sản xuất 
                        bền vững từ trang trại đến sản phẩm hoàn thiện.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#BCF181] rounded-full flex items-center justify-center flex-shrink-0">
                      <Recycle className="w-6 h-6 text-green-800" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Mực in thân thiện môi trường</h4>
                      <p className="text-gray-600">
                        Sử dụng mực in water-based không chứa PVC và phthalates độc hại. Mực in có thể 
                        phân hủy sinh học, giảm thiểu tác động đến môi trường và an toàn cho người sử dụng.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-12 h-12 bg-[#BCF181] rounded-full flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-green-800" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Sản xuất có trách nhiệm</h4>
                      <p className="text-gray-600">
                        Đối tác sản xuất của chúng tôi được chứng nhận Fair Trade, đảm bảo điều kiện làm việc 
                        công bằng và an toàn cho người lao động. Chúng tôi cam kết carbon-neutral shipping 
                        và sử dụng bao bì có thể tái chế 100%.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="max-w-4xl">
                {/* Review Summary */}
                <div className="flex items-start gap-8 mb-8 pb-8 border-b">
                  <div className="text-center">
                    <p className="mb-2">{product.rating}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600">{product.reviews} reviews</p>
                  </div>

                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3 mb-2">
                        <span className="w-3">{stars}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-400 h-2 rounded-full"
                            style={{ width: `${stars === 5 ? 70 : stars === 4 ? 25 : 5}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 w-12 text-right">
                          {stars === 5 ? 70 : stars === 4 ? 25 : 5}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="pb-6 border-b last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{review.author}</h4>
                            {review.verified && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Verified Purchase
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < review.rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>

                <button className="mt-6 border-2 border-gray-300 hover:border-black px-6 py-3 rounded-full transition-all">
                  Load More Reviews
                </button>
              </div>
            </TabsContent>
          </Tabs>

          {/* Similar Blanks */}
          <div className="mb-12">
            <h2 className="font-['Lato'] uppercase tracking-wider mb-6">Similar Blanks</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {similarBlanks.map((blank) => (
                <div key={blank.id} className="group cursor-pointer">
                  <div className="aspect-[3/4] rounded-lg overflow-hidden mb-3">
                    <ImageWithFallback
                      src={blank.image}
                      alt={blank.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-['Lato'] mb-1">{blank.name}</h3>
                  <div className="flex items-center justify-between">
                    <p>{blank.price.toLocaleString('vi-VN')}₫</p>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{blank.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Designs on This Blank */}
          <div>
            <h2 className="font-['Lato'] uppercase tracking-wider mb-6">Popular Designs on This Blank</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                "https://images.unsplash.com/photo-1655141559787-25ac8cfca72f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmludGVkJTIwdHNoaXJ0JTIwZGVzaWdufGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "https://images.unsplash.com/photo-1610518066693-8c9f6d3d6455?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwb2dyYXBoeSUyMGRlc2lnbnxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "https://images.unsplash.com/photo-1748712073377-5c200bf4cbc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBpbGx1c3RyYXRpb24lMjBwbGFudHxlbnwxfHx8fDE3NjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
                "https://images.unsplash.com/photo-1676134893614-fc13ef156284?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGFydCUyMHBhdHRlcm58ZW58MXx8fHwxNjM4NTUzOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              ].map((img, idx) => (
                <div key={idx} className="group cursor-pointer">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3">
                    <ImageWithFallback
                      src={img}
                      alt={`Design ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Design by Artist {idx + 1}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
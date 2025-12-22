import { Header } from './Header';
// Bỏ import ImageWithFallback để tránh lỗi
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Upload, Type, Image as ImageIcon, RotateCw, Trash2,
  ShoppingCart, ChevronRight, Leaf, ZoomIn, ZoomOut,
} from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react';
import { Rnd } from 'react-rnd';
import html2canvas from 'html2canvas';
import { apiServices } from '../services/apiConfig';
import { useAuth } from '../hooks/useAuth';
import { Loading } from './ui/loading';
import { ErrorDisplay } from './ui/error';

interface CanvasElement {
  id: string;
  type: 'text' | 'image' | 'design';
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export function CustomizerPage() {
  const { getToken } = useAuth();
  const token = getToken();
  const [product, setProduct] = useState<any>(null);
  const [designs, setDesigns] = useState<any[]>([]);
  const [designCategories, setDesignCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedColor, setSelectedColor] = useState<any>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("upload");
  const [zoomLevel, setZoomLevel] = useState(0.8); // Mặc định zoom nhỏ hơn chút để nhìn bao quát
  const [calculatedPrice, setCalculatedPrice] = useState(0);
  const [isCalculatingPrice, setIsCalculatingPrice] = useState(false);
  const [showPrintArea, setShowPrintArea] = useState(false); // Ẩn Print Area mặc định
  const canvasRef = useRef<HTMLDivElement>(null);

  // Text settings
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');

  // Load data khi component mount
  useEffect(() => {
    loadData();
  }, []);

  // Tính giá tiền
  useEffect(() => {
    if (!product || !selectedColor?.hex || !selectedSize) return;
    const fetchPrice = async () => {
      try {
        setIsCalculatingPrice(true);
        const res = await apiServices.customizer.calculatePrice({
          productId: product.id,
          colorCode: selectedColor.hex,
          sizeCode: selectedSize,
          quantity: 1,
          canvasData: {
            elements: canvasElements,
            selectedColor: selectedColor.hex,
            selectedSize: selectedSize,
            quantity: 1,
          },
        }) as any;
        setCalculatedPrice(res.price || 0);
      } catch (e: any) {
        console.error('Error calculating price:', e);
        // Fallback tính giá thủ công nếu API lỗi
        const basePrice = product?.price || 0;
        const designPrice = 45000;
        setCalculatedPrice(
          basePrice +
            canvasElements.filter((el) => el.type === 'design').length *
              designPrice,
        );
      } finally {
        setIsCalculatingPrice(false);
      }
    };
    const timeoutId = setTimeout(() => fetchPrice(), 500);
    return () => clearTimeout(timeoutId);
  }, [canvasElements, selectedSize, selectedColor, product]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      // Lấy ID từ URL hash
      const hashString = window.location.hash.includes('?') ? window.location.hash.split('?')[1] : '';
      const urlParams = new URLSearchParams(hashString);
      const productId = urlParams.get('id') || urlParams.get('productId');

      if (!productId) {
        setError('Không tìm thấy ID sản phẩm. Vui lòng quay lại trang chủ chọn sản phẩm.');
        setLoading(false);
        return;
      }

      const [productData, designsData] = await Promise.all([
        apiServices.products.getById(productId) as Promise<any>,
        apiServices.designs.getAll(1, 100) as Promise<any>
      ]);

      setProduct(productData);
      const designsList = designsData.designs || [];
      setDesigns(designsList);
      setDesignCategories(groupDesignsByCategory(designsList));

      // Set default variants
      if (productData.skuVariants?.length > 0) {
        const firstVariant = productData.skuVariants[0];
        setSelectedSize(firstVariant.size || 'M');
        if (productData.colors?.length > 0) {
          setSelectedColor(productData.colors[0]);
        } else if (firstVariant.color) {
          setSelectedColor({ name: firstVariant.color, hex: '#000000' });
        }
      } else if (productData.colors?.length > 0) {
        setSelectedColor(productData.colors[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Lỗi tải dữ liệu. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const groupDesignsByCategory = (designsList: any[]): any[] => {
    const categoryMap = new Map<string, any[]>();
    designsList.forEach(design => {
      const category = design.category || 'other';
      if (!categoryMap.has(category)) categoryMap.set(category, []);
      categoryMap.get(category)!.push(design);
    });
    const categories: any[] = [];
    categoryMap.forEach((designs, categoryId) => {
      categories.push({ id: categoryId, name: categoryId.toUpperCase(), designs: designs });
    });
    return categories;
  };

  // --- ACTIONS: ADD TEXT/DESIGN ---
  const addText = () => {
    if (!textInput.trim()) return;
    const newElement: CanvasElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: textInput,
      x: 50, y: 50, width: 200, height: 50, rotation: 0,
      fontSize, fontFamily, color: textColor, textAlign,
    };
    setCanvasElements([...canvasElements, newElement]);
    setTextInput("");
  };

  const addDesign = (design: any) => {
    const newElement: CanvasElement = {
      id: `design-${Date.now()}`,
      type: 'design',
      content: design.image,
      x: 20, y: 20, width: 100, height: 100, rotation: 0,
    };
    setCanvasElements([...canvasElements, newElement]);
    setSelectedElement(newElement.id);
  };

  const deleteSelectedElement = () => {
    if (selectedElement) {
      setCanvasElements(canvasElements.filter(el => el.id !== selectedElement));
      setSelectedElement(null);
    }
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setCanvasElements(canvasElements.map(el => el.id === id ? { ...el, ...updates } : el));
  };

  const moveLayer = (index: number, direction: 'up' | 'down') => {
    const newElements = [...canvasElements];
    const targetIndex = canvasElements.length - 1 - index;
    if (direction === 'up' && targetIndex < newElements.length - 1) {
      [newElements[targetIndex], newElements[targetIndex + 1]] = [newElements[targetIndex + 1], newElements[targetIndex]];
    } else if (direction === 'down' && targetIndex > 0) {
      [newElements[targetIndex], newElements[targetIndex - 1]] = [newElements[targetIndex - 1], newElements[targetIndex]];
    }
    setCanvasElements(newElements);
  };

  const capturePreview = async (): Promise<string> => {
    if (!canvasRef.current) return '';
    try {
      const canvas = await html2canvas(canvasRef.current, {
        backgroundColor: null, scale: 0.5, useCORS: true, logging: false,
      });
      return canvas.toDataURL('image/png');
    } catch (err) {
      return '';
    }
  };

  const handleAddToCart = async () => {
    if (!product || !token) {
      alert('Vui lòng đăng nhập trước');
      window.location.hash = '#login';
      return;
    }

    // Validate required fields
    if (!selectedColor?.hex) {
      alert('Vui lòng chọn màu sắc');
      return;
    }

    if (!selectedSize) {
      alert('Vui lòng chọn kích thước');
      return;
    }

    try {
      const previewImage = await capturePreview();
      const customDesignData =
        canvasElements.length > 0
          ? {
              elements: canvasElements.map((el) => ({
                id: el.id,
                type: el.type,
                content: el.content,
                x: el.x,
                y: el.y,
                width: el.width,
                height: el.height,
                rotation: el.rotation || 0,
                fontSize: el.fontSize,
                fontFamily: el.fontFamily,
                color: el.color || textColor,
                textAlign: el.textAlign || textAlign,
              })),
              previewImage: previewImage,
              canvasWidth: 500,
              canvasHeight: 650,
              color: selectedColor.hex,
              size: selectedSize,
            }
          : undefined;

      await apiServices.cart.addItem(
        {
          productId: product.id,
          quantity: 1,
          colorCode: selectedColor.hex,
          sizeCode: selectedSize,
          customDesignData: customDesignData,
        },
        token,
      );
      alert('✅ Thêm vào giỏ hàng thành công!');
      window.location.hash = '#cart';
    } catch (err: any) {
      console.error('Error adding to cart:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Không thể thêm vào giỏ hàng. Vui lòng thử lại.';
      alert(`❌ ${errorMessage}`);
    }
  };

  const handleSaveDesign = async () => {
    if (!product || !token) {
      alert('Vui lòng đăng nhập');
      window.location.hash = '#login';
      return;
    }

    // Validate required fields
    if (!selectedColor?.hex) {
      alert('Vui lòng chọn màu sắc');
      return;
    }

    if (!selectedSize) {
      alert('Vui lòng chọn kích thước');
      return;
    }

    // Validate canvasData structure
    if (!canvasElements || !Array.isArray(canvasElements)) {
      alert('Dữ liệu thiết kế không hợp lệ');
      return;
    }

    try {
      const designName = prompt(
        'Nhập tên cho thiết kế này:',
        `Design ${new Date().toLocaleDateString('vi-VN')}`,
      );

      if (!designName) {
        return; // User cancelled
      }

      const saveData = {
        productId: product.id,
        name: designName.trim() || `Design ${new Date().toLocaleDateString('vi-VN')}`,
        canvasData: {
          elements: canvasElements.map((el) => ({
            id: el.id,
            type: el.type,
            content: el.content,
            x: el.x,
            y: el.y,
            width: el.width,
            height: el.height,
            rotation: el.rotation || 0,
            fontSize: el.fontSize,
            fontFamily: el.fontFamily,
            color: el.color || textColor,
            textAlign: el.textAlign || textAlign,
            designId: el.type === 'design' ? el.content : undefined, // If design type, content might be designId
          })),
          selectedColor: selectedColor.hex,
          selectedSize: selectedSize,
          quantity: 1,
        },
        colorCode: selectedColor.hex,
        sizeCode: selectedSize,
        quantity: 1,
      };

      const savedDesign = await apiServices.customizer.saveDesign(
        saveData,
        token,
      ) as any;

      alert('✅ Đã lưu thiết kế thành công!');
      console.log('Saved design:', savedDesign);
    } catch (err: any) {
      console.error('Error saving design:', err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        'Không thể lưu thiết kế. Vui lòng thử lại.';
      alert(`❌ ${errorMessage}`);
    }
  };

  // --- RENDER ---
  if (loading) return <div className="h-screen flex items-center justify-center"><Loading text="Đang tải thiết kế..." /></div>;
  if (error || !product) return <div className="h-screen flex items-center justify-center"><ErrorDisplay message={error || "Lỗi sản phẩm"} onRetry={loadData} /></div>;

  // Xử lý ảnh sản phẩm (Ưu tiên ảnh màu -> ảnh gốc -> placeholder)
  const productImage = selectedColor?.image || product.image || 'https://placehold.co/500x650/png?text=No+Image';
  const totalPrice = calculatedPrice > 0 ? calculatedPrice : (product?.price || 0);

  return (
    <div className="h-screen w-full bg-white flex flex-col overflow-hidden font-sans">
      <Header />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b px-4 py-2 text-xs flex gap-2 items-center">
        <span className="text-gray-500">Store</span> <ChevronRight className="w-3 h-3"/>
        <span className="font-bold">{product.name}</span>
      </div>

      <div className="flex-1 flex overflow-hidden">
        
        {/* === SIDEBAR TRÁI: CÔNG CỤ === */}
        <aside className="w-[320px] flex flex-col border-r bg-white z-20">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-1 flex flex-col">
            <div className="px-2 pt-2 border-b">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="upload"><Upload className="w-4 h-4" /></TabsTrigger>
                <TabsTrigger value="text"><Type className="w-4 h-4" /></TabsTrigger>
                <TabsTrigger value="designs"><ImageIcon className="w-4 h-4" /></TabsTrigger>
              </TabsList>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto">
              <TabsContent value="upload" className="mt-0">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm font-medium">Tải ảnh lên</p>
                </div>
              </TabsContent>

              <TabsContent value="text" className="mt-0 space-y-4">
                <textarea 
                  value={textInput} 
                  onChange={e => setTextInput(e.target.value)} 
                  className="w-full border p-2 rounded" 
                  placeholder="Nhập chữ ở đây..." 
                />
                <div className="flex gap-2">
                   <input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="h-10 w-10 p-0 border-0 rounded cursor-pointer"/>
                   <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger className="flex-1"><SelectValue/></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                      </SelectContent>
                   </Select>
                </div>
                <Slider value={[fontSize]} onValueChange={v => setFontSize(v[0])} min={10} max={100} step={1} />
                <button onClick={addText} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 font-medium">Thêm Chữ</button>
              </TabsContent>

              <TabsContent value="designs" className="mt-0 space-y-4">
                {designCategories.map((cat, idx) => (
                  <div key={idx}>
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2">{cat.name}</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {cat.designs.map((d: any, i: number) => (
                        <img 
                          key={i} 
                          src={d.image} 
                          className="w-full aspect-square object-cover rounded border hover:border-black cursor-pointer bg-gray-50"
                          onClick={() => addDesign(d)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </div>
          </Tabs>
        </aside>

        {/* === KHU VỰC CHÍNH: CANVAS (NƠI SỬA LỖI) === */}
        {/* Đổi màu nền sang slate-200 để Canvas trắng nổi bật lên */}
        <section className="flex-1 bg-slate-200 relative flex items-center justify-center overflow-hidden p-8">
          
          {/* Controls Zoom */}
          <div className="absolute top-4 bg-white rounded-full shadow-lg px-4 py-2 flex items-center gap-4 z-50">
             <button onClick={()=>setZoomLevel(z => Math.max(0.5, z - 0.1))}><ZoomOut className="w-5 h-5"/></button>
             <span className="font-mono text-sm w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
             <button onClick={()=>setZoomLevel(z => Math.min(2, z + 0.1))}><ZoomIn className="w-5 h-5"/></button>
          </div>

          {/* === CANVAS WRAPPER === */}
          <div 
             className="relative transition-transform duration-200 ease-out shadow-2xl bg-white"
             style={{ 
               transform: `scale(${zoomLevel})`,
               width: '500px', 
               height: '650px' // Kích thước cố định
             }}
          >
             {/* CANVAS NỘI DUNG */}
             <div ref={canvasRef} className="w-full h-full relative bg-white select-none overflow-hidden">
                
                {/* 1. HÌNH NỀN SẢN PHẨM (NẰM DƯỚI CÙNG) */}
                <img 
                   src={productImage} 
                   className="absolute inset-0 w-full h-full object-contain pointer-events-none z-0"
                   alt="Product"
                   onError={(e) => {
                     // Tự động thay thế nếu ảnh lỗi
                     (e.target as HTMLImageElement).src = 'https://placehold.co/500x650/png?text=Product+Image+Error';
                   }}
                />

                {/* 2. KHUNG VÙNG IN (PRINT AREA) - Chỉ hiện khi hover hoặc có elements */}
                <div 
                   className={`absolute border border-dashed z-10 transition-all duration-200 ${
                      showPrintArea || canvasElements.length > 0
                        ? 'border-gray-400 opacity-100' 
                        : 'border-transparent opacity-0'
                   } hover:border-gray-500 hover:opacity-100 group`}
                   style={{
                      top: `${product?.printArea?.top || 22}%`, 
                      left: `${product?.printArea?.left || 28}%`, 
                      width: `${product?.printArea?.width || 44}%`, 
                      height: `${product?.printArea?.height || 55}%`
                   }}
                   onMouseEnter={() => setShowPrintArea(true)}
                   onMouseLeave={() => {
                      if (canvasElements.length === 0) setShowPrintArea(false);
                   }}
                >
                   {/* Label - Chỉ hiện khi hover */}
                   <span className="absolute -top-6 left-0 text-[9px] bg-gray-800 text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-medium uppercase tracking-wider whitespace-nowrap">
                     Vùng in
                   </span>

                   {/* 3. CÁC LAYER KÉO THẢ (NẰM TRONG VÙNG IN) */}
                   {canvasElements.map((el) => (
                      <Rnd
                        key={el.id}
                        default={{ x: 0, y: 0, width: 100, height: 100 }}
                        size={{ width: el.width, height: el.type==='text'?'auto':el.height }}
                        position={{ x: el.x, y: el.y }}
                        onDragStop={(e, d) => { updateElement(el.id, {x:d.x, y:d.y}); setSelectedElement(el.id); }}
                        onResizeStop={(e, dir, ref, delta, pos) => {
                           updateElement(el.id, {
                             width: parseInt(ref.style.width),
                             height: el.type==='text' ? el.height : parseInt(ref.style.height),
                             x: pos.x, y: pos.y
                           });
                        }}
                        bounds="parent"
                        lockAspectRatio={el.type === 'design'}
                        className={`cursor-move ${selectedElement === el.id ? 'ring-2 ring-blue-500' : 'hover:ring-1 hover:ring-blue-300'}`}
                        onClick={(e) => { e.stopPropagation(); setSelectedElement(el.id); }}
                        style={{ zIndex: selectedElement === el.id ? 50 : 10 }}
                      >
                         <div className="w-full h-full relative group">
                            {el.type === 'text' ? (
                               <div style={{
                                  fontSize: el.fontSize, fontFamily: el.fontFamily, color: el.color, 
                                  textAlign: el.textAlign, width: '100%', height: '100%', lineHeight: 1
                               }}>
                                  {el.content}
                               </div>
                            ) : (
                               <img src={el.content} className="w-full h-full object-contain pointer-events-none"/>
                            )}
                            
                            {/* Nút Xóa Nhanh */}
                            {selectedElement === el.id && (
                               <button 
                                 onClick={(e) => { e.stopPropagation(); deleteSelectedElement(); }}
                                 className="absolute -top-3 -right-3 bg-red-500 text-white rounded-full p-1 shadow-sm hover:bg-red-600 z-50"
                               >
                                  <Trash2 className="w-3 h-3"/>
                               </button>
                            )}
                         </div>
                      </Rnd>
                   ))}
                </div>

                {/* 4. LỚP PHỦ TẠO HIỆU ỨNG CHÌM VÀO VẢI (TRÊN CÙNG) */}
                <div 
                   className="absolute inset-0 z-20 pointer-events-none mix-blend-multiply opacity-20"
                   style={{
                      background: 'radial-gradient(circle, transparent 40%, rgba(0,0,0,0.2) 100%)'
                   }}
                />
             </div>
          </div>
          
          <div className="absolute bottom-4 bg-white/90 px-4 py-2 rounded-full text-xs text-green-700 flex items-center gap-2 shadow-sm">
             <Leaf className="w-3 h-3"/> Eco-friendly Printing
          </div>
        </section>

        {/* === SIDEBAR PHẢI: THÔNG TIN === */}
        <aside className="hidden md:flex w-[300px] flex-col border-l bg-white z-20 shadow-sm">
           <div className="p-5 space-y-5 flex-1 overflow-y-auto">
              {/* Product Info */}
              <div className="border-b pb-4">
                 <h2 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h2>
                 <p className="text-sm text-gray-500">SKU: {product.sku || 'N/A'}</p>
              </div>

              {/* Chọn Màu */}
              <div>
                 <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-3">Màu sắc</label>
                 <div className="flex gap-2.5 flex-wrap">
                    {(product.colors || [{hex:'#000', name:'Default'}]).map((c: any, i: number) => (
                       <button 
                         key={i} 
                         onClick={() => setSelectedColor(c)}
                         className={`w-9 h-9 rounded-full border-2 transition-all ${selectedColor?.name === c.name ? 'ring-2 ring-offset-2 ring-gray-900 scale-110 border-gray-900' : 'border-gray-300 hover:border-gray-400'}`}
                         style={{ backgroundColor: c.hex }}
                         title={c.name}
                       />
                    ))}
                 </div>
              </div>

              {/* Chọn Size */}
              <div>
                 <label className="text-xs font-semibold text-gray-700 uppercase tracking-wide block mb-3">Kích thước</label>
                 <div className="grid grid-cols-4 gap-2">
                    {['S','M','L','XL'].map(s => (
                       <button 
                         key={s} 
                         onClick={() => setSelectedSize(s)}
                         className={`h-10 rounded-md border-2 font-semibold text-sm transition-all ${selectedSize === s ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'}`}
                       >
                         {s}
                       </button>
                    ))}
                 </div>
              </div>

              {/* Danh sách lớp */}
              <div className="border-t pt-4">
                 <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Lớp ({canvasElements.length})</span>
                    {canvasElements.length > 0 && (
                       <button 
                          onClick={() => {
                            if (confirm('Bạn có chắc muốn xóa tất cả?')) {
                              setCanvasElements([]);
                              setSelectedElement(null);
                            }
                          }} 
                          className="text-xs text-red-600 hover:text-red-700 hover:underline font-medium"
                       >
                          Xóa hết
                       </button>
                    )}
                 </div>
                 <div className="bg-gray-50 rounded-lg p-3 min-h-[120px] max-h-[220px] overflow-y-auto border border-gray-200">
                    {canvasElements.length === 0 ? (
                       <div className="flex flex-col items-center justify-center h-full py-8">
                          <ImageIcon className="w-8 h-8 text-gray-300 mb-2" />
                          <p className="text-xs text-gray-400 text-center">Chưa có thiết kế nào</p>
                          <p className="text-xs text-gray-400 text-center mt-1">Thêm chữ hoặc hình ảnh để bắt đầu</p>
                       </div>
                    ) : (
                       <div className="space-y-1.5">
                          {[...canvasElements].reverse().map((el, i) => {
                             const actualIndex = canvasElements.length - 1 - i;
                             const isTop = actualIndex === canvasElements.length - 1;
                             const isBottom = actualIndex === 0;
                             return (
                                <div 
                                   key={el.id} 
                                   onClick={() => setSelectedElement(el.id)}
                                   className={`flex items-center gap-2 p-2.5 rounded-md text-sm cursor-pointer transition-colors ${
                                      selectedElement === el.id 
                                         ? 'bg-blue-50 border border-blue-200 text-blue-900' 
                                         : 'bg-white border border-gray-200 hover:bg-gray-50 text-gray-700'
                                   }`}
                                >
                                   <div className="flex items-center gap-1">
                                      {el.type === 'text' ? (
                                         <Type className="w-4 h-4 text-gray-500" />
                                      ) : (
                                         <ImageIcon className="w-4 h-4 text-gray-500" />
                                      )}
                                   </div>
                                   <span className="flex-1 truncate text-xs font-medium">
                                      {el.type === 'text' ? el.content : `Hình ảnh ${i + 1}`}
                                   </span>
                                   <div className="flex items-center gap-0.5">
                                      <button 
                                         onClick={(e) => {
                                            e.stopPropagation();
                                            moveLayer(i, 'up');
                                         }}
                                         disabled={isTop}
                                         className={`p-1 rounded ${isTop ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                         title="Lên trên"
                                      >
                                         <ChevronRight className="w-3 h-3 -rotate-90 text-gray-500" />
                                      </button>
                                      <button 
                                         onClick={(e) => {
                                            e.stopPropagation();
                                            moveLayer(i, 'down');
                                         }}
                                         disabled={isBottom}
                                         className={`p-1 rounded ${isBottom ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                                         title="Xuống dưới"
                                      >
                                         <ChevronRight className="w-3 h-3 rotate-90 text-gray-500" />
                                      </button>
                                      {selectedElement === el.id && (
                                         <button
                                            onClick={(e) => {
                                               e.stopPropagation();
                                               deleteSelectedElement();
                                            }}
                                            className="p-1 rounded hover:bg-red-100 ml-1"
                                            title="Xóa"
                                         >
                                            <Trash2 className="w-3 h-3 text-red-600" />
                                         </button>
                                      )}
                                   </div>
                                </div>
                             );
                          })}
                       </div>
                    )}
                 </div>
              </div>
           </div>

           {/* Footer Action */}
           <div className="p-5 border-t bg-gray-50 space-y-3 sticky bottom-0">
              <div className="flex justify-between items-end pb-2">
                 <span className="text-sm font-medium text-gray-700">Tổng tiền:</span>
                 {isCalculatingPrice ? (
                    <span className="text-sm text-gray-500 animate-pulse">Đang tính...</span>
                 ) : (
                    <span className="text-xl font-bold text-gray-900">{totalPrice.toLocaleString('vi-VN')}₫</span>
                 )}
              </div>
              <button 
                 onClick={handleAddToCart}
                 className="w-full bg-[#ca6946] hover:bg-[#b05a3b] text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 shadow-md transition-all"
              >
                 <ShoppingCart className="w-4 h-4"/> Thêm vào giỏ hàng
              </button>
              <button 
                 onClick={handleSaveDesign} 
                 className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-2.5 rounded-lg font-medium text-sm transition-all"
              >
                 Lưu thiết kế
              </button>
           </div>
        </aside>

      </div>
    </div>
  );
}
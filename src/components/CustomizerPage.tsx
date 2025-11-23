import { ImageWithFallback } from './figma/ImageWithFallback';
import { Header } from './Header';
import { Footer } from './Footer';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Upload, 
  Type, 
  Image as ImageIcon, 
  Palette, 
  RotateCw, 
  Trash2,
  Save,
  ShoppingCart,
  Undo,
  Redo,
  ChevronRight,
  Leaf,
  ZoomIn,
  ZoomOut,
  AlignLeft,
  AlignCenter,
  AlignRight
} from 'lucide-react';
import { useState } from 'react';

const mockBlank = {
  id: 1,
  name: "Organic Cotton T-Shirt",
  price: 299000,
  colors: [
    { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1596723524688-176682618fd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFuayUyMHdoaXRlJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Black", hex: "#000000", image: "https://images.unsplash.com/photo-1675239514439-1c128b0cffcd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwY290dG9uJTIwdHNoaXJ0fGVufDF8fHx8MTc2Mzg1NTM4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
    { name: "Gray", hex: "#9CA3AF", image: "https://images.unsplash.com/photo-1586940069830-04cdba740ba5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvcmdhbmljJTIwdHNoaXJ0JTIwaGFuZ2VyfGVufDF8fHx8MTc2Mzg1NTY3NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" },
  ],
  sizes: ["S", "M", "L", "XL", "XXL"],
};

// 🎨 DESIGN LIBRARY - Organized by Categories
const designCategories = [
  {
    id: "nature",
    name: "🌿 Nature & Plants",
    designs: [
      { 
        id: 1, 
        name: "Botanical Leaf", 
        image: "https://images.unsplash.com/photo-1763308373412-a7c853cacc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFmJTIwYm90YW5pY2FsJTIwaWxsdXN0cmF0aW9ufGVufDF8fHx8MTc2Mzg1NjU3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 50000,
        category: "nature"
      },
      { 
        id: 2, 
        name: "Tree Silhouette", 
        image: "https://images.unsplash.com/photo-1643626760187-2152dfb87a2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmVlJTIwbmF0dXJlJTIwc2lsaG91ZXR0ZXxlbnwxfHx8fDE3NjM4NTY1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 50000,
        category: "nature"
      },
      { 
        id: 3, 
        name: "Floral Botanical", 
        image: "https://images.unsplash.com/photo-1729043252630-7f6baba6987a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbG93ZXIlMjBmbG9yYWwlMjBib3RhbmljYWx8ZW58MXx8fHwxNzYzODU2NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 60000,
        category: "nature"
      },
      { 
        id: 4, 
        name: "Mountain Landscape", 
        image: "https://images.unsplash.com/photo-1695298233687-95a9ed6ce3c1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMG1pbmltYWx8ZW58MXx8fHwxNzYzODU2NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 70000,
        category: "nature"
      },
    ]
  },
  {
    id: "eco",
    name: "♻️ Eco & Sustainability",
    designs: [
      { 
        id: 5, 
        name: "Save The Planet", 
        image: "https://images.unsplash.com/photo-1639653279211-09958a51fb00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYXZlJTIwcGxhbmV0JTIwZWFydGglMjBpY29ufGVufDF8fHx8MTc2Mzg1NjU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 50000,
        category: "eco"
      },
      { 
        id: 6, 
        name: "Recycle Symbol", 
        image: "https://images.unsplash.com/photo-1579756423478-02bc82a97679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xlJTIwc3ltYm9sJTIwZWNvfGVufDF8fHx8MTc2Mzg1NjU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 40000,
        category: "eco"
      },
    ]
  },
  {
    id: "abstract",
    name: "🎨 Abstract & Geometric",
    designs: [
      { 
        id: 7, 
        name: "Geometric Shapes", 
        image: "https://images.unsplash.com/photo-1595411425732-e69c1abe2763?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnZW9tZXRyaWMlMjBzaGFwZXMlMjBhYnN0cmFjdHxlbnwxfHx8fDE3NjM4MDA4OTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 60000,
        category: "abstract"
      },
      { 
        id: 8, 
        name: "Ocean Waves", 
        image: "https://images.unsplash.com/photo-1687268984446-98638d050c2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXZlJTIwb2NlYW4lMjB3YXRlcnxlbnwxfHx8fDE3NjM4NTY1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 70000,
        category: "abstract"
      },
    ]
  },
  {
    id: "celestial",
    name: "✨ Celestial & Stars",
    designs: [
      { 
        id: 9, 
        name: "Sun & Moon", 
        image: "https://images.unsplash.com/photo-1623381502759-e290272d2818?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW4lMjBtb29uJTIwY2VsZXN0aWFsfGVufDF8fHx8MTc2Mzg1NjU3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 60000,
        category: "celestial"
      },
      { 
        id: 10, 
        name: "Star Constellation", 
        image: "https://images.unsplash.com/photo-1568545671788-a12f18193b5a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFyJTIwY29uc3RlbGxhdGlvbiUyMGNlbGVzdGlhbHxlbnwxfHx8fDE3NjM4NTY1Nzd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 55000,
        category: "celestial"
      },
    ]
  },
  {
    id: "animals",
    name: "🦁 Animals & Wildlife",
    designs: [
      { 
        id: 11, 
        name: "Animal Silhouette", 
        image: "https://images.unsplash.com/photo-1584982384062-a777b700e6c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjB3aWxkbGlmZSUyMHNpbGhvdWV0dGV8ZW58MXx8fHwxNzYzODU2NTc2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 65000,
        category: "animals"
      },
    ]
  },
  {
    id: "symbols",
    name: "❤️ Symbols & Icons",
    designs: [
      { 
        id: 12, 
        name: "Heart Symbol", 
        image: "https://images.unsplash.com/photo-1617859047345-a4bafbc36162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFydCUyMGxvdmUlMjBzeW1ib2x8ZW58MXx8fHwxNzYzODMxODY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        price: 45000,
        category: "symbols"
      },
    ]
  },
];

// Flatten all designs for easy access
const allDesigns = designCategories.flatMap(cat => cat.designs);

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
  const [selectedColor, setSelectedColor] = useState(mockBlank.colors[0]);
  const [selectedSize, setSelectedSize] = useState("M");
  const [canvasElements, setCanvasElements] = useState<CanvasElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("upload");

  // Text settings
  const [textInput, setTextInput] = useState("");
  const [fontSize, setFontSize] = useState(32);
  const [fontFamily, setFontFamily] = useState("Arial");
  const [textColor, setTextColor] = useState("#000000");
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');

  const addText = () => {
    if (!textInput.trim()) return;
    
    const newElement: CanvasElement = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: textInput,
      x: 150,
      y: 200,
      width: 200,
      height: 50,
      rotation: 0,
      fontSize,
      fontFamily,
      color: textColor,
      textAlign,
    };
    
    setCanvasElements([...canvasElements, newElement]);
    setTextInput("");
  };

  const addDesign = (design: typeof allDesigns[0]) => {
    const newElement: CanvasElement = {
      id: `design-${Date.now()}`,
      type: 'design',
      content: design.image,
      x: 100,
      y: 150,
      width: 300,
      height: 300,
      rotation: 0,
    };
    
    setCanvasElements([...canvasElements, newElement]);
  };

  const deleteSelectedElement = () => {
    if (selectedElement) {
      setCanvasElements(canvasElements.filter(el => el.id !== selectedElement));
      setSelectedElement(null);
    }
  };

  const updateElement = (id: string, updates: Partial<CanvasElement>) => {
    setCanvasElements(canvasElements.map(el => 
      el.id === id ? { ...el, ...updates } : el
    ));
  };

  const selectedEl = canvasElements.find(el => el.id === selectedElement);

  const totalPrice = mockBlank.price + canvasElements.filter(el => el.type === 'design').length * 450000;

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
              <a href="#blanks" className="hover:text-black">Shop Blanks</a>
              <ChevronRight className="w-4 h-4" />
              <span className="text-black">Customize</span>
            </div>
          </div>
        </div>

        <div className="max-w-[1800px] mx-auto px-4 py-6">
          <div className="grid lg:grid-cols-[300px,1fr,350px] gap-6">
            {/* Left Sidebar - Tools */}
            <aside className="bg-gray-50 rounded-xl p-6 h-fit sticky top-24">
              <h3 className="font-['Lato'] uppercase tracking-wider mb-4">Design Tools</h3>
              
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="upload"><Upload className="w-4 h-4" /></TabsTrigger>
                  <TabsTrigger value="text"><Type className="w-4 h-4" /></TabsTrigger>
                  <TabsTrigger value="designs"><ImageIcon className="w-4 h-4" /></TabsTrigger>
                </TabsList>

                {/* Upload Tab */}
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#BCF181] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="font-medium mb-1">Upload Your Image</p>
                    <p className="text-sm text-gray-600 mb-3">PNG, JPG up to 10MB</p>
                    <button className="bg-black text-white px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors">
                      Choose File
                    </button>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• Recommended: 300 DPI</p>
                    <p>• Min size: 2000x2000px</p>
                    <p>• Transparent background works best</p>
                  </div>
                </TabsContent>

                {/* Text Tab */}
                <TabsContent value="text" className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Your Text</label>
                    <textarea
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Enter your text..."
                      className="w-full px-3 py-2 border border-gray-300 rounded resize-none focus:outline-none focus:border-[#BCF181]"
                      rows={3}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Font Family</label>
                    <Select value={fontFamily} onValueChange={setFontFamily}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Arial">Arial</SelectItem>
                        <SelectItem value="Georgia">Georgia</SelectItem>
                        <SelectItem value="Courier New">Courier New</SelectItem>
                        <SelectItem value="Impact">Impact</SelectItem>
                        <SelectItem value="Verdana">Verdana</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Font Size: {fontSize}px</label>
                    <Slider
                      value={[fontSize]}
                      onValueChange={(value) => setFontSize(value[0])}
                      min={12}
                      max={120}
                      step={1}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Text Color</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="w-12 h-12 rounded border border-gray-300 cursor-pointer"
                      />
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-[#BCF181]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Text Align</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setTextAlign('left')}
                        className={`flex-1 p-2 border rounded transition-colors ${textAlign === 'left' ? 'bg-black text-white' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <AlignLeft className="w-5 h-5 mx-auto" />
                      </button>
                      <button
                        onClick={() => setTextAlign('center')}
                        className={`flex-1 p-2 border rounded transition-colors ${textAlign === 'center' ? 'bg-black text-white' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <AlignCenter className="w-5 h-5 mx-auto" />
                      </button>
                      <button
                        onClick={() => setTextAlign('right')}
                        className={`flex-1 p-2 border rounded transition-colors ${textAlign === 'right' ? 'bg-black text-white' : 'border-gray-300 hover:bg-gray-50'}`}
                      >
                        <AlignRight className="w-5 h-5 mx-auto" />
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={addText}
                    className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-3 rounded-full transition-all"
                  >
                    Add Text to Design
                  </button>
                </TabsContent>

                {/* Designs Tab */}
                <TabsContent value="designs" className="space-y-4">
                  <p className="text-sm text-gray-600">Choose from our design library</p>
                  <div className="space-y-3 max-h-[500px] overflow-y-auto">
                    {allDesigns.map((design) => (
                      <div
                        key={design.id}
                        className="group border border-gray-200 rounded-lg overflow-hidden hover:border-[#BCF181] transition-colors cursor-pointer"
                        onClick={() => addDesign(design)}
                      >
                        <img src={design.image} alt={design.name} className="w-full aspect-square object-cover" />
                        <div className="p-3">
                          <p className="font-medium text-sm mb-1">{design.name}</p>
                          <p className="text-xs text-gray-600">+{design.price.toLocaleString('vi-VN')}₫</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </aside>

            {/* Center - Canvas */}
            <div className="flex flex-col">
              {/* Canvas Header */}
              <div className="bg-gray-50 rounded-t-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <Undo className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <Redo className="w-5 h-5" />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <ZoomIn className="w-5 h-5" />
                  </button>
                  <button className="p-2 hover:bg-gray-200 rounded transition-colors">
                    <ZoomOut className="w-5 h-5" />
                  </button>
                </div>

                {selectedEl && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => selectedEl && updateElement(selectedEl.id, { rotation: (selectedEl.rotation - 15) % 360 })}
                      className="p-2 hover:bg-gray-200 rounded transition-colors"
                    >
                      <RotateCw className="w-5 h-5" />
                    </button>
                    <button
                      onClick={deleteSelectedElement}
                      className="p-2 hover:bg-red-100 text-red-600 rounded transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Canvas Area */}
              <div className="flex-1 bg-gray-100 p-8 flex items-center justify-center rounded-b-xl overflow-hidden">
                <div className="relative bg-white rounded-xl shadow-2xl p-12">
                  {/* T-Shirt Mockup */}
                  <div className="relative w-[500px] h-[600px]">
                    <img
                      src={selectedColor.image}
                      alt={mockBlank.name}
                      className="w-full h-full object-contain pointer-events-none"
                    />
                    
                    {/* Print Area Overlay */}
                    <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[300px] h-[350px] border-2 border-dashed border-gray-300 bg-white/50 overflow-hidden">
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                        Print Area
                      </div>

                      {/* Canvas Elements */}
                      <div className="relative w-full h-full">
                        {canvasElements.map((element) => (
                          <div
                            key={element.id}
                            onClick={() => setSelectedElement(element.id)}
                            className={`absolute cursor-move ${selectedElement === element.id ? 'ring-2 ring-[#ca6946]' : ''}`}
                            style={{
                              left: element.x,
                              top: element.y,
                              width: element.width,
                              height: element.height,
                              transform: `rotate(${element.rotation}deg)`,
                            }}
                          >
                            {element.type === 'text' ? (
                              <div
                                style={{
                                  fontSize: element.fontSize,
                                  fontFamily: element.fontFamily,
                                  color: element.color,
                                  textAlign: element.textAlign,
                                  width: '100%',
                                  height: '100%',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: element.textAlign === 'left' ? 'flex-start' : element.textAlign === 'right' ? 'flex-end' : 'center',
                                }}
                              >
                                {element.content}
                              </div>
                            ) : (
                              <img src={element.content} alt="Design" className="w-full h-full object-contain" />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Canvas Footer */}
              <div className="bg-[#BCF181]/20 rounded-lg p-4 mt-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-green-700" />
                <p className="text-sm text-green-900">
                  This design will be printed on eco-friendly materials using water-based inks
                </p>
              </div>
            </div>

            {/* Right Sidebar - Product Options & Actions */}
            <aside className="space-y-6">
              {/* Product Info */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-['Lato'] mb-4">{mockBlank.name}</h3>
                
                {/* Color Selection */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">Color</label>
                  <div className="flex gap-2">
                    {mockBlank.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color)}
                        className={`w-12 h-12 rounded-full border-2 transition-all ${
                          selectedColor.name === color.name
                            ? 'border-[#ca6946] scale-110'
                            : 'border-gray-300 hover:scale-105'
                        }`}
                        style={{ backgroundColor: color.hex }}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="mb-4">
                  <label className="block font-medium mb-2">Size</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {mockBlank.sizes.map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Blank Product</span>
                    <span>{mockBlank.price.toLocaleString('vi-VN')}₫</span>
                  </div>
                  {canvasElements.filter(el => el.type === 'design').map((el) => (
                    <div key={el.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">Design Added</span>
                      <span>450,000₫</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>{totalPrice.toLocaleString('vi-VN')}₫</span>
                  </div>
                </div>
              </div>

              {/* Layers Panel */}
              {canvasElements.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-['Lato'] mb-3">Layers ({canvasElements.length})</h4>
                  <div className="space-y-2">
                    {canvasElements.map((element, index) => (
                      <div
                        key={element.id}
                        onClick={() => setSelectedElement(element.id)}
                        className={`flex items-center gap-3 p-3 rounded cursor-pointer transition-colors ${
                          selectedElement === element.id
                            ? 'bg-[#BCF181] border border-green-600'
                            : 'bg-white border border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        {element.type === 'text' ? <Type className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                        <span className="flex-1 text-sm truncate">
                          {element.type === 'text' ? element.content : `Design ${index + 1}`}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setCanvasElements(canvasElements.filter(el => el.id !== element.id));
                          }}
                          className="p-1 hover:bg-red-100 rounded"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="space-y-3">
                <button className="w-full bg-[#ca6946] hover:bg-[#b55835] text-white py-4 rounded-full transition-all flex items-center justify-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-full border-2 border-black hover:bg-black hover:text-white py-4 rounded-full transition-all flex items-center justify-center gap-2">
                  <Save className="w-5 h-5" />
                  Save Design
                </button>
                <button className="w-full border border-gray-300 hover:bg-gray-50 py-3 rounded-full transition-all">
                  Reset All
                </button>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-medium mb-2 text-sm">💡 Design Tips</h4>
                <ul className="text-xs text-gray-700 space-y-1">
                  <li>• Keep text readable (min 14pt)</li>
                  <li>• Use high-resolution images</li>
                  <li>• Avoid small details</li>
                  <li>• Consider color contrast</li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
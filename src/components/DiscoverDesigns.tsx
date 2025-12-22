import { useState, useEffect } from 'react';
import { useDesign } from '../hooks/useDesign';
import { DesignGrid } from './shared/DesignGrid';

export function DiscoverDesigns() {
  const { designs, loading, error, loadTrending } = useDesign();

  useEffect(() => {
    loadTrending(6);
  }, [loadTrending]);

  if (loading && designs.length === 0) {
    return null; // Show nothing while loading initial data
  }

  if (error) {
    console.error('Failed to load designs:', error);
    return null; // Silently fail for featured section
  }

  if (designs.length === 0) {
    return null;
  }

  return (
    <section id="designs" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Lato'] uppercase tracking-wider mb-3">
            Discover Unique Designs
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Khám phá hàng trăm thiết kế độc đáo từ cộng đồng nghệ sĩ tài năng. 
            Chọn thiết kế yêu thích và tùy chỉnh trên phôi áo bền vững của bạn.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="px-6 py-2 bg-black text-white rounded-full">
            Tất cả
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-full hover:border-black transition-colors">
            Trending
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-full hover:border-black transition-colors">
            Mới nhất
          </button>
          <button className="px-6 py-2 border border-gray-300 rounded-full hover:border-black transition-colors">
            Phổ biến
          </button>
        </div>

        {/* Designs Grid */}
        <div className="mb-8">
          <DesignGrid 
            designs={designs}
            loading={loading}
            error={error}
            columns={3}
            showStats={true}
            onRetry={() => loadTrending(6)}
            emptyMessage="No designs available"
          />
        </div>

        {/* Load More */}
        <div className="text-center">
          <a
            href="#designs"
            className="inline-block border-2 border-black hover:bg-black hover:text-white px-8 py-3 rounded-full transition-all"
          >
            Explore All Designs ({designs.length + 120})
          </a>
        </div>
      </div>
    </section>
  );
}

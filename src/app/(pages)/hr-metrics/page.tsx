"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Search,
  LayoutGrid,
  UserPlus,
  PieChart,
  Calendar,
  CreditCard,
  TrendingUp,
  Bookmark,
  FileText,
  Clock,
  Link as LinkIcon
} from 'lucide-react';
import { Container } from '@/components/ui';
import { FAQs } from '@/components/home';
import SeoHead from '@/components/seo/SeoHead';
import { hrMetricsData, MetricCategory, HRMetric } from '@/data/hrMetrics';

const categories = [
  { name: 'All Metrics', icon: LayoutGrid },
  { name: 'Recruitment', icon: Search },
  { name: 'Retention', icon: PieChart },
  { name: 'Attendance', icon: Calendar },
  { name: 'Payroll', icon: CreditCard },
  { name: 'Performance', icon: TrendingUp },
] as const;

export default function HRMetricsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<MetricCategory>('All Metrics');
  const [selectedMetricId, setSelectedMetricId] = useState<string>(hrMetricsData[0].id);

  const filteredMetrics = useMemo(() => {
    return hrMetricsData.filter((metric) => {
      const matchesSearch = metric.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All Metrics' || metric.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const selectedMetric = useMemo(() => {
    return hrMetricsData.find((m) => m.id === selectedMetricId) || filteredMetrics[0] || null;
  }, [selectedMetricId, filteredMetrics]);

  // Handle category change - auto select first metric in category
  const handleCategoryChange = (category: MetricCategory) => {
    setSelectedCategory(category);
    const firstMetricInCategory = hrMetricsData.find(
      (m) => category === 'All Metrics' || m.category === category
    );
    if (firstMetricInCategory) {
      setSelectedMetricId(firstMetricInCategory.id);
    }
  };

  return (
    <>
      <SeoHead
        title="HR Metrics | People Consulting"
        description="Track, measure and improve your people performance with the most important HR metrics and formulas."
        canonicalPath="/hr-metrics"
      />

      {/* HEADER SECTION */}
      <div className="bg-slate-50/50 pt-10 pb-6 border-b border-slate-200">
        <Container>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-[11px] uppercase tracking-wider font-bold text-slate-500 mb-4">
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
                <span>&gt;</span>
                <span className="hover:text-primary cursor-pointer transition-colors">
                  Resources
                </span>
                <span>&gt;</span>
                <span className="text-secondary">HR Metrics</span>
              </nav>

              <h1 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                HR Metrics
              </h1>
              
              <p className="text-xs md:text-sm text-slate-600 mt-1 leading-relaxed">
                Track, measure and improve your people performance with the most important HR metrics and formulas used by organizations.
              </p>
            </div>

            <div className="relative w-full md:w-80 lg:w-96 shrink-0">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search for any HR metric..."
                className="block w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl bg-white placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-sm shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </Container>
      </div>

      {/* CATEGORIES SECTION */}
      <section className="py-12 bg-white border-b border-slate-100">
        <Container>
          <h2 className="text-center font-bold text-xl md:text-2xl text-primary mb-8 tracking-tight">
            Explore by Category
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryChange(cat.name as MetricCategory)}
                  className={`flex flex-col items-center justify-center min-w-[100px] h-24 rounded-xl border transition-all duration-200 ${isActive
                    ? 'border-primary/30 bg-primary/5 text-primary shadow-sm'
                    : 'border-slate-200 bg-white text-slate-600 hover:border-primary/30 hover:bg-slate-50'
                    }`}
                >
                  <Icon className={`h-6 w-6 mb-2 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                  <span className="text-xs font-semibold">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {/* MAIN CONTENT SECTION */}
      <section className="py-12 bg-slate-50 min-h-[600px]">
        <Container>
          <div className="flex flex-col lg:flex-row gap-8">

            {/* SIDEBAR: Metrics List */}
            <div className="w-full lg:w-1/4 flex-shrink-0">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden sticky top-24">
                <div className="px-5 py-4 bg-slate-100 border-b border-slate-200">
                  <h3 className="font-bold text-primary text-sm">HR Metrics List</h3>
                </div>
                <div className="flex flex-col max-h-[60vh] overflow-y-auto">
                  {filteredMetrics.length > 0 ? (
                    filteredMetrics.map((metric) => {
                      const isActive = selectedMetric?.id === metric.id;
                      return (
                        <button
                          key={metric.id}
                          onClick={() => setSelectedMetricId(metric.id)}
                          className={`flex items-center w-full px-5 py-3.5 text-left border-b border-slate-100 transition-colors ${isActive
                            ? 'bg-primary text-white font-semibold'
                            : 'bg-white text-slate-700 hover:bg-slate-50'
                            }`}
                        >
                          <span className={`text-xs font-bold mr-3 rounded px-1.5 py-0.5 ${isActive ? 'bg-white/20' : 'bg-primary/10 text-primary'}`}>
                            {metric.id}
                          </span>
                          <span className="text-sm truncate">{metric.name}</span>
                        </button>
                      );
                    })
                  ) : (
                    <div className="p-5 text-sm text-slate-500 text-center">
                      No metrics found.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT AREA: Metric Details */}
            <div className="w-full lg:w-3/4">
              {selectedMetric ? (
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 md:p-8">

                  {/* Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white text-lg font-bold h-12 w-12 rounded-lg flex items-center justify-center shadow-sm">
                        {selectedMetric.id}
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-primary tracking-tight">
                        {selectedMetric.name}
                      </h2>
                    </div>
                    <button className="flex items-center gap-1.5 text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-lg transition-colors shrink-0 w-fit">
                      <Bookmark className="h-4 w-4" />
                      Save Metric
                    </button>
                  </div>

                  <p className="text-slate-600 mb-8 leading-relaxed">
                    {selectedMetric.description}
                  </p>

                  {/* Formula Section */}
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-6 mb-8">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                      <FileText className="h-4 w-4" />
                      Formula
                    </div>
                    <div className="font-semibold text-primary text-sm md:text-base">
                      {selectedMetric.formula.split('=').map((part, index) => (
                        <span key={index}>
                          {part} {index === 0 ? <span className="mx-2">=</span> : null}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Two Column Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

                    {/* Example */}
                    <div className="border border-slate-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                        <LayoutGrid className="h-4 w-4 text-primary" />
                        Example
                      </div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed whitespace-pre-wrap">
                        {selectedMetric.example}
                      </p>
                      {selectedMetric.exampleHighlight && (
                        <div className="bg-green-50 border border-green-100 text-green-800 font-semibold text-sm p-3 rounded-lg">
                          {selectedMetric.exampleHighlight}
                        </div>
                      )}
                    </div>

                    {/* How to Interpret */}
                    <div className="border border-slate-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                        <Search className="h-4 w-4 text-primary" />
                        How to Interpret
                      </div>
                      <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                        {selectedMetric.interpret}
                      </p>
                      {selectedMetric.interpretTip && (
                        <div className="bg-amber-50 border border-amber-100 text-amber-800 text-xs font-medium p-3 rounded-lg leading-relaxed">
                          <strong>Tip:</strong> {selectedMetric.interpretTip}
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Full Width Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Industry Benchmark */}
                    <div className="border border-slate-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                        <TrendingUp className="h-4 w-4 text-primary" />
                        Industry Benchmark
                      </div>
                      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                        <div><span className="text-slate-500 mr-1">Good:</span><span className="font-semibold text-primary">{selectedMetric.benchmark.good}</span></div>
                        <div><span className="text-slate-500 mr-1">Average:</span><span className="font-semibold text-primary">{selectedMetric.benchmark.average}</span></div>
                        <div><span className="text-slate-500 mr-1">High:</span><span className="font-semibold text-primary">{selectedMetric.benchmark.high}</span></div>
                      </div>
                    </div>

                    {/* Why It Matters */}
                    <div className="border border-slate-200 rounded-xl p-6">
                      <div className="flex items-center gap-2 text-primary font-bold text-sm mb-3">
                        <Clock className="h-4 w-4 text-primary" />
                        Why It Matters
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {selectedMetric.whyItMatters}
                      </p>
                    </div>
                  </div>

                  {/* Related Metrics */}
                  <div className="border border-slate-200 rounded-xl p-6">
                    <div className="flex items-center gap-2 text-primary font-bold text-sm mb-4">
                      <LinkIcon className="h-4 w-4 text-primary" />
                      Related Metrics
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedMetric.relatedMetrics.map((tag) => (
                        <span key={tag} className="bg-slate-100 text-slate-700 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer text-xs font-semibold px-3 py-1.5 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>
              ) : (
                <div className="bg-white rounded-xl border border-slate-200 p-12 text-center h-full flex flex-col items-center justify-center">
                  <div className="text-slate-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">No metric selected</h3>
                  <p className="text-slate-500">Please select a metric from the list to view its details.</p>
                </div>
              )}
            </div>

          </div>
        </Container>
      </section>

      {/* FAQs SECTION */}
      <FAQs />

      {/* CTA SECTION */}
      <section className="py-16 bg-white">
        <Container>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-start gap-6">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm shrink-0">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-[#3F5181] mb-2">Want to improve your HR metrics?</h3>
                <p className="text-slate-600 max-w-xl">
                  Our experts can help you analyze, improve and achieve better people performance.
                </p>
              </div>
            </div>
            <Link
              href="/contact-us"
              className="shrink-0 bg-[#3F5181] hover:bg-[#2E3C63] text-white text-sm font-semibold py-3 px-6 rounded-md transition-colors flex items-center gap-2"
            >
              Talk to Our HR Expert <span>→</span>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}

import React, { useState } from 'react';
import { X, Layers, Server, Database, Search, Cloud, ShieldCheck, Zap } from 'lucide-react';

interface ArchitectureModalProps {
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'frontend' | 'backend' | 'storage' | 'search' | 'deployment'>('all');

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        <div className="px-8 py-5 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div>
            <div className="flex items-center gap-2">
              <span className="bg-[#FF385C] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">SYSTEM DESIGN</span>
              <h2 className="text-xl font-bold text-gray-900">
                Production-Scale Vacation-Rental Marketplace Architecture
              </h2>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              High-throughput, multi-region distributed system engineered for 10M+ DAU, sub-50ms search latency, and zero-overbooking guarantees.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-700 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-8 pt-3 pb-2 border-b border-gray-200 flex items-center gap-2 overflow-x-auto bg-white">
          {[
            { id: 'all', label: 'Full Topology' },
            { id: 'frontend', label: '1. Frontend & Edge' },
            { id: 'backend', label: '2. Microservices Core' },
            { id: 'storage', label: '3. Data & Consistency' },
            { id: 'search', label: '4. Geospatial Search' },
            { id: 'deployment', label: '5. Multi-Region Infra' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gray-900 text-white shadow-xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-8 overflow-y-auto space-y-8 flex-1 bg-[#FAFAFA]">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-base font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#FF385C]" />
              <span>Distributed Architecture Flow</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 text-xs">
              <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-3">
                <div className="font-bold text-rose-900 flex items-center gap-1.5 text-sm">
                  <Cloud className="w-4 h-4 text-rose-600" />
                  <span>1. Edge & Client</span>
                </div>
                <div className="space-y-2 text-rose-950">
                  <div className="bg-white p-2.5 rounded-lg border border-rose-100 shadow-2xs">
                    <span className="font-semibold block">Client Applications</span>
                    Next.js Web / React Native iOS & Android
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-rose-100 shadow-2xs">
                    <span className="font-semibold block">Global Anycast CDN</span>
                    Cloudflare / Fastly Edge Caching for static assets & photo tour media
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-rose-100 shadow-2xs">
                    <span className="font-semibold block">WAF & DDoS Shield</span>
                    Rate limiting, bot protection, TLS 1.3 termination
                  </div>
                </div>
              </div>

              <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-3">
                <div className="font-bold text-indigo-900 flex items-center gap-1.5 text-sm">
                  <Server className="w-4 h-4 text-indigo-600" />
                  <span>2. API Gateway</span>
                </div>
                <div className="space-y-2 text-indigo-950">
                  <div className="bg-white p-2.5 rounded-lg border border-indigo-100 shadow-2xs">
                    <span className="font-semibold block">Envoy / Kong Gateway</span>
                    gRPC & GraphQL Federation layer
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-indigo-100 shadow-2xs">
                    <span className="font-semibold block">Auth & Security</span>
                    JWT / OAuth2 token verification & session store
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-indigo-100 shadow-2xs">
                    <span className="font-semibold block">Smart Routing</span>
                    Circuit breaking, canary deployments, distributed tracing (OpenTelemetry)
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-3">
                <div className="font-bold text-emerald-900 flex items-center gap-1.5 text-sm">
                  <Zap className="w-4 h-4 text-emerald-600" />
                  <span>3. Microservices</span>
                </div>
                <div className="space-y-2 text-emerald-950">
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <span className="font-semibold block">Listing Service</span>
                    Property metadata, media management, house rules
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <span className="font-semibold block">Booking & Lock Engine</span>
                    Distributed 2-phase lock (Redis Redlock) for atomicity
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <span className="font-semibold block">Payment Service</span>
                    Stripe / Razorpay webhooks, escrow settlement
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-emerald-100 shadow-2xs">
                    <span className="font-semibold block">Pricing Engine</span>
                    Dynamic demand-based pricing & tax calculation
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-xl space-y-3">
                <div className="font-bold text-amber-900 flex items-center gap-1.5 text-sm">
                  <Search className="w-4 h-4 text-amber-600" />
                  <span>4. Search & Stream</span>
                </div>
                <div className="space-y-2 text-amber-950">
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="font-semibold block">Elasticsearch / OpenSearch</span>
                    Geo-distance polygon indexing, faceted filtering
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="font-semibold block">Kafka Event Bus</span>
                    CDC (Debezium), listing change events, notifications
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-amber-100 shadow-2xs">
                    <span className="font-semibold block">Redis Cache Clusters</span>
                    Calendar availability bitmasks, high-speed reads
                  </div>
                </div>
              </div>

              <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-3">
                <div className="font-bold text-purple-900 flex items-center gap-1.5 text-sm">
                  <Database className="w-4 h-4 text-purple-600" />
                  <span>5. Data & Storage</span>
                </div>
                <div className="space-y-2 text-purple-950">
                  <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-2xs">
                    <span className="font-semibold block">CockroachDB / PostgreSQL</span>
                    ACID transactions, multi-region read replicas
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-2xs">
                    <span className="font-semibold block">AWS S3 / Cloudflare R2</span>
                    Asset storage with auto WebP/AVIF transformations
                  </div>
                  <div className="bg-white p-2.5 rounded-lg border border-purple-100 shadow-2xs">
                    <span className="font-semibold block">ClickHouse OLAP</span>
                    Telemetry, analytics, host earnings insights
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Zero-Overbooking Concurrency Strategy</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                When a guest clicks <em>Reserve</em>, a 15-minute soft lock is acquired in Redis using distributed keys (<code>lock:listing:&#123;id&#125;:date:&#123;range&#125;</code>) via atomic Lua scripts. Upon payment confirmation, the transaction is committed into PostgreSQL with Serializable isolation level, preventing race conditions even under flash sales.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Search className="w-5 h-5 text-amber-600" />
                <span>Sub-50ms Geospatial Search & H3 Hexagons</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Listings are indexed using Uber's H3 spatial hierarchy and Elasticsearch geo-point indexes. Dynamic calendar availability is modeled as 365-bit bitmasks per listing in Redis. Search queries perform bitwise AND operations across target dates, achieving microsecond-level date filtering before spatial ranking.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Cloud className="w-5 h-5 text-sky-600" />
                <span>Edge Media Delivery & Progressive Tour</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                High-resolution images uploaded by hosts are asynchronously transcoded into responsive WebP/AVIF formats at multiple breakpoints (thumbnail, mobile, hero, full 4K lightbox). Cloudflare Image Resizing serves cached variants directly from the closest PoP with 99.4% cache hit rates.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-3">
              <h4 className="font-bold text-gray-900 text-base flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-600" />
                <span>Multi-Region Kubernetes & GitOps</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Stateless microservices deployed on AWS EKS across 3 primary geographic clusters (Americas, Europe, Asia-Pacific). Global traffic routing via AWS Route53 Geolocation with automated health checks, ArgoCD GitOps pipelines, and zero-downtime canary rollouts.
              </p>
            </div>
          </div>
        </div>

        <div className="px-8 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between text-xs text-gray-500">
          <div>Included in submission package as <span className="font-mono text-gray-800">ARCHITECTURE.md</span> and architectural asset diagram.</div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-900 hover:bg-black text-white rounded-lg font-semibold cursor-pointer transition-colors"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};
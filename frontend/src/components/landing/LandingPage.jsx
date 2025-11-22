import React from 'react'
import { Link } from 'react-router-dom'

const features = [
  {
    title: 'Unified inventory control',
    description: 'Track every SKU in real time across warehouses, channels, and operators with automated exception alerts.',
    badge: 'Visibility',
  },
  {
    title: 'Orchestrated operations',
    description: 'Digitize receipts, put-aways, transfers, and deliveries with guided workflows tailored to modern 3PL teams.',
    badge: 'Automation',
  },
  {
    title: 'Decisions powered by data',
    description: 'Layer KPIs, predictive stock-out alerts, and replenishment suggestions right inside your control tower.',
    badge: 'Intelligence',
  },
]

const stats = [
  { label: 'Inventory accuracy', value: '99.5%' },
  { label: 'Faster fulfillment', value: '3x' },
  { label: 'Cycle count effort', value: '-60%' },
]

const workflows = [
  {
    title: 'Inbound to put-away',
    steps: ['Advanced shipment notices', 'Dock scheduling', 'Quality checks', 'Directed put-away'],
  },
  {
    title: 'Inventory optimization',
    steps: ['Live stock ledger', 'Cross-warehouse balancing', 'Smart reorder signals'],
  },
  {
    title: 'Outbound excellence',
    steps: ['Wave planning', 'Carrier-ready paperwork', 'Track & trace portals'],
  },
]

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="relative isolate overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-slate-900 to-slate-950 opacity-95" />
        <div className="absolute left-1/2 top-1/4 h-64 w-64 -translate-x-1/2 rounded-full bg-primary-500/50 blur-[160px]" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-8">
          <nav className="flex items-center justify-between text-sm text-slate-200">
            <div className="flex items-center gap-3 font-semibold">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg">SM</div>
              Stock Master
            </div>
            <div className="hidden gap-8 md:flex">
              <a href="#features" className="hover:text-white">Platform</a>
              <a href="#workflows" className="hover:text-white">Workflows</a>
              <a href="#cta" className="hover:text-white">Pricing</a>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/login" className="rounded-full px-4 py-2 text-white/80 hover:text-white">Log in</Link>
              <Link to="/register" className="rounded-full bg-white px-4 py-2 font-semibold text-slate-900 shadow">Start free</Link>
            </div>
          </nav>

          <div className="mt-16 grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.2em] text-white/70">
                Warehouse Cloud for Modern Ops
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                Run every warehouse workflow from a single intelligent control tower.
              </h1>
              <p className="mt-6 text-lg text-slate-200">
                Odoo Hacks centralizes inventory, automates execution, and gives operations leaders the real-time signal they need to move faster with confidence.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register" className="rounded-lg bg-primary-500 px-6 py-3 font-medium text-white shadow-lg shadow-primary-500/30">
                  Launch a workspace
                </Link>
                <Link to="/login" className="rounded-lg border border-white/20 px-6 py-3 font-medium text-white hover:bg-white/10">
                  View interactive demo
                </Link>
              </div>
              <div className="mt-10 flex flex-wrap gap-8 text-xs uppercase tracking-[0.15em] text-white/50">
                <span>ISO 27001 ready</span>
                <span>Built for 3PLs</span>
                <span>API-first</span>
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-primary-500/20">
              <div className="text-sm text-white/70">Live control tower</div>
              <div className="mt-4 grid gap-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
                    <div className="text-xs uppercase tracking-[0.2em] text-white/50">{stat.label}</div>
                    <div className="mt-2 text-3xl font-semibold">{stat.value}</div>
                    <div className="mt-1 h-1 rounded-full bg-white/10">
                      <div className="h-1 rounded-full bg-primary-400" style={{ width: '88%' }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 p-5 text-sm text-white/80">
                "We consolidated four legacy tools and now ship with total accuracy. Our teams actually like using it."
                <div className="mt-3 text-xs uppercase tracking-[0.2em] text-white/50">VP of Operations, ScaleLog</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="bg-white text-slate-900">
        <section id="features" className="mx-auto max-w-6xl px-6 py-20">
          <p className="text-sm font-semibold text-primary-600">Why teams switch</p>
          <h2 className="mt-2 text-3xl font-semibold text-slate-900">Everything you need to command inventory</h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm shadow-primary-100/60">
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-500">{feature.badge}</span>
                <h3 className="mt-4 text-xl font-semibold text-slate-900">{feature.title}</h3>
                <p className="mt-3 text-sm text-slate-600">{feature.description}</p>
                <div className="mt-6 h-px w-full bg-gradient-to-r from-primary-100 via-primary-200 to-transparent" />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-primary-600">Realtime assurance</p>
                <h2 className="mt-2 text-3xl font-semibold text-slate-900">Know the truth about your inventory at any moment.</h2>
                <p className="mt-4 text-slate-600">
                  Device-agnostic scanning, live movement feeds, and predictive alerts keep your team ahead of the next constraint.
                </p>
              </div>
              <div className="grid gap-3 text-sm text-slate-600">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex items-center justify-between rounded-xl border border-white bg-white px-4 py-3 shadow">
                    <span>{stat.label}</span>
                    <span className="text-xl font-semibold text-slate-900">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="workflows" className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-3xl bg-slate-900 px-8 py-12 text-white">
            <p className="text-sm font-semibold text-primary-300">Configurable workflows</p>
            <h2 className="mt-2 text-3xl font-semibold">Designed for the moments that drive revenue.</h2>
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {workflows.map((flow) => (
                <div key={flow.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <h3 className="text-lg font-semibold text-white">{flow.title}</h3>
                  <ul className="mt-4 space-y-2 text-sm text-white/80">
                    {flow.steps.map((step) => (
                      <li key={step} className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500/30 text-xs text-white">•</span>
                        {step}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl bg-primary-500/10 p-6 text-sm text-white/80">
              Plug into your ERP, e-commerce, and carrier stack via our GraphQL + REST APIs or native connectors.
            </div>
          </div>
        </section>

        <section id="cta" className="mx-auto max-w-4xl px-6 pb-24 text-center">
          <p className="text-sm font-semibold text-primary-600">Launch in a week</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">See how Odoo Hacks can power your next wave of growth.</h2>
          <p className="mt-4 text-base text-slate-600">
            Start with a guided sandbox, invite your team, and connect your warehouses without writing a single line of glue code.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register" className="rounded-lg bg-primary-600 px-6 py-3 font-medium text-white shadow-lg">
              Create free account
            </Link>
            <Link to="/login" className="rounded-lg border border-slate-200 px-6 py-3 font-medium text-slate-900">
              Already a customer? Log in
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 py-10 text-center text-sm text-white/60">
        <div>© {new Date().getFullYear()} Odoo Hacks. Built for resilient operations teams.</div>
      </footer>
    </div>
  )
}

export default LandingPage

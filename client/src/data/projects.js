export const projects = [
  {
    id: 'northstar',
    title: 'Northstar',
    subtitle: 'Product analytics for independent SaaS teams',
    description:
      'A focused analytics workspace that turns raw event streams into clear activation and retention signals — without the weight of an enterprise suite.',
    problem:
      'Early-stage SaaS teams were collecting product data but lacked a lightweight way to see which features actually created retained users.',
    architecture:
      'React dashboard, a validated Express ingestion API, MongoDB aggregation pipelines, and scoped JWT sessions with role-based access.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Recharts'],
    category: 'Full-Stack',
    year: '2026',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/aminechajri',
    visual: 'dashboard',
    featured: true,
  },
  {
    id: 'soko',
    title: 'Soko',
    subtitle: 'A storefront for independent makers',
    description:
      'A warm, editorial commerce experience built for small-batch makers, with a simple product manager and a checkout that stays out of the way.',
    problem:
      'Independent makers needed a storefront that felt as considered as their products without wrestling with a complex e-commerce platform.',
    architecture:
      'React storefront, Express commerce API, MongoDB product catalog, Stripe checkout, and an image pipeline for fast editorial pages.',
    stack: ['React', 'Express', 'MongoDB', 'Stripe', 'Cloudinary'],
    category: 'Full-Stack',
    year: '2025',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/aminechajri',
    visual: 'commerce',
  },
  {
    id: 'relay',
    title: 'Relay',
    subtitle: 'Observability for small API teams',
    description:
      'A compact API monitoring dashboard that surfaces latency, error rates, and failing endpoints before they become customer-facing incidents.',
    problem:
      'Small backend teams had logs scattered across providers and no quick, shared view of which endpoints were degrading in real time.',
    architecture:
      'Node.js collectors, an Express metrics API, MongoDB time-series storage, scheduled health checks, and a lightweight React dashboard.',
    stack: ['Node.js', 'Express', 'MongoDB', 'REST API', 'Cron'],
    category: 'Backend',
    year: '2025',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/aminechajri',
    visual: 'terminal',
  },
  {
    id: 'index',
    title: 'Index',
    subtitle: 'An editorial home for a creative studio',
    description:
      'A type-led portfolio and lightweight CMS for a creative studio, balancing expressive layouts with the practical needs of a small team.',
    problem:
      'The studio wanted a site with the confidence of a print magazine but needed to publish new work without a developer in the loop.',
    architecture:
      'React frontend with fluid editorial grids, an Express content API, MongoDB-backed collections, and optimized responsive imagery.',
    stack: ['React', 'JavaScript', 'CSS', 'Express', 'MongoDB'],
    category: 'Frontend',
    year: '2024',
    demoUrl: 'https://example.com',
    repoUrl: 'https://github.com/aminechajri',
    visual: 'editorial',
  },
];

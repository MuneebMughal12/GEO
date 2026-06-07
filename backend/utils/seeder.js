const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables
dotenv.config();

// Models
const User = require('../models/User');
const SiteSettings = require('../models/SiteSettings');
const Company = require('../models/Company');
const Service = require('../models/Service');
const Project = require('../models/Project');
const TeamMember = require('../models/TeamMember');
const GalleryMedia = require('../models/GalleryMedia');
const Testimonial = require('../models/Testimonial');
const BlogPost = require('../models/BlogPost');
const Message = require('../models/Message');
const LocationPage = require('../models/LocationPage');

const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/geogroup';

mongoose.connect(connUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedData = async () => {
  try {
    // 1. Clear existing data
    await User.deleteMany();
    await SiteSettings.deleteMany();
    await Company.deleteMany();
    await Service.deleteMany();
    await Project.deleteMany();
    await TeamMember.deleteMany();
    await GalleryMedia.deleteMany();
    await Testimonial.deleteMany();
    await BlogPost.deleteMany();
    await Message.deleteMany();
    await LocationPage.deleteMany();

    console.log('Database cleared.');

    // 2. Seed default admin
    const adminUser = await User.create({
      username: 'admin',
      email: 'admin@geogroup.global',
      password: 'AdminGeo2026!',
      role: 'admin'
    });
    console.log('Admin user seeded.');

    // 3. Seed site settings
    const siteSettings = await SiteSettings.create({
      siteName: 'GEO Group',
      tagline: 'Global Excellence & Order',
      contactEmail: 'contact@geogroup.global',
      contactPhone: '+971 4 000 0000',
      whatsappNumber: '+971500000000',
      address: '1200 Elite Tower, Financial District, Abu Dhabi, UAE',
      socialLinks: {
        linkedin: 'https://linkedin.com/company/geogroup',
        twitter: 'https://twitter.com/geogroup',
        facebook: 'https://facebook.com/geogroup',
        instagram: 'https://instagram.com/geogroup'
      },
      seo: {
        metaTitle: 'GEO Group | Building the Future with Precision & Innovation',
        metaDescription: 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.',
        keywords: ['GEO Group', 'GEO ARC', 'GEO Soil Testing', 'GEO Construction', 'Civil Engineering', 'Geotechnical Investigation']
      },
      homepage: {
        heroTitle: 'Building the Future with Precision & Innovation',
        heroSubtitle: 'A global conglomerate delivering excellence in architectural design, soil engineering, and large-scale infrastructure construction.',
        heroCTA1: 'Explore Companies',
        heroCTA2: 'Contact Us',
        aboutTitle: 'Established Excellence in Global Infrastructure',
        aboutText: 'With over two decades of experience, GEO Group of Companies has stood as a pillar of reliability in the construction and engineering sectors. We integrate cutting-edge technology with traditional craftsmanship to deliver projects that shape the skylines of tomorrow.',
        aboutMission: 'To define new standards in sustainable construction and technical precision.',
        aboutVision: 'Becoming the global leader in integrated engineering and architectural services.',
        stats: [
          { label: 'Projects Completed', value: '500+' },
          { label: 'Global Clients', value: '120+' },
          { label: 'Years Excellence', value: '25+' },
          { label: 'Active Projects', value: '45+' }
        ],
        partners: [
          { name: 'PARTNER_A' },
          { name: 'PARTNER_B' },
          { name: 'PARTNER_C' },
          { name: 'PARTNER_D' },
          { name: 'PARTNER_E' },
          { name: 'PARTNER_F' }
        ]
      }
    });
    console.log('Site settings seeded.');

    // 4. Seed Companies (Divisions)
    const arcCompany = await Company.create({
      name: 'GEO ARC',
      slug: 'geo-arc',
      tagline: 'Defining the Global Skyline',
      description: 'Precision-engineered structures meeting world-class architectural vision. We bridge the gap between aesthetic brilliance and structural integrity.',
      aboutText: 'Pioneering architectural solutions that blend aesthetic elegance with functional sustainability for modern urban landscapes.',
      icon: 'architecture',
      division: 'ARC',
      certifications: [
        { title: 'ISO 9001:2015', subtitle: 'Quality Management', icon: 'verified' },
        { title: 'LEED Platinum', subtitle: 'Sustainable Design', icon: 'eco' },
        { title: 'Pritzker Finalist', subtitle: 'Design Innovation', icon: 'workspace_premium' },
        { title: 'OSHA Compliant', subtitle: 'Safety Excellence', icon: 'shield' }
      ],
      seo: {
        metaTitle: 'GEO ARC | Engineering & Architecture',
        metaDescription: 'Innovative architectural design, masterplanning, and structural engineering services by GEO ARC.'
      }
    });

    const soilCompany = await Company.create({
      name: 'GEO Soil Testing',
      slug: 'geo-soil-testing',
      tagline: 'Precision Laboratory Services',
      description: 'Advanced geotechnical analysis and material characterization. Our ISO-certified laboratories provide the bedrock data required for global architectural and infrastructure marvels.',
      aboutText: 'Specialized geotechnical analysis ensuring the foundational integrity of complex engineering projects worldwide.',
      icon: 'science',
      division: 'SOIL',
      certifications: [
        { title: 'ISO/IEC 17025:2017', subtitle: 'Lab Testing Competency', icon: 'science' },
        { title: 'ASTM Compliant', subtitle: 'International Protocols', icon: 'verified' },
        { title: 'BS Compliance', subtitle: 'Structural Standards', icon: 'shield' }
      ],
      seo: {
        metaTitle: 'GEO Soil Testing | Geotechnical Services',
        metaDescription: 'Soil investigation, geotechnical engineering, laboratory testing, and site analysis by GEO Soil Testing.'
      }
    });

    const constCompany = await Company.create({
      name: 'GEO Construction',
      slug: 'geo-construction',
      tagline: 'Building Tomorrow\'s Infrastructure',
      description: 'Setting the gold standard in civil engineering and large-scale infrastructure. From high-speed rail networks to industrial monoliths, GEO Construction delivers engineering excellence with surgical precision.',
      aboutText: 'Full-cycle construction management for commercial and industrial infrastructures, delivered with unmatched precision.',
      icon: 'home_work',
      division: 'CONSTRUCTION',
      certifications: [
        { title: 'ISO 45001:2018', subtitle: 'Safety Management System', icon: 'shield' },
        { title: 'BIM Level 2', subtitle: 'Building Information Modeling', icon: 'architecture' },
        { title: 'LEED Gold', subtitle: 'Sustainable Construction', icon: 'eco' }
      ],
      seo: {
        metaTitle: 'GEO Construction | Infrastructure & Civil Engineering',
        metaDescription: 'Full-cycle building construction, infrastructure development, and project management by GEO Construction.'
      }
    });
    console.log('Company divisions seeded.');

    // 5. Seed Services
    await Service.create([
      // GEO ARC
      {
        name: 'Architectural Design',
        slug: 'architectural-design',
        description: 'Innovative conceptualization of commercial and residential spaces that harmonize with their environments.',
        longDescription: 'We deliver bespoke architectural designs blending visual aesthetics with green materials and state-of-the-art building techniques.',
        icon: 'architecture',
        division: 'ARC',
        features: ['Urban Masterplanning', 'Sustainable Biophilic Design', 'Adaptive Reuse'],
        processSteps: [
          { stepNumber: 1, title: 'Concept Formulation', description: 'Collaborative analysis of project brief and local context.' },
          { stepNumber: 2, title: 'Schematic Drawing & Modeling', description: 'Translating ideas into interactive CAD and 3D mockups.' },
          { stepNumber: 3, title: 'BIM Development', description: 'Fine-tuning blueprint metrics in Revit for detailed collaboration.' }
        ],
        faqs: [
          { question: 'What is biophilic design?', answer: 'It is a practice of connecting building occupants closely to nature through organic shapes, natural light, and vegetation.' }
        ]
      },
      {
        name: 'Structural Engineering',
        slug: 'structural-engineering',
        description: 'Advanced structural analysis and seismic engineering for complex, high-load infrastructure projects.',
        longDescription: 'Ensuring structural stability through high-fidelity engineering computations and finite element analysis.',
        icon: 'engineering',
        division: 'ARC',
        features: ['Finite Element Analysis', 'Seismic Retrofitting', 'High-Rise Optimization'],
        processSteps: [
          { stepNumber: 1, title: 'Load Modeling', description: 'Determining dead, live, and seismic forces.' }
        ]
      },
      {
        name: 'Interior Design',
        slug: 'interior-design',
        description: 'Bespoke interior solutions that enhance productivity, wellbeing, and brand identity through space.',
        longDescription: 'Designing ergonomic, beautiful office and commercial interiors optimized for light, air, and acoustics.',
        icon: 'chair',
        division: 'ARC',
        features: ['Ergonomic Workspace Planning', 'Material Specification', 'Acoustic Consulting']
      },
      // GEO Soil Testing
      {
        name: 'Soil Investigation',
        slug: 'soil-investigation',
        description: 'On-site core sampling and borehole testing to identify soil layering and geotechnical parameters.',
        longDescription: 'Acquiring high-fidelity core drillings to establish foundation safety indicators.',
        icon: 'biotech',
        division: 'SOIL',
        features: ['CPT Rig Testing', 'Borehole Drilling', 'SPT Investigations'],
        processSteps: [
          { stepNumber: 1, title: 'Rig Mobilization', description: 'Setting up drilling devices on site.' }
        ]
      },
      {
        name: 'Laboratory Testing',
        slug: 'laboratory-testing',
        description: 'Triaxial, direct shear, and chemical analysis of soil specimens under regulated lab environments.',
        longDescription: 'Providing scientific confirmation of soil load capacities using calibrated ASTM testing machines.',
        icon: 'science',
        division: 'SOIL',
        features: ['Triaxial Load Tests', 'Consolidation Profiling', 'Chemical Spectroscopy']
      },
      // GEO Construction
      {
        name: 'Infrastructure Development',
        slug: 'infrastructure-development',
        description: 'Civil mobilization for highways, transit rail bridges, and deep-water ports.',
        longDescription: 'Constructing critical global networks with specialized machinery and zero-accident targets.',
        icon: 'construction',
        division: 'CONSTRUCTION',
        features: ['Suspension Bridges', 'Railway Networks', 'Marine Port Excavation']
      }
    ]);
    console.log('Services seeded.');

    // 6. Seed Projects
    await Project.create([
      {
        name: 'The Nexus Tower',
        slug: 'the-nexus-tower',
        description: 'Iconic 60-story LEED-certified commercial hub with parametric glass facade.',
        clientName: 'Nexus Development Corp',
        division: 'ARC',
        category: 'Architecture',
        location: 'Dubai, UAE',
        completionDate: 'Q4 2024',
        status: 'Ongoing',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuCLGEMwRz1jBt14Mh-ig_vG3oBrMKxL5cVdLE4DP6yWZ8WfxS3cOVg_I-I2aMFfRhJwmQgT8o8t62AedzVe4Q0O1SnmWvJBzdKSRU4X_RhJxObDGL7UKmD_DjXIGzC6rcNyRQP1pMz5fdo1FkZUgzH0ghpJFDZ56Nzo0uzeKDYGg4yOYq6-L6B_rsVCxA5X-XNtLmIRqQhd0FCPTmdaV9OWNGCMM1HERCBVm_e4Za874usdTU4tjyM98NjI54NN2DiDePiCC89pkfU'],
        isFeatured: true,
        isPinnedHomepage: true
      },
      {
        name: 'Coastal Bridge Foundation',
        slug: 'coastal-bridge-foundation',
        description: 'Geotechnical soil profiling and triaxial stress tests for the new 2.4km sea bridge.',
        clientName: 'Department of Transportation',
        division: 'SOIL',
        category: 'Geotechnical',
        location: 'Karachi, Pakistan',
        completionDate: 'Q2 2023',
        status: 'Completed',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDNC19jNoImFLWCO2peXkqeYhlfnFaM9CvGJlosIHDRzr2QjHuk8q4Nf_1dwDqK49F64Ivrjqkt824UVn9U5ypkJkOaSp5VFnG8WSu6yFK31m2ihOl91spg6GbnMu7aBpZziDX4dw-lbDkOfIN19qMcdfWSfsK9fDPYCYHCXL5ELl1Q9rib0XFfEgDtpSllnqYAjLpZ4zVH8i2ROziPwVPf1I2G0C3q53AGEP1n6bR95Q5D_c6AZGY0pMmBS0SSGZcJrxfEjKklcSw'],
        isFeatured: true,
        isPinnedHomepage: true
      },
      {
        name: 'Azure Luxury Suites',
        slug: 'azure-luxury-suites',
        description: 'Minimalist luxury hotel lobby and room layout planning representing prestige-tech design.',
        clientName: 'Azure Leisure Hotels',
        division: 'ARC',
        category: 'Interior',
        location: 'London, UK',
        completionDate: 'Q3 2024',
        status: 'Ongoing',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuDFoSWafTKxNjeV__9MP6nxFyx0LdLz9Ci6k02UrAAW_AiqHhUrxULJFjow-XVNYDxzsPC4X_GVFCVUohqGmCriZZi_D8cPaUE-PGbwkSOPL8XTC-UVaR81wFuXRjVAJjCNn_IaVgdWjfIGdIlhQm1DD21Rdmvi_LE_LRVxqHM_SgPsAdz835U3DWv0YSpDpqR9teKEKPDoVFsGjT4VP2KR-oaQ1dHLD-XPO8mA613qm7X-s2By6hGxg4uUgnWEtaIy7pYvLL55pAw'],
        isFeatured: true,
        isPinnedHomepage: true
      },
      {
        name: 'The Horizon Bridge Expansion',
        slug: 'the-horizon-bridge-expansion',
        description: 'Spanning 2.4 kilometers, this project redefined transit efficiency in the coastal economic zone.',
        clientName: 'Global Maritime Transit',
        division: 'CONSTRUCTION',
        category: 'Civil Infrastructure',
        location: 'Singapore',
        completionDate: 'Q1 2025',
        status: 'Ongoing',
        images: ['https://lh3.googleusercontent.com/aida-public/AB6AXuBl7GqOjCTzasVb8HIqJ680bUH-qDKeFOAntIhg7oNO1KR7nepmRhZGDexnH1jR57xVxiOT-5Vi4U9_NJBlWMiaqGESTUto1Xvc98mK_iogi4247RIkuELvTQDlgOztQxek4Wy6R2Ye4Dlpt1tz0JHzaDa_iXcFwNqolmrPBP2eoPG3IvnWDmE83dyPEnfYzzzMZq9c2scz8csBBHDHbA0d8JF6HuGNeV-Ft-JKSvogkss-4dyhRHbH4CtkjqT0bpURBvhqi7H9AC8'],
        isFeatured: true,
        isPinnedHomepage: true
      }
    ]);
    console.log('Projects seeded.');

    // 7. Seed Team
    await TeamMember.create([
      {
        name: 'Muneeb Mughal',
        designation: 'CEO & Founder, GEO Group',
        profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600',
        bio: 'Visionary entrepreneur leading GEO Group\'s global expansion and commitment to infrastructure excellence.',
        division: 'GLOBAL',
        experience: '25 Years',
        certifications: ['Global Business Leader', 'Corporate Strategy Fellow']
      },
      {
        name: 'Dr. Julian Vance',
        designation: 'CEO, GEO ARC',
        profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600',
        bio: 'Dr. Vance holds a Ph.D. in Architecture from MIT and has pioneered parametric design methodologies worldwide.',
        division: 'ARC',
        experience: '22 Years',
        certifications: ['RIBA Fellow', 'AIA Gold Member']
      },
      {
        name: 'Sarah Chen',
        designation: 'Head of Structural Engineering',
        profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600',
        bio: 'Sarah leads seismic analysis studies and structural optimization for high-density skyscrapers.',
        division: 'ARC',
        experience: '15 Years',
        certifications: ['Chartered Engineer (IStructE)']
      },
      {
        name: 'Marcus Thorne',
        designation: 'Director of Interiors',
        profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600',
        bio: 'Creating award-winning interior spaces for international financial centers.',
        division: 'ARC',
        experience: '18 Years'
      },
      {
        name: 'Elena Rodriguez',
        designation: 'Sustainability Lead',
        profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600',
        bio: 'A visionary in biophilic green architectures and LEED compliance protocols.',
        division: 'ARC',
        experience: '12 Years',
        certifications: ['LEED AP BD+C']
      },
      {
        name: 'Dr. Elias Vance',
        designation: 'CEO, GEO Soil Testing',
        profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600',
        bio: 'Specialist in geotechnical soil characterization with over two decades of advisory experience for massive infrastructure projects.',
        division: 'SOIL',
        experience: '20 Years',
        certifications: ['Geotechnical Engineering Expert', 'ISO/IEC Lab Director']
      },
      {
        name: 'Jonathan Mercer',
        designation: 'Senior Geotechnical Analyst',
        profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600',
        bio: 'Specializes in CPT and Triaxial soil load testing under various geological stress environments.',
        division: 'SOIL',
        experience: '10 Years',
        certifications: ['ASTM Certified Field Logist']
      },
      {
        name: 'Dr. Clara Oswald',
        designation: 'Lab Director',
        profileImage: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600',
        bio: 'Manages ASTM certified soil spectroscopy and chemical analysis testing at GEO Labs.',
        division: 'SOIL',
        experience: '12 Years'
      },
      {
        name: 'Robert Vance',
        designation: 'CEO, GEO Construction',
        profileImage: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=600',
        bio: 'A veteran of heavy civil engineering and large-scale infrastructure project execution.',
        division: 'CONSTRUCTION',
        experience: '24 Years',
        certifications: ['Certified Construction Manager', 'OSHA Safety Trainer']
      },
      {
        name: 'Aisha Rahman',
        designation: 'Chief Operations Officer',
        profileImage: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600',
        bio: 'Oversees heavy machinery logistics, field scheduling, and strict safety compliance audits.',
        division: 'CONSTRUCTION',
        experience: '14 Years'
      },
      {
        name: 'Vikram Singh',
        designation: 'Lead Infrastructure Engineer',
        profileImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600',
        bio: 'BIM modeling expert specialized in steel bridges and railway line layouts.',
        division: 'CONSTRUCTION',
        experience: '11 Years'
      }
    ]);
    console.log('Team members seeded.');

    // 8. Seed Gallery
    await GalleryMedia.create([
      {
        title: 'HQ Exterior Main',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvfom24RVU2ucgD9iqGFo7zjl3yk3Yotn4ndv5DL4c_HKi1GUCfRS65i2iyg-1O5nqge3bhQXWEebmlHBgFmskYPwf3B1OafiebjcaQWnO22WNPaCGybDR2JWC1CDGDkKUdSSyKtCHG832TNkMuGqqHk3MoPyUUDZV25UQ7jIqMxOeS6aa3A3zW1egq8WLHIsAfTeOuuaCQZvJo2rIBWHWnWtfQkr1ZuuS5-ILZiCJ7fQ1qjrnS9JDAo0o-ZAf6bqVS8q7KaI7uyQ',
        type: 'image',
        album: 'Showcase',
        division: 'ARC',
        isPinnedHomepage: true
      },
      {
        title: 'Geotechnical Soil Sampling',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqnO9xDmCCXbo4wGel9huveFK1qmjpT20V05CJVD3UIGfoVX3p9SHpftRtsjS_yt662SNlcia91SmVWquX1NDejQuuk50tX3bTviZVHtZh9PA_5Wwxy3dUTNIe8NOAH1IP7GVpA_5Mj_wg5MAo02blPUp8tiX1QWS0r0IoqEPNmCbUsJmuz5ViVikVtGcWZ8cev9hbGQv4VbPgVs8q6kW-FY3NqJCrDo0JIJxZKrP3SWvW1A-hI6ia2fYHodph3hc_JdfL7av38aY',
        type: 'image',
        album: 'Boreholes',
        division: 'SOIL',
        isPinnedHomepage: false
      },
      {
        title: 'Excavation Site Alpha',
        url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_0AB2RBHc3w-rhrvKkLjBFFo2Tps_VZiYt2DgIxr51_bRtEQMHhafrPB6nTuZr0RwWD44BPm6Vmo5wiPqZl9yFmB4jw8kZ3Kzy_-uahoXWBO-Od7OUPPLTd49Sabh-1rZfkeq5YO5NqfviJRfwFcDlQck5OpPrXNh9TVuBUDWlKb_otL3-1JWYSt9um43sSCKqw4lGp8HG57qp0aOyL3oz8Pd4i83GLAzMK9gOgS95DArlypzPPx9NNTk7385zoeUE8W0ka_lOXM',
        type: 'image',
        album: 'Excavations',
        division: 'CONSTRUCTION',
        isPinnedHomepage: true
      }
    ]);
    console.log('Gallery seeded.');

    // 9. Seed Testimonials
    await Testimonial.create([
      {
        clientName: 'Marcus Sterling',
        company: 'Global Logistics Corp',
        position: 'CEO',
        review: 'GEO Group redefined our approach to infrastructure. Their attention to detail in soil analysis saved us millions in long-term maintenance.',
        rating: 5,
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAavxsCAykigyfcR4larCJad6AFFvaFEZWgKWCS92BQK1jiADwd9QYtPSYdF0CAhTEzDKBFqDncuIED9DtZN9wA79sr3nlxN4I5sOrNXzAQCKPWxygUqZmwvYLQLGa4N9K2buLTsExAts4KF0ri3hpA005WR9yP2EKQhr9mEsGj5rI0-cmWfaM3Sve38-Oa2Uo6Yi27ypypluL8lr2F0-ilow2mHBxr52AphBIP5MTxGvd-hzmuGT4_6aOZprO8feMIbm0KTxg7Gv8',
        division: 'GLOBAL'
      }
    ]);
    console.log('Testimonials seeded.');

    // 10. Seed Blog Posts
    await BlogPost.create([
      {
        title: 'Geotechnical Soil Testing in Coastal Environments',
        slug: 'soil-testing-coastal-environments',
        summary: 'A detailed study of saline soil composition and structural foundations near sea shorelines.',
        content: 'Testing soil along coastal boundaries presents significant structural engineering challenges due to tidal saturation, liquefaction susceptibility, and high chlorine contents. At GEO Soil Testing, we deploy CPT and Direct Shear tests to model foundation load limits exactly...',
        category: 'Soil Investigation',
        division: 'SOIL',
        tags: ['soil testing', 'coastal infrastructure', 'liquefaction'],
        seo: {
          metaTitle: 'Coastal Geotechnical Investigation & Soil Testing',
          metaDescription: 'Discover how salinity and water saturation affect structural foundations in coastal regions and the testing methodologies used to secure them.'
        }
      }
    ]);
    console.log('Blog posts seeded.');

    // 11. Seed Location Pages (Local SEO)
    await LocationPage.create([
      {
        city: 'Karachi',
        slug: 'soil-testing-karachi',
        division: 'SOIL',
        title: 'Soil Testing Services in Karachi | GEO Soil Testing',
        description: 'Professional geotechnical investigation, borehole drilling, and laboratory soil reports in Karachi and surrounding Sindh coastal industrial hubs.',
        content: '<h2>Reliable Geotechnical Soil Testing in Karachi</h2><p>Karachi features complex sedimentary and saline soil properties due to its proximity to the Arabian Sea. GEO Soil Testing provides ISO-accredited drilling, chemical laboratory analysis, and core logging matching BS/ASTM parameters for multi-story residential and commercial towers throughout Karachi.</p>',
        faqs: [
          { question: 'Why is soil testing necessary in Karachi?', answer: 'Due to sand density variation and salt saturation, foundation failure risk is high. Detailed borehole profiling guarantees building stability.' }
        ],
        seo: {
          metaTitle: 'Geotechnical Soil Testing & Investigation in Karachi',
          metaDescription: 'Expert soil testing, borehole drilling, and laboratory shear testing services in Karachi. Fully ASTM compliant geotechnical reports.'
        }
      },
      {
        city: 'Hyderabad',
        slug: 'soil-testing-hyderabad',
        division: 'SOIL',
        title: 'Expert Soil Investigation in Hyderabad | Geotechnical Drilling',
        description: 'Advanced soil analysis, triaxial load testing, and site soil surveys in Hyderabad, Sindh.',
        content: '<h2>Scientific Soil Testing in Hyderabad</h2><p>Our division provides thorough geotechnical core sampling and site analysis in Hyderabad. Standard clay density profiling and shear analysis ensure your foundations stand safe.</p>',
        seo: {
          metaTitle: 'Geotechnical Testing & Borehole Soil Drilling in Hyderabad',
          metaDescription: 'Get certified geotechnical testing in Hyderabad from GEO Soil Testing. Reliable lab results for foundations.'
        }
      }
    ]);
    console.log('Local SEO location pages seeded.');

    console.log('Database Seeding Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();

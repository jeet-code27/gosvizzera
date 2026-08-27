import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/gosvizzera";

async function seed() {
  try {
    console.log("Connecting to MongoDB:", MONGODB_URI);
    await mongoose.connect(MONGODB_URI);
    console.log("Connected successfully!");

    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("No database instance");
    }

    // 1. Seed Categories
    const categoriesCol = db.collection("categories");
    const existingCats = await categoriesCol.countDocuments();
    let catPriorAuthId, catCodingId, catRcmId;

    if (existingCats === 0) {
      const insertedCats = await categoriesCol.insertMany([
        {
          name: "Prior & Retro Authorization",
          slug: "prior-authorization",
          description: "Guides and benchmarks on payer approvals and retrospective authorizations.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Medical Coding & Compliance",
          slug: "medical-coding",
          description: "CPC guidelines, ICD-10-CM, CPT, and modifier best practices.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Revenue Cycle Management",
          slug: "rcm-strategy",
          description: "End-to-end billing workflows, charge capture, and collections optimization.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Denial Management",
          slug: "denial-prevention",
          description: "Strategies for overturning claim rejections and eliminating root-cause denials.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
      catPriorAuthId = insertedCats.insertedIds[0];
      catCodingId = insertedCats.insertedIds[1];
      catRcmId = insertedCats.insertedIds[2];
      console.log("Seeded 4 categories.");
    } else {
      const firstCat = await categoriesCol.findOne({ slug: "prior-authorization" });
      catPriorAuthId = firstCat ? firstCat._id : (await categoriesCol.findOne())._id;
    }

    // 2. Seed Tags
    const tagsCol = db.collection("tags");
    const existingTags = await tagsCol.countDocuments();
    let tagIds = [];
    if (existingTags === 0) {
      const insertedTags = await tagsCol.insertMany([
        { name: "Denial Prevention", slug: "denial-prevention", createdAt: new Date(), updatedAt: new Date() },
        { name: "MGMA Benchmarks", slug: "mgma-benchmarks", createdAt: new Date(), updatedAt: new Date() },
        { name: "EHR Integration", slug: "ehr-integration", createdAt: new Date(), updatedAt: new Date() },
        { name: "HIPAA Security", slug: "hipaa-security", createdAt: new Date(), updatedAt: new Date() },
      ]);
      tagIds = Object.values(insertedTags.insertedIds);
      console.log("Seeded 4 tags.");
    } else {
      const tagsList = await tagsCol.find().toArray();
      tagIds = tagsList.map((t) => t._id);
    }

    // 3. Seed Author
    const authorsCol = db.collection("authors");
    let author = await authorsCol.findOne({ name: "Svizzera Editorial Team" });
    if (!author) {
      const res = await authorsCol.insertOne({
        name: "Svizzera Editorial Team",
        avatar: "/images/gosvizzera-logo.png",
        role: "RCM & Healthcare Billing Consultant",
        bio: "Dedicated team of certified medical coders, billing analysts, and RCM compliance consultants at Svizzera Healthcare Solutions.",
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      author = { _id: res.insertedId };
      console.log("Seeded default author.");
    }

    // 4. Seed Posts
    const postsCol = db.collection("posts");
    const existingPosts = await postsCol.countDocuments();
    if (existingPosts === 0) {
      await postsCol.insertMany([
        {
          title: "How to Reduce Claim Denials by 40% with Proactive Prior Authorization",
          slug: "reduce-claim-denials-proactive-prior-authorization",
          excerpt:
            "Over 80% of payer denials stem from front-end authorization gaps. Discover the 5-pillar workflow healthcare practices use to eliminate hold times and secure clean reimbursements.",
          content: `
            <h2>The Growing Cost of Prior Authorization Delays</h2>
            <p>According to the <strong>American Medical Association (AMA)</strong>, over 94% of physicians report that prior authorization delays lead to significant care disruption. Even worse, an estimated 80% of preventable hospital claim denials originate from missing, delayed, or incomplete pre-service approvals.</p>
            
            <blockquote>"Administrative bottlenecks shouldn't compromise patient outcomes or clinical cash flow. The key is shifting from reactive follow-ups to automated pre-service verification."</blockquote>
            
            <h2>Key Drivers of Authorization Denials in 2026</h2>
            <p>When analyzing root-cause denials across commercial payers (UnitedHealthcare, Aetna, Cigna, Blue Cross) and government programs (Medicare, Medicaid), three major patterns consistently emerge:</p>
            <ul>
              <li><strong>Payer Policy Rule Drift:</strong> Clinical criteria update quarterly without direct notice to practice staff.</li>
              <li><strong>Missing Clinical Documentation:</strong> Lack of specific diagnostic imaging or conservative therapy notes.</li>
              <li><strong>Untracked Expiration Windows:</strong> Approved authorizations expiring before rescheduled surgical procedures take place.</li>
            </ul>

            <h2>5 Steps to Modernize Your RCM Workflow</h2>
            <p>Implementing a dedicated outsourced RCM team eliminates the burden from clinical staff while achieving over 98% first-pass clean claim approval rates.</p>
          `,
          featuredImage: {
            url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
            alt: "Healthcare professionals reviewing revenue cycle metrics on tablet",
            caption: "Proactive prior authorization workflows accelerate provider reimbursements.",
          },
          author: author._id,
          category: [catPriorAuthId],
          tags: tagIds.slice(0, 2),
          faqs: [
            {
              question: "How quickly does proactive authorization reduce claim denials?",
              answer:
                "Most practices observe a 30% to 40% reduction in authorization-related rejections within the first 30 to 60 days of implementing structured pre-service verification.",
            },
            {
              question: "Can Svizzera manage authorizations directly inside our EHR?",
              answer:
                "Yes, our team operates securely inside your existing EHR/PM system (Epic, Cerner, AthenaHealth, eClinicalWorks, Kareo, NextGen) under a signed BAA with zero workflow disruption.",
            },
          ],
          status: "Published",
          isFeatured: true,
          seo: {
            metaTitle: "Reduce Claim Denials by 40% with Proactive Prior Authorization | gosvizzera",
            metaDescription:
              "Learn how healthcare providers eliminate authorization delays and achieve 98%+ clean claim rates with Svizzera's proactive RCM workflow.",
            focusKeyword: "prior authorization outsourcing",
            canonicalUrl: "https://gosvizzera.com/blog/reduce-claim-denials-proactive-prior-authorization",
            noIndex: false,
          },
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Mastering Medical Coding Audits: Key CPT & ICD-10 Compliance Tips",
          slug: "mastering-medical-coding-audits-cpt-icd-10-compliance",
          excerpt:
            "Explore guidelines and audit preparation strategies to prevent modifier misuse, downcoding, and unbundling penalties across medical specialties.",
          content: `
            <h2>Why Coding Compliance Matters More Than Ever</h2>
            <p>Accurate medical coding is the foundation of clean healthcare claims. Inaccuracies like modifier 25 misuse or unbundling can trigger payer audits and costly recoupments.</p>

            <h2>Best Practices for Specialty Coding</h2>
            <p>Our CPC-certified coding team adheres strictly to AAPC and AHIMA guidelines to ensure 99%+ coding precision across all major code sets.</p>
          `,
          featuredImage: {
            url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=1200&auto=format&fit=crop",
            alt: "Medical coding and billing audit documentation",
            caption: "Audit-ready coding safeguards practices against recoupments.",
          },
          author: author._id,
          category: [catCodingId || catPriorAuthId],
          tags: tagIds.slice(1, 3),
          faqs: [
            {
              question: "What certifications do Svizzera medical coders hold?",
              answer:
                "All Svizzera coders hold active AAPC (CPC) and/or AHIMA (CCS) credentials with specialty-specific continuous education.",
            },
          ],
          status: "Published",
          isFeatured: false,
          seo: {
            metaTitle: "Mastering Medical Coding Audits: Key CPT & ICD-10 Compliance | gosvizzera",
            metaDescription:
              "Essential guide to CPT & ICD-10 compliance, modifier accuracy, and audit preparation for healthcare practices.",
            focusKeyword: "medical coding compliance",
            noIndex: false,
          },
          createdAt: new Date(Date.now() - 86400000 * 2),
          updatedAt: new Date(Date.now() - 86400000 * 2),
        },
      ]);
      console.log("Seeded 2 demo articles.");
    }

    console.log("Database seed complete!");
    process.exit(0);
  } catch (err) {
    console.error("Seed error:", err);
    process.exit(1);
  }
}

seed();

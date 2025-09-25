const About = require("../models/About");
const connectDB = require('../config/db');

async function seedAbout() {
  try {
    // about data
    const aboutData = {
      name: "Shareiar Islam",
      title: "Full Stack Developer",
      description: "I am passionate about building web applications using Laravel, Vue.js and Node.js.",
      profileImage: "",
      resumeLink: "",
      contactEmail: "islamshareiar@gmail.com",
      socialLinks: {
        github: "https://github.com/Shareiar-shams",
        linkedin: "https://www.linkedin.com/in/shareiar-islam/",
        twitter: "https://twitter.com/ShareiarShams"
      }
    };

    // upsert about data
    const about = await About.findOneAndUpdate({}, aboutData, { new: true, upsert: true });

    console.log("About seeded successfully:", about);
    process.exit();
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
}

// Run Seeder
(async () => {
  await connectDB();

  await seedAbout();
})();

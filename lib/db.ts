import fs from 'fs';
import path from 'path';

const dbPath = path.join(process.cwd(), 'portfolio-data.json');

const defaultData = {
  name: "Alex Smith",
  title: "Creative Professional",
  bio: "I'm a passionate creator who loves bringing ideas to life. Whether it's through code, design, video editing, or writing, I focus on delivering high-quality results.",
  skills: "Adobe Illustrator, Video Editing, UI/UX Design, Copywriting, React",
  projects: [
    { title: "Rebrand Campaign", desc: "Complete visual identity overhaul.", image: "" },
    { title: "Tech Blog", desc: "A successful series of tutorials.", image: "" },
    { title: "Brand Promo Video", desc: "A high-converting video ad.", image: "" }
  ],
  experience: [
    { company: "Creative Studio", role: "Lead Designer", period: "2022 - Present", desc: "Leading a team of 5 designers on international rebrand projects." }
  ],
  socials: {
    twitter: "",
    github: "",
    linkedin: "",
    instagram: ""
  },
  testimonials: [
    { name: "Sarah Johnson", role: "CEO at TechFlow", text: "Alex is an incredible talent who consistently exceeds expectations." }
  ],
  messages: [],
  theme: "blue",
  darkMode: false,
  avatarUrl: ""
};

export function getPortfolio() {
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading DB:', e);
  }
  return defaultData;
}

export function updatePortfolio(data: any) {
  const current = getPortfolio();
  const updated = { ...current, ...data };
  try {
    fs.writeFileSync(dbPath, JSON.stringify(updated, null, 2));
  } catch (e) {
    console.error('Error writing DB:', e);
  }
  return updated;
}

// User Database Logic
const usersDbPath = path.join(process.cwd(), 'users-data.json');

const defaultUsers = [
  { name: 'Demo User', email: 'test@example.com', password: 'password123' }
];

export function getUsers() {
  try {
    if (fs.existsSync(usersDbPath)) {
      const data = fs.readFileSync(usersDbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading users DB:', e);
  }
  return defaultUsers;
}

export function findUser(email: string) {
  const users = getUsers();
  return users.find((u: any) => u.email === email);
}

export function createUser(user: any) {
  const users = getUsers();
  users.push(user);
  try {
    fs.writeFileSync(usersDbPath, JSON.stringify(users, null, 2));
  } catch (e) {
    console.error('Error writing users DB:', e);
  }
  return user;
}


import fs from 'fs';
import path from 'path';
import Redis from 'ioredis';
import { revalidatePath } from 'next/cache';

const dbPath = path.join(process.cwd(), 'portfolio-data.json');
const usersDbPath = path.join(process.cwd(), 'users-data.json');

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
  avatarUrl: "",
  visibleSections: {
    about: true,
    experience: true,
    skills: true,
    projects: true,
    testimonials: true,
    contact: true
  }
};

const defaultUsers = [
  { name: 'Demo User', email: 'test@example.com', password: 'password123' }
];

// Helper to check if we can use KV
const hasKV = () => {
  return !!(process.env.KV_REDIS_URL);
};

// Setup Redis instance natively
let redisClient: Redis | null = null;
const getRedisClient = () => {
  if (hasKV() && !redisClient) {
    redisClient = new Redis(process.env.KV_REDIS_URL as string);
  }
  return redisClient;
};

export async function getPortfolio() {
  const kv = getRedisClient();
  if (kv) {
    try {
      const dataStr = await kv.get('portfolio_data');
      if (dataStr) return JSON.parse(dataStr);

      // Seed KV if empty but local file exists
      if (fs.existsSync(dbPath)) {
        const localData = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
        await kv.set('portfolio_data', JSON.stringify(localData));
        return localData;
      }

      // Fallback to default
      await kv.set('portfolio_data', JSON.stringify(defaultData));
      return defaultData;
    } catch (e) {
      console.error('Error reading from KV:', e);
    }
  }

  // Fallback to local FS for dev or if KV fails
  try {
    if (fs.existsSync(dbPath)) {
      const data = fs.readFileSync(dbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading local DB:', e);
  }
  return defaultData;
}

export async function updatePortfolio(data: any) {
  const current = await getPortfolio();
  const updated = { ...current, ...data };

  if (hasKV()) {
    const kv = getRedisClient();
    if (kv) {
      try {
        await kv.set('portfolio_data', JSON.stringify(updated));
      } catch (e) {
        console.error('Error writing to KV:', e);
      }
    }
  } else {
    // Only write to FS if not using KV (local development)
    try {
      fs.writeFileSync(dbPath, JSON.stringify(updated, null, 2));
    } catch (e) {
      console.error('Error writing to local DB:', e);
    }
  }

  // Ensure the live site updates instantly by purging the cache
  try {
    revalidatePath('/');
  } catch (err) {
    console.error('Revalidation error:', err);
  }

  return updated;
}

export async function getUsers() {
  const kv = getRedisClient();
  if (kv) {
    try {
      const dataStr = await kv.get('users_data');
      if (dataStr) return JSON.parse(dataStr);

      // Seed from local
      if (fs.existsSync(usersDbPath)) {
        const localUsers = JSON.parse(fs.readFileSync(usersDbPath, 'utf8'));
        await kv.set('users_data', JSON.stringify(localUsers));
        return localUsers;
      }

      return defaultUsers;
    } catch (e) {
      console.error('Error reading users from KV:', e);
    }
  }

  try {
    if (fs.existsSync(usersDbPath)) {
      const data = fs.readFileSync(usersDbPath, 'utf8');
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Error reading local users DB:', e);
  }
  return defaultUsers;
}

export async function findUser(email: string) {
  const users: any = await getUsers();
  return users.find((u: any) => u.email === email);
}

export async function createUser(user: any) {
  const users: any = await getUsers();
  users.push(user);

  if (hasKV()) {
    const kv = getRedisClient();
    if (kv) {
      try {
        await kv.set('users_data', JSON.stringify(users));
      } catch (e) {
        console.error('Error writing users to KV:', e);
      }
    }
  } else {
    try {
      fs.writeFileSync(usersDbPath, JSON.stringify(users, null, 2));
    } catch (e) {
      console.error('Error writing to local users DB:', e);
    }
  }
  return user;
}




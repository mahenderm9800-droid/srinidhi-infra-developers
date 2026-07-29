import { db, isFirebaseAvailable } from '../firebase/config';
import { 
  collection, 
  getDocs, 
  getDoc, 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { 
  seedProjects, seedTestimonials, seedPosts, seedEnquiries,
  seedSettings, seedLeadership, seedMilestones 
} from './seedData';

// In-memory fallback database
let inMemoryDB = {
  projects: [...seedProjects],
  testimonials: [...seedTestimonials],
  posts: [...seedPosts],
  enquiries: [...seedEnquiries],
  settings: { ...seedSettings },
  leadership: [...seedLeadership],
  milestones: [...seedMilestones]
};

// Check if localStorage is functional and not full
const checkLocalStorageAvailable = () => {
  try {
    const testKey = 'srinidhi_storage_test';
    localStorage.setItem(testKey, '1');
    localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

const isLocalStorageAvailable = checkLocalStorageAvailable();

// Helper to initialize localStorage mock db
const initMockDB = () => {
  if (!isLocalStorageAvailable) {
    console.warn("localStorage is not available or quota is full. Using in-memory fallback.");
    return;
  }
  try {
    // Seeding Projects
    const storedProjects = localStorage.getItem('srinidhi_projects');
    if (!storedProjects) {
      localStorage.setItem('srinidhi_projects', JSON.stringify(seedProjects));
    } else {
      const currentStored = JSON.parse(storedProjects);
      let changed = false;
      seedProjects.forEach(sp => {
        if (!currentStored.some(p => p.id === sp.id)) {
          currentStored.push(sp);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('srinidhi_projects', JSON.stringify(currentStored));
      }
    }

    // Seeding Testimonials
    const storedTestimonials = localStorage.getItem('srinidhi_testimonials');
    if (!storedTestimonials) {
      localStorage.setItem('srinidhi_testimonials', JSON.stringify(seedTestimonials));
    } else {
      const currentStored = JSON.parse(storedTestimonials);
      let changed = false;
      seedTestimonials.forEach(st => {
        if (!currentStored.some(t => t.id === st.id)) {
          currentStored.push(st);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('srinidhi_testimonials', JSON.stringify(currentStored));
      }
    }

    // Seeding Blog Posts
    const storedPosts = localStorage.getItem('srinidhi_posts');
    if (!storedPosts || storedPosts.includes('photo-1582407947304') || storedPosts.includes('photo-1450133064473')) {
      localStorage.setItem('srinidhi_posts', JSON.stringify(seedPosts));
    } else {
      const currentStored = JSON.parse(storedPosts);
      let changed = false;
      seedPosts.forEach(sp => {
        const existingIdx = currentStored.findIndex(p => p.id === sp.id);
        if (existingIdx === -1) {
          currentStored.push(sp);
          changed = true;
        } else {
          currentStored[existingIdx] = sp;
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('srinidhi_posts', JSON.stringify(currentStored));
      }
    }

    // Seeding Enquiries
    if (!localStorage.getItem('srinidhi_enquiries')) {
      localStorage.setItem('srinidhi_enquiries', JSON.stringify(seedEnquiries));
    }

    // Seeding Settings
    const storedSettings = localStorage.getItem('srinidhi_settings');
    if (!storedSettings || storedSettings.includes('98765 43210') || storedSettings.includes('25+') || storedSettings.includes('650+')) {
      localStorage.setItem('srinidhi_settings', JSON.stringify(seedSettings));
    }

    // Seeding Leadership
    const storedLeadership = localStorage.getItem('srinidhi_leadership');
    if (!storedLeadership) {
      localStorage.setItem('srinidhi_leadership', JSON.stringify(seedLeadership));
    } else {
      const currentStored = JSON.parse(storedLeadership);
      let changed = false;
      seedLeadership.forEach(sl => {
        if (!currentStored.some(l => l.id === sl.id)) {
          currentStored.push(sl);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('srinidhi_leadership', JSON.stringify(currentStored));
      }
    }

    // Seeding Milestones
    const storedMilestones = localStorage.getItem('srinidhi_milestones');
    if (!storedMilestones) {
      localStorage.setItem('srinidhi_milestones', JSON.stringify(seedMilestones));
    } else {
      const currentStored = JSON.parse(storedMilestones);
      let changed = false;
      seedMilestones.forEach(sm => {
        if (!currentStored.some(m => m.id === sm.id)) {
          currentStored.push(sm);
          changed = true;
        }
      });
      if (changed) {
        localStorage.setItem('srinidhi_milestones', JSON.stringify(currentStored));
      }
    }
  } catch (e) {
    console.warn("Failed to populate mock data in localStorage:", e);
  }
};

initMockDB();

// Mock implementation helpers
const getMockData = (key) => {
  if (!isLocalStorageAvailable) {
    const field = key.replace('srinidhi_', '');
    return inMemoryDB[field] || [];
  }
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    const field = key.replace('srinidhi_', '');
    return inMemoryDB[field] || [];
  }
};

const saveMockData = (key, data) => {
  if (!isLocalStorageAvailable) {
    const field = key.replace('srinidhi_', '');
    inMemoryDB[field] = data;
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.warn("Failed to write to localStorage. Saving to memory.", e);
    const field = key.replace('srinidhi_', '');
    inMemoryDB[field] = data;
  }
};

// ==========================================
// PROJECTS SERVICE
// ==========================================
export const getProjects = async () => {
  if (isFirebaseAvailable) {
    try {
      const q = query(collection(db, 'projects'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (results.length > 0) return results;
    } catch (error) {
      console.error("Firebase getProjects failed. Falling back to mock data.", error);
    }
  }
  return getMockData('srinidhi_projects');
};

export const getProjectById = async (id) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, 'projects', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
    } catch (error) {
      console.error("Firebase getProjectById failed. Falling back to mock data.", error);
    }
  }
  const projects = getMockData('srinidhi_projects');
  return projects.find(p => p.id === id) || null;
};

export const addProject = async (projectData) => {
  const newProject = {
    ...projectData,
    createdAt: new Date().toISOString()
  };

  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, 'projects'), newProject);
      return { id: docRef.id, ...newProject };
    } catch (error) {
      console.error("Firebase addProject failed.", error);
      throw error;
    }
  }

  const projects = getMockData('srinidhi_projects');
  const id = projectData.name.toLowerCase().replace(/\s+/g, '-');
  const createdProject = { id, ...newProject };
  projects.unshift(createdProject);
  saveMockData('srinidhi_projects', projects);
  return createdProject;
};

export const updateProject = async (id, projectData) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, 'projects', id);
      await updateDoc(docRef, projectData);
      return { id, ...projectData };
    } catch (error) {
      console.error("Firebase updateProject failed.", error);
      throw error;
    }
  }

  const projects = getMockData('srinidhi_projects');
  const index = projects.findIndex(p => p.id === id);
  if (index !== -1) {
    projects[index] = { ...projects[index], ...projectData };
    saveMockData('srinidhi_projects', projects);
    return projects[index];
  }
  throw new Error("Project not found");
};

export const deleteProject = async (id) => {
  if (isFirebaseAvailable) {
    try {
      await deleteDoc(doc(db, 'projects', id));
      return id;
    } catch (error) {
      console.error("Firebase deleteProject failed.", error);
      throw error;
    }
  }

  const projects = getMockData('srinidhi_projects');
  const filtered = projects.filter(p => p.id !== id);
  saveMockData('srinidhi_projects', filtered);
  return id;
};

// ==========================================
// TESTIMONIALS SERVICE
// ==========================================
export const getTestimonials = async () => {
  if (isFirebaseAvailable) {
    try {
      const querySnapshot = await getDocs(collection(db, 'testimonials'));
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (results.length > 0) return results;
    } catch (error) {
      console.error("Firebase getTestimonials failed. Falling back to mock data.", error);
    }
  }
  return getMockData('srinidhi_testimonials');
};

export const addTestimonial = async (testimonialData) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, 'testimonials'), testimonialData);
      return { id: docRef.id, ...testimonialData };
    } catch (error) {
      console.error("Firebase addTestimonial failed.", error);
      throw error;
    }
  }

  const testimonials = getMockData('srinidhi_testimonials');
  const id = `test-${Date.now()}`;
  const newTestimonial = { id, ...testimonialData };
  testimonials.unshift(newTestimonial);
  saveMockData('srinidhi_testimonials', testimonials);
  return newTestimonial;
};

export const deleteTestimonial = async (id) => {
  if (isFirebaseAvailable) {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      return id;
    } catch (error) {
      console.error("Firebase deleteTestimonial failed.", error);
      throw error;
    }
  }

  const testimonials = getMockData('srinidhi_testimonials');
  const filtered = testimonials.filter(t => t.id !== id);
  saveMockData('srinidhi_testimonials', filtered);
  return id;
};

// ==========================================
// ENQUIRIES SERVICE
// ==========================================
export const getEnquiries = async () => {
  if (isFirebaseAvailable) {
    try {
      const querySnapshot = await getDocs(collection(db, 'enquiries'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } catch (error) {
      console.error("Firebase getEnquiries failed. Falling back to mock data.", error);
    }
  }
  return getMockData('srinidhi_enquiries');
};

export const addEnquiry = async (enquiryData) => {
  const newEnquiry = {
    ...enquiryData,
    status: "new",
    createdAt: new Date().toISOString()
  };

  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, 'enquiries'), newEnquiry);
      return { id: docRef.id, ...newEnquiry };
    } catch (error) {
      console.error("Firebase addEnquiry failed.", error);
      throw error;
    }
  }

  const enquiries = getMockData('srinidhi_enquiries');
  const id = `enq-${Date.now()}`;
  const createdEnquiry = { id, ...newEnquiry };
  enquiries.unshift(createdEnquiry);
  saveMockData('srinidhi_enquiries', enquiries);
  return createdEnquiry;
};

export const updateEnquiryStatus = async (id, status) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, 'enquiries', id);
      await updateDoc(docRef, { status });
      return { id, status };
    } catch (error) {
      console.error("Firebase updateEnquiryStatus failed.", error);
      throw error;
    }
  }

  const enquiries = getMockData('srinidhi_enquiries');
  const index = enquiries.findIndex(e => e.id === id);
  if (index !== -1) {
    enquiries[index].status = status;
    saveMockData('srinidhi_enquiries', enquiries);
    return enquiries[index];
  }
  throw new Error("Enquiry not found");
};

export const deleteEnquiry = async (id) => {
  if (isFirebaseAvailable) {
    try {
      await deleteDoc(doc(db, 'enquiries', id));
      return id;
    } catch (error) {
      console.error("Firebase deleteEnquiry failed.", error);
      throw error;
    }
  }

  const enquiries = getMockData('srinidhi_enquiries');
  const filtered = enquiries.filter(e => e.id !== id);
  saveMockData('srinidhi_enquiries', filtered);
  return id;
};

// ==========================================
// BLOG POSTS SERVICE
// ==========================================
export const getPosts = async () => {
  if (isFirebaseAvailable) {
    try {
      const q = query(collection(db, 'posts'), orderBy('publishedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (results.length > 0) return results;
    } catch (error) {
      console.error("Firebase getPosts failed. Falling back to mock data.", error);
    }
  }
  return getMockData('srinidhi_posts');
};

export const slugifyTitle = (title) => {
  if (!title) return '';
  return title
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

export const getPostById = async (id) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
    } catch (error) {
      console.error("Firebase getPostById failed. Falling back to mock data.", error);
    }
  }
  const posts = getMockData('srinidhi_posts');
  const targetId = id ? id.toLowerCase().trim() : '';
  return posts.find(p => 
    p.id === id || 
    (p.slug && p.slug.toLowerCase() === targetId) || 
    (p.title && slugifyTitle(p.title) === targetId)
  ) || null;
};

export const addPost = async (postData) => {
  const newPost = {
    ...postData,
    publishedAt: new Date().toISOString()
  };

  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, 'posts'), newPost);
      return { id: docRef.id, ...newPost };
    } catch (error) {
      console.error("Firebase addPost failed.", error);
      throw error;
    }
  }

  const posts = getMockData('srinidhi_posts');
  const id = `blog-${Date.now()}`;
  const createdPost = { id, ...newPost };
  posts.unshift(createdPost);
  saveMockData('srinidhi_posts', posts);
  return createdPost;
};

export const updatePost = async (id, postData) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, 'posts', id);
      await updateDoc(docRef, postData);
      return { id, ...postData };
    } catch (error) {
      console.error("Firebase updatePost failed.", error);
      throw error;
    }
  }

  const posts = getMockData('srinidhi_posts');
  const index = posts.findIndex(p => p.id === id);
  if (index !== -1) {
    posts[index] = { ...posts[index], ...postData };
    saveMockData('srinidhi_posts', posts);
    return posts[index];
  }
  throw new Error("Post not found");
};

export const deletePost = async (id) => {
  if (isFirebaseAvailable) {
    try {
      await deleteDoc(doc(db, 'posts', id));
      return id;
    } catch (error) {
      console.error("Firebase deletePost failed.", error);
      throw error;
    }
  }

  const posts = getMockData('srinidhi_posts');
  const filtered = posts.filter(p => p.id !== id);
  saveMockData('srinidhi_posts', filtered);
  return id;
};

// ==========================================
// SETTINGS SERVICE
// ==========================================
export const getSettings = async () => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, 'settings', 'global');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && Object.keys(data).length > 0) return data;
      }
    } catch (error) {
      console.error("Firebase getSettings failed. Falling back to mock data.", error);
    }
  }
  return getMockData('srinidhi_settings') || seedSettings;
};

export const updateSettings = async (settingsData) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = doc(db, 'settings', 'global');
      await updateDoc(docRef, settingsData);
      return settingsData;
    } catch (error) {
      console.error("Firebase updateSettings failed.", error);
      throw error;
    }
  }

  saveMockData('srinidhi_settings', settingsData);
  return settingsData;
};

// ==========================================
// LEADERSHIP SERVICE
// ==========================================
export const getLeadership = async () => {
  if (isFirebaseAvailable) {
    try {
      const querySnapshot = await getDocs(collection(db, 'leadership'));
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (results.length > 0) return results;
    } catch (error) {
      console.error("Firebase getLeadership failed. Falling back to mock data.", error);
    }
  }
  return getMockData('srinidhi_leadership');
};

export const addLeadership = async (leaderData) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, 'leadership'), leaderData);
      return { id: docRef.id, ...leaderData };
    } catch (error) {
      console.error("Firebase addLeadership failed.", error);
      throw error;
    }
  }

  const leadership = getMockData('srinidhi_leadership');
  const id = `lead-${Date.now()}`;
  const newLeader = { id, ...leaderData };
  leadership.push(newLeader);
  saveMockData('srinidhi_leadership', leadership);
  return newLeader;
};

export const deleteLeadership = async (id) => {
  if (isFirebaseAvailable) {
    try {
      await deleteDoc(doc(db, 'leadership', id));
      return id;
    } catch (error) {
      console.error("Firebase deleteLeadership failed.", error);
      throw error;
    }
  }

  const leadership = getMockData('srinidhi_leadership');
  const filtered = leadership.filter(l => l.id !== id);
  saveMockData('srinidhi_leadership', filtered);
  return id;
};

// ==========================================
// MILESTONES SERVICE
// ==========================================
export const getMilestones = async () => {
  if (isFirebaseAvailable) {
    try {
      const querySnapshot = await getDocs(collection(db, 'milestones'));
      const list = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      if (list.length > 0) {
        return list.sort((a, b) => Number(a.year) - Number(b.year));
      }
    } catch (error) {
      console.error("Firebase getMilestones failed. Falling back to mock data.", error);
    }
  }
  const list = getMockData('srinidhi_milestones') || [];
  return list.sort((a, b) => Number(a.year) - Number(b.year));
};

export const addMilestone = async (milestoneData) => {
  if (isFirebaseAvailable) {
    try {
      const docRef = await addDoc(collection(db, 'milestones'), milestoneData);
      return { id: docRef.id, ...milestoneData };
    } catch (error) {
      console.error("Firebase addMilestone failed.", error);
      throw error;
    }
  }

  const milestones = getMockData('srinidhi_milestones') || [];
  const id = `mile-${Date.now()}`;
  const newMilestone = { id, ...milestoneData };
  milestones.push(newMilestone);
  saveMockData('srinidhi_milestones', milestones);
  return newMilestone;
};

export const deleteMilestone = async (id) => {
  if (isFirebaseAvailable) {
    try {
      await deleteDoc(doc(db, 'milestones', id));
      return id;
    } catch (error) {
      console.error("Firebase deleteMilestone failed.", error);
      throw error;
    }
  }

  const milestones = getMockData('srinidhi_milestones') || [];
  const filtered = milestones.filter(m => m.id !== id);
  saveMockData('srinidhi_milestones', filtered);
  return id;
};

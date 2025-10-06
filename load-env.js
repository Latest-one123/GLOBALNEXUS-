import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// تحميل ملف .env يدوياً
function loadEnv() {
  try {
    const envPath = path.join(__dirname, '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const envLines = envContent.split('\n');
      
      for (const line of envLines) {
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          const value = match[2].trim().replace(/^"|"$/g, '');
          process.env[key] = value;
          console.log(`✅ Loaded: ${key}`);
        }
      }
      console.log('✅ Environment loaded successfully');
      return true;
    } else {
      console.log('❌ .env file not found');
      return false;
    }
  } catch (error) {
    console.log('❌ Error loading .env:', error.message);
    return false;
  }
}

loadEnv();


import { db } from "./index";
import { articles, users } from "@shared/schema";
import bcrypt from "bcrypt";

export async function seedDatabase() {
  console.log("🌱 بدء تهيئة قاعدة البيانات...");

  try {
    // إنشاء مستخدم إداري
    const hashedPassword = await bcrypt.hash("admin123", 10);
    await db.insert(users).values({
      username: "admin",
      password: hashedPassword,
    }).onConflictDoNothing();

    // إضافة مقالات باللغة العربية
    const arabicArticles = [
      {
        title: "تطورات جديدة في عالم التكنولوجيا",
        summary: "شركات التقنية تكشف عن ابتكارات جديدة ستغير مستقبل الذكاء الاصطناعي",
        content: "في تطور مثير، أعلنت عدة شركات تقنية عن ابتكارات جديدة في مجال الذكاء الاصطناعي...",
        category: "technology" as const,
        language: "ar" as const,
        author: "أحمد محمد",
        imageUrl: "/generated_images/Technology_news_placeholder_f2e7332c.png",
        readMinutes: 7,
        isBreaking: true,
      },
      {
        title: "نتائج مباريات كأس العالم",
        summary: "فوز ساحق للمنتخب المحلي في مباراة الأمس",
        content: "شهدت مباراة الأمس فوزاً ساحقاً للمنتخب المحلي بنتيجة 3-0...",
        category: "sports" as const,
        language: "ar" as const,
        author: "سارة أحمد",
        imageUrl: "/generated_images/Sports_news_placeholder_c5ad2fc0.png",
        readMinutes: 5,
        isBreaking: false,
      },
      {
        title: "تطورات الوضع السياسي",
        summary: "اجتماع طارئ لمجلس الأمن لمناقشة القضايا الإقليمية",
        content: "عقد مجلس الأمن اجتماعاً طارئاً لمناقشة التطورات الأخيرة...",
        category: "politics" as const,
        language: "ar" as const,
        author: "محمد علي",
        imageUrl: "/generated_images/Politics_news_placeholder_c8a4649d.png",
        readMinutes: 8,
        isBreaking: true,
      }
    ];

    // إضافة مقالات باللغة الإنجليزية
    const englishArticles = [
      {
        title: "Breaking: Major Tech Breakthrough",
        summary: "Scientists achieve quantum computing milestone with new processor design",
        content: "In a groundbreaking development, researchers have successfully created a new quantum processor...",
        category: "technology" as const,
        language: "en" as const,
        author: "John Smith",
        imageUrl: "/generated_images/Technology_news_placeholder_f2e7332c.png",
        readMinutes: 6,
        isBreaking: true,
      },
      {
        title: "Global Market Update",
        summary: "Stock markets show positive trends amid economic recovery",
        content: "Financial markets across the globe are showing signs of recovery...",
        category: "business" as const,
        language: "en" as const,
        author: "Emma Johnson",
        readMinutes: 4,
        isBreaking: false,
      },
      {
        title: "World News Roundup",
        summary: "International developments and diplomatic relations update",
        content: "Recent diplomatic meetings have led to significant agreements...",
        category: "world" as const,
        language: "en" as const,
        author: "David Wilson",
        readMinutes: 10,
        isBreaking: false,
      }
    ];

    // إدراج المقالات
    const allArticles = [...arabicArticles, ...englishArticles];
    await db.insert(articles).values(allArticles).onConflictDoNothing();

    console.log("✅ تم تهيئة قاعدة البيانات بنجاح!");
    console.log(`📰 تم إضافة ${allArticles.length} مقالة`);
    console.log("👤 تم إنشاء مستخدم إداري (admin/admin123)");

  } catch (error) {
    console.error("❌ خطأ في تهيئة قاعدة البيانات:", error);
  }
}

// تشغيل التهيئة إذا تم استدعاء الملف مباشرة
if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

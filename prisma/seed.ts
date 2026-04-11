import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_USER ?? "admin@example.com";
  const adminPassword = process.env.ADMIN_PASS ?? "admin123";
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  await prisma.adminUser.upsert({
    where: {
      email: adminEmail,
    },
    update: {
      password: hashedPassword,
    },
    create: {
      email: adminEmail,
      password: hashedPassword,
      name: "OrganoCity Admin",
    },
  });

  const defaults = [
    {
      key: "siteName",
      value: "OrganoCity",
    },
    {
      key: "termsOfService",
      value: {
        title: "Terms and Conditions",
        body: "<p>Welcome to OrganoCity. These terms and conditions outline the rules and regulations for the use of our website.</p>",
      },
    },
    {
      key: "privacyPolicy",
      value: {
        title: "Privacy Policy",
        body: "<p>At OrganoCity, we value your privacy and protect the information you share with us.</p>",
      },
    },
    {
      key: "refundPolicy",
      value: {
        title: "Refund Policy",
        body: "<p>If you are not satisfied with your purchase, please contact us so we can help resolve it.</p>",
      },
    },
    {
      key: "blogArticles",
      value: [],
    },
  ];

  for (const setting of defaults) {
    await prisma.siteSetting.upsert({
      where: { key: setting.key },
      update: { value: setting.value },
      create: setting,
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

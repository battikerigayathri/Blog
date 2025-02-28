import mercury from "@mercury-js/core";
const rules = [
  {
    modelName: "User",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Category",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "SubCategory",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Asset",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Blog",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
  },
  {
    modelName: "Setting",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    
  },
  {
    modelName: "Profile",
    access: {
      create: true,
      read: true,
      update: true,
      delete: true,
    },
    
  }
];
export const AdminProfile=mercury.access.createProfile('ADMIN',rules)
export type Scholarship = {
  id: string;
  name: string;
  university: string;
  country: string;
  degreeLevel: string;
  eligibleNationalities: string[];
  fieldsOfStudy: string[];
  minimumGpa: number;
  englishRequirement: string;
  fundingType: string;
  fundingAmount: string;
  deadline: string;
  requiredDocuments: string[];
  applicationUrl: string;
  featured?: boolean;
  published?: boolean;
  source?: "manual" | "api" | "sample";
  sourceId?: string;
  sourceUrl?: string;
  importedAt?: string;
  verifiedAt?: string;
};

export type StudentProfile = {
  fullName: string;
  nationality: string;
  educationLevel: string;
  gpa: string;
  fieldOfStudy: string;
  preferredDegree: string;
  preferredCountries: string[];
  englishTestType: string;
  englishScore: string;
  maxBudget: string;
};

export type ApplicationStatus = "Saved" | "Preparing" | "Submitted" | "Interview" | "Awarded";

export type TrackedApplication = {
  scholarshipId: string;
  status: ApplicationStatus;
  updatedAt: string;
};

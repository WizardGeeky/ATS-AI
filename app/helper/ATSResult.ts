export default interface ATSResult {
  fullName: string;
  email: string;
  linkedin: string;
  github: string;
  phoneNumber: string;
  isExperienced: boolean;
  needsImprovement: boolean;
  atsScore: number;
  matchScore: number;
  improvementSuggestions: string[];
  keywords: string[];
  isResume: boolean;
}

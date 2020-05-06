import weeklyQuestions from "./weeklyQuestions"

export interface WeeklySectionProps {
  applicationId?: string,
  applicant: weeklyQuestions,
  onSubmit?: (appId: string) => Promise<any>,
  isDisabled?: boolean,
  currentValue: Partial<weeklyQuestions>,
  handleChange: (weeklyApplication: weeklyQuestions) => void,
  handleEmploymentChange: (applicant: weeklyQuestions) => void,
  save: (application: Partial<weeklyQuestions>) => Promise<string>,
  localSave: (weeklyApplication:  weeklyQuestions) => void
}

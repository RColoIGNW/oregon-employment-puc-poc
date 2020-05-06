import weeklyQuestions from "./weeklyQuestions"

export interface WeeklySectionProps {
  applicationId?: string,
  applicant: weeklyQuestions,
  onSubmit?: (appId: string) => Promise<any>,
  isDisabled?: boolean,
  handleChange: (weeklyApplication: weeklyQuestions) => void,
  handleEmploymentChange: (applicant: weeklyQuestions) => void,
}

export interface WeeklyFormProps extends WeeklySectionProps {
  activeStep: number,
  setActiveStep: (step: number) => void,
  handleSave: () => any,
  handleBack: () => any,
  handleNext: () => any,
  save: (application: Partial<weeklyQuestions>) => Promise<string>,
  localSave: (weeklyApplication:  weeklyQuestions) => void,
}

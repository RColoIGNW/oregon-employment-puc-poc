import weeklyQuestions from "./weeklyQuestions"

export interface WeeklySectionProps {
  weeklyQuestions: weeklyQuestions,
  onChangeWeekly: (weeklyQuestions: weeklyQuestions) => void,
  status: 'in-progress' | 'submitted' | 'approved'
}

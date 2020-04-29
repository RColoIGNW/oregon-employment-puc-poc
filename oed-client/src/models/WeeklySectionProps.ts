import { SectionProps } from "./SectionProps"
import weeklyQuestions from "./weeklyQuestions"

export interface WeeklySectionProps extends SectionProps{
  weeklyQuestions: weeklyQuestions,
  onChangeWeekly: (weeklyQuestions: weeklyQuestions) => void
}

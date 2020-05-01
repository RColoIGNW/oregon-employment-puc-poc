import ApplicationModel from './Application'

export interface SectionProps {
  application: ApplicationModel,
  onChange: (application: ApplicationModel) => void
  isDisabled?: boolean
}

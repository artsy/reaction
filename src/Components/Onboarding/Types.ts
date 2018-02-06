/**
 * The props interface that the step needs to implement for the wizard.
 */
export interface StepProps {
  onNextButtonPressed: (increaseBy?) => void
}

export interface StepComponent extends React.ComponentClass<StepProps> {
  slug?: string
}

export interface FollowProps {
  updateFollowCount: (count: number) => void
}

export type StepSlugs = "artists" | "budget" | "categories" | "interests" | null

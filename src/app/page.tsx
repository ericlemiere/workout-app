import { workoutTemplates } from '@/data/workouts'
import { WorkoutLibrary } from '@/components/screens/WorkoutLibrary'

export default function Home() {
  return <WorkoutLibrary workouts={workoutTemplates} />
}

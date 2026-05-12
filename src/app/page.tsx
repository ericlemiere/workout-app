import { workouts } from '@/data/workouts'
import { WorkoutLibrary } from '@/components/workout/WorkoutLibrary'

export default function Home() {
  return <WorkoutLibrary workouts={workouts} />
}

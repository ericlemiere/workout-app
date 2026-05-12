import { notFound } from 'next/navigation'
import { getWorkoutById } from '@/data/workouts'
import { ActiveWorkoutScreen } from '@/components/workout/ActiveWorkoutScreen'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ActiveWorkoutPage({ params }: Props) {
  const { id } = await params
  const workout = getWorkoutById(id)
  if (!workout) notFound()
  return <ActiveWorkoutScreen workoutId={id} workout={workout} />
}

import { notFound } from 'next/navigation'
import { getWorkoutById } from '@/data/workouts'
import { WorkoutDetailScreen } from '@/components/workout/WorkoutDetailScreen'

interface Props {
  params: Promise<{ id: string }>
}

export default async function WorkoutDetailPage({ params }: Props) {
  const { id } = await params
  const workout = getWorkoutById(id)
  if (!workout) notFound()
  return <WorkoutDetailScreen workout={workout} />
}

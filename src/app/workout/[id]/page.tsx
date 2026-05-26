import { notFound } from 'next/navigation'
import { getWorkoutTemplateById } from '@/data/workouts'
import { WorkoutDetailScreen } from '@/components/workout/WorkoutDetailScreen'

interface Props {
  params: Promise<{ id: string }>
}

export default async function WorkoutDetailPage({ params }: Props) {
  const { id } = await params
  const template = getWorkoutTemplateById(id)
  if (!template) notFound()
  return <WorkoutDetailScreen template={template} />
}

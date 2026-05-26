import { notFound } from 'next/navigation'
import { getWorkoutTemplateById } from '@/data/workouts'
import { ActiveWorkoutScreen } from '@/components/workout/ActiveWorkoutScreen'

interface Props {
  params: Promise<{ id: string }>
}

export default async function ActiveWorkoutPage({ params }: Props) {
  const { id } = await params
  const template = getWorkoutTemplateById(id)
  if (!template) notFound()
  return <ActiveWorkoutScreen workoutId={id} template={template} />
}

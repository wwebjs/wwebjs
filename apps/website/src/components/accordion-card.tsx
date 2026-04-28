import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

interface AccordionCardProps {
  title: string
  description?: string
  children: React.ReactNode
}

function AccordionCard({ title, description, children }: AccordionCardProps) {
  return (
    <Card className="w-full mb-4 border-none bg-muted/50 shadow-none dark:bg-[#171717]">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && (
          <CardDescription className="text-foreground/70">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <Accordion>{children}</Accordion>
      </CardContent>
    </Card>
  )
}

export { AccordionCard, AccordionItem, AccordionTrigger, AccordionContent }

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SummaryDisplayProps {
  summary: string
}

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  return (
    <Card className="mt-4 bg-primary/10">
      <CardHeader>
        <CardTitle className="text-primary">Report Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{summary}</p>
      </CardContent>
    </Card>
  )
}


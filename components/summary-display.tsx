import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SummaryDisplayProps {
  summary: string
}

export function SummaryDisplay({ summary }: SummaryDisplayProps) {
  return (
    <Card className="mt-4 bg-purple-50/50 border-purple-100">
    <CardHeader className="pb-2">
      <CardTitle className="text-purple-900 text-lg">Report Summary</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-purple-700">{summary}</p>
    </CardContent>
  </Card>
  )
}


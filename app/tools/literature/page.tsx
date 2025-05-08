import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Search, Filter, BookOpen, Download } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function LiteratureAnalyzerPage() {
  return (
    <PageLayout
      title="Literature Analyzer"
      description="Analyze medical literature and extract key insights"
      headerAction={
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <BookOpen className="mr-2 h-4 w-4" /> Browse Literature
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search medical literature..." className="pl-9 border-gray-200" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2 border-gray-200">
              <Filter className="h-4 w-4" /> Filter
            </Button>
            <Button variant="outline" className="flex gap-2 border-gray-200">
              <Download className="h-4 w-4" /> Export
            </Button>
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Recent Analyses</h2>
          <div className="space-y-4">
            {[
              {
                title: "Cardiovascular Disease Prevention",
                date: "2024-04-15",
                papers: 12,
                status: "Completed",
              },
              {
                title: "Oncology Treatment Protocols",
                date: "2024-04-10",
                papers: 8,
                status: "In Progress",
              },
              {
                title: "Neurological Disorders Research",
                date: "2024-04-05",
                papers: 15,
                status: "Completed",
              },
            ].map((analysis, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{analysis.title}</h3>
                    <p className="text-sm text-gray-500">
                      {analysis.papers} papers • {analysis.date}
                    </p>
                  </div>
                  <div className="text-sm">
                    <span
                      className={`px-2 py-1 ${
                        analysis.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {analysis.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Start New Analysis</h2>
          <p className="text-gray-600 mb-4">
            Upload papers or search for literature to begin a new analysis. Our AI will extract key findings, methods,
            and conclusions.
          </p>
          <div className="flex gap-4">
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">Upload Papers</Button>
            <Button variant="outline" className="border-gray-200">
              Search Literature
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

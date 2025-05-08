import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Search, ArrowLeftRight, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function StudyComparatorPage() {
  return (
    <PageLayout
      title="Study Comparator"
      description="Compare multiple medical studies and identify similarities and differences"
      headerAction={
        <Button className="bg-blue-500 hover:bg-blue-600 text-white">
          <Plus className="mr-2 h-4 w-4" /> New Comparison
        </Button>
      }
    >
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search saved comparisons..." className="pl-9 border-gray-200" />
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Recent Comparisons</h2>
          <div className="space-y-4">
            {[
              {
                title: "COVID-19 Vaccine Efficacy Studies",
                date: "2024-04-12",
                studies: 4,
              },
              {
                title: "Diabetes Treatment Approaches",
                date: "2024-04-08",
                studies: 3,
              },
              {
                title: "Hypertension Management Protocols",
                date: "2024-04-03",
                studies: 5,
              },
            ].map((comparison, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <div className="flex items-center">
                  <ArrowLeftRight className="h-5 w-5 text-blue-500 mr-3" />
                  <div>
                    <h3 className="font-medium text-gray-800">{comparison.title}</h3>
                    <p className="text-sm text-gray-500">
                      {comparison.studies} studies • {comparison.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Compare by Topic</h2>
            <p className="text-gray-600 mb-4">Select a medical topic to compare relevant studies.</p>
            <div className="space-y-2">
              {["Cardiology", "Oncology", "Neurology", "Immunology", "Endocrinology"].map((topic, i) => (
                <div key={i} className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                  {topic}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Compare Specific Studies</h2>
            <p className="text-gray-600 mb-4">Upload or select specific studies to compare directly.</p>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white w-full">Select Studies</Button>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

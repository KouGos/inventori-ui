import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Lightbulb, Save } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function HypothesisGeneratorPage() {
  return (
    <PageLayout
      title="Hypothesis Generator"
      description="Generate research hypotheses based on existing literature and data"
    >
      <div className="space-y-6">
        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Generate New Hypothesis</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Research Area</label>
              <Input placeholder="e.g., Cardiovascular disease, Oncology, Neurology" className="border-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Key Variables</label>
              <Input placeholder="e.g., Blood pressure, Age, Treatment type" className="border-gray-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Existing Knowledge</label>
              <textarea
                className="w-full p-2 border border-gray-200 rounded-none"
                rows={4}
                placeholder="Briefly describe what is already known about this topic..."
              ></textarea>
            </div>
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              <Lightbulb className="mr-2 h-4 w-4" /> Generate Hypotheses
            </Button>
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Saved Hypotheses</h2>
          <div className="space-y-4">
            {[
              {
                hypothesis:
                  "Regular consumption of polyphenol-rich foods may reduce the risk of cardiovascular events in patients with type 2 diabetes.",
                date: "2024-04-10",
                area: "Cardiovascular Health",
              },
              {
                hypothesis:
                  "Combination of immunotherapy with targeted radiation may improve outcomes in treatment-resistant glioblastoma.",
                date: "2024-04-05",
                area: "Oncology",
              },
              {
                hypothesis:
                  "Early intervention with cognitive behavioral therapy may reduce the severity of post-traumatic stress symptoms in emergency healthcare workers.",
                date: "2024-04-01",
                area: "Mental Health",
              },
            ].map((item, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200">
                <div className="flex justify-between">
                  <div>
                    <p className="font-medium text-gray-800">{item.hypothesis}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {item.area} • Generated on {item.date}
                    </p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8 border-gray-200">
                    <Save className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

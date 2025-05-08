import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Search, Pill, Filter, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function DrugDatabasePage() {
  return (
    <PageLayout title="Drug Database" description="Comprehensive information on medications, interactions, and dosing">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input placeholder="Search medications..." className="pl-9 border-gray-200" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="border-gray-200">
              <Filter className="mr-2 h-4 w-4" /> Filter
            </Button>
          </div>
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Common Medications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: "Atorvastatin",
                brand: "Lipitor",
                class: "Statin",
                use: "Cholesterol reduction",
              },
              {
                name: "Lisinopril",
                brand: "Prinivil, Zestril",
                class: "ACE Inhibitor",
                use: "Hypertension, heart failure",
              },
              {
                name: "Metformin",
                brand: "Glucophage",
                class: "Biguanide",
                use: "Type 2 diabetes",
              },
              {
                name: "Levothyroxine",
                brand: "Synthroid",
                class: "Thyroid hormone",
                use: "Hypothyroidism",
              },
            ].map((drug, i) => (
              <div key={i} className="p-4 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <div className="flex items-start">
                  <Pill className="h-5 w-5 text-blue-500 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-gray-800">{drug.name}</h3>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Brand:</span> {drug.brand}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Class:</span> {drug.class}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-medium">Use:</span> {drug.use}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">By Class</h2>
            <div className="space-y-2">
              {[
                "Antibiotics",
                "Antihypertensives",
                "Antidepressants",
                "Antidiabetics",
                "Statins",
                "NSAIDs",
                "Anticoagulants",
                "Bronchodilators",
              ].map((cls, i) => (
                <div key={i} className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                  {cls}
                </div>
              ))}
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Tools</h2>
            <div className="space-y-3">
              <div className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium">Interaction Checker</h3>
                <p className="text-sm text-gray-500">Check for potential drug interactions</p>
              </div>
              <div className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium">Dosage Calculator</h3>
                <p className="text-sm text-gray-500">Calculate appropriate dosages</p>
              </div>
              <div className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <h3 className="font-medium">Side Effect Lookup</h3>
                <p className="text-sm text-gray-500">Search for medication side effects</p>
              </div>
            </div>
          </div>

          <div className="border border-gray-200 p-6">
            <h2 className="text-xl font-normal text-gray-800 mb-4">Recent Alerts</h2>
            <div className="space-y-3">
              {[
                {
                  drug: "Methotrexate",
                  alert: "Updated dosing guidelines for rheumatoid arthritis",
                  date: "April 15, 2024",
                },
                {
                  drug: "Valsartan",
                  alert: "Recall of specific lots due to impurity",
                  date: "April 10, 2024",
                },
                {
                  drug: "Fluoroquinolones",
                  alert: "New black box warning for aortic aneurysm risk",
                  date: "April 5, 2024",
                },
              ].map((alert, i) => (
                <div key={i} className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                  <div className="flex items-start">
                    <AlertCircle className="h-4 w-4 text-red-500 mr-2 mt-0.5" />
                    <div>
                      <h3 className="font-medium text-gray-800">{alert.drug}</h3>
                      <p className="text-sm text-gray-600">{alert.alert}</p>
                      <p className="text-xs text-gray-500">{alert.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

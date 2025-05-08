import { PageLayout } from "@/components/page-layout"
import { Search, Heart, Brain, TreesIcon as Lungs, Microscope, Pill } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MedicalSpecialtiesPage() {
  return (
    <PageLayout title="Medical Specialties" description="Explore knowledge across different medical specialties">
      <div className="space-y-6">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input placeholder="Search medical specialties..." className="pl-9 border-gray-200" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Cardiology",
              icon: <Heart className="h-8 w-8 text-red-500" />,
              topics: 124,
              description: "Heart and cardiovascular system",
            },
            {
              name: "Neurology",
              icon: <Brain className="h-8 w-8 text-blue-500" />,
              topics: 98,
              description: "Brain and nervous system",
            },
            {
              name: "Pulmonology",
              icon: <Lungs className="h-8 w-8 text-purple-500" />,
              topics: 86,
              description: "Lungs and respiratory system",
            },
            {
              name: "Oncology",
              icon: <Microscope className="h-8 w-8 text-green-500" />,
              topics: 112,
              description: "Cancer and tumors",
            },
            {
              name: "Endocrinology",
              icon: <Pill className="h-8 w-8 text-amber-500" />,
              topics: 74,
              description: "Hormones and metabolic processes",
            },
            {
              name: "Gastroenterology",
              icon: <div className="h-8 w-8 text-orange-500">GI</div>,
              topics: 92,
              description: "Digestive system and related disorders",
            },
          ].map((specialty, i) => (
            <div key={i} className="border border-gray-200 hover:border-blue-200 cursor-pointer">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {specialty.icon}
                  <h3 className="text-xl font-medium text-gray-800 ml-3">{specialty.name}</h3>
                </div>
                <p className="text-gray-600 mb-2">{specialty.description}</p>
                <p className="text-sm text-gray-500">{specialty.topics} topics</p>
              </div>
            </div>
          ))}
        </div>

        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-normal text-gray-800 mb-4">Recent Updates</h2>
          <div className="space-y-3">
            {[
              {
                specialty: "Cardiology",
                update: "New guidelines for hypertension management in elderly patients",
                date: "2024-04-15",
              },
              {
                specialty: "Oncology",
                update: "Updated protocols for immunotherapy in advanced melanoma",
                date: "2024-04-12",
              },
              {
                specialty: "Neurology",
                update: "Recent advances in Alzheimer's disease biomarkers",
                date: "2024-04-08",
              },
            ].map((update, i) => (
              <div key={i} className="p-3 border border-gray-200 hover:border-blue-200 cursor-pointer">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium text-gray-800">{update.update}</h3>
                    <p className="text-sm text-gray-500">
                      {update.specialty} • {update.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  )
}

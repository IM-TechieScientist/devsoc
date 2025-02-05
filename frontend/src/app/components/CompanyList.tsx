import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mockCompanies = [
  { id: 1, name: "Green Energy Co", sector: "Energy", esgScore: 88 },
  { id: 2, name: "Sustainable Tech", sector: "Technology", esgScore: 92 },
  { id: 3, name: "Eco Friendly Manufacturing", sector: "Manufacturing", esgScore: 85 },
]

export default function CompanyList() {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Performing Companies</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {mockCompanies.map((company) => (
          <Card key={company.id}>
            <CardHeader>
              <CardTitle>{company.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{company.sector}</p>
              <p className="text-2xl font-bold text-green-600 mt-2">{company.esgScore}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}


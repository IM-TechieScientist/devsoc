import type React from "react"
import { useState, useEffect } from "react"
import { Card, Title, Text, Button } from "@tremor/react"

interface SecRecordDisplayProps {
  companyName: string
}

const SecRecordDisplay: React.FC<SecRecordDisplayProps> = ({ companyName }) => {
  const [secRecord, setSecRecord] = useState<string[]>([])
  const [isExpanded, setIsExpanded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (companyName) {
      fetchSecRecord()
    }
  }, [companyName])

  const fetchSecRecord = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`http://192.168.24.150:6969/sec_record/${companyName}`)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      if (Array.isArray(data) && data.length > 1) {
        setSecRecord(data)
      } else {
        throw new Error("Unexpected data format")
      }
    } catch (error) {
      setError("Failed to fetch SEC record")
      console.error("Error fetching SEC record:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <Text>Loading SEC record...</Text>
  if (error) return <Text color="red">{error}</Text>
  if (!secRecord.length) return null

  return (
    <Card className="mt-6">
      <Title>SEC Record</Title>
      <Text>{secRecord[1]}</Text>
      <Button size="sm" variant="secondary" className="mt-2" onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Collapse" : "Expand"}
      </Button>
      {isExpanded && (
        <div className="mt-4 max-h-60 overflow-y-auto">
          <Text>{secRecord[2]}</Text>
        </div>
      )}
    </Card>
  )
}

export default SecRecordDisplay


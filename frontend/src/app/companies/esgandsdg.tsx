// "use client"

// import { useEffect, useState } from "react";
// import { Card, Title, Text } from "@tremor/react";

// interface SecReportsProps {
//   companyName: string;
// }

// const SecReports: React.FC<SecReportsProps> = ({ companyName }) => {
//   const [secReports, setSecReports] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchSecReports = async () => {
//       try {
//         const response = await fetch(`http://192.168.24.150:6969/sec_reports/${companyName}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const reportsData = await response.json();
//         setSecReports(reportsData.map((item: any) => item[1])); // Extract the second index
//       } catch (error) {
//         console.error('Error fetching SEC reports:', error);
//       }
//     };

//     if (companyName) {
//       fetchSecReports();
//     }
//   }, [companyName]);

//   return (
//     <div className="mt-6">
//       <Card>
//         <Title className="text-black font-bold">SDG Goals</Title>
//         {secReports.length > 0 ? (
//           <ul className="list-disc pl-5">
//             {secReports.map((report, index) => (
//               <li key={index} className="text-black">{report}</li>
//             ))}
//           </ul>
//         ) : (
//           <Text className="text-black">No reports available.</Text>
//         )}
//       </Card>
//     </div>
//   );
// };

// export default SecReports;


// try {
//     await delay(1000)
//     const sec_resp = await fetch('http://192.168.24.150:6969/sec_reports/${companyName}');
//     if (!sec_resp.ok){
//         throw new Error('HTTP error! status: ${sec_resp.status}');

//     }
//     const reportsData = await sec_resp.json();
//     const secReports = reportsData.map((item: any) => item[1]);
    
// } catch (error) {
    
// }

// "use client"

// import { useEffect, useState } from "react";
// import { Card, Title, Text } from "@tremor/react";

// interface EsgAndSdgProps {
//   companyName: string;
// }

// const EsgAndSdg: React.FC<EsgAndSdgProps> = ({ companyName }) => {
//   const [secRecord, setSecRecord] = useState<string | null>(null); // State for SEC record

//   useEffect(() => {
//     const fetchSecRecord = async () => {
//       if (!companyName) return; // Don't fetch if companyName is empty
//       try {
//         const response = await fetch(`http://192.168.24.150:6969/sec_record/${companyName}`);
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const secRecordData = await response.json();
//         setSecRecord(secRecordData[1]); // Set the second index of the returned list
//       } catch (error) {
//         console.error('Error fetching SEC record:', error);
//       }
//     };

//     fetchSecRecord();
//   }, [companyName]); // Fetch when companyName changes

//   return (
//     <div className="mt-4">
//       {secRecord && (
//         <Card>
//           <Title className="text-black font-bold">SEC Record</Title>
//           <Text className="text-black">{secRecord}</Text>
//         </Card>
//       )}
//     </div>
//   );
// };

// export default EsgAndSdg;



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


// // import Image from "next/image";

// // export default function Home() {
// //   return (
// //     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
// //       <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
// //         <Image
// //           className="dark:invert"
// //           src="/next.svg"
// //           alt="Next.js logo"
// //           width={180}
// //           height={38}
// //           priority
// //         />
// //         <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
// //           <li className="mb-2">
// //             Get started by editing{" "}
// //             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
// //               src/app/page.tsx
// //             </code>
// //             .
// //           </li>
// //           <li>Save and see your changes instantly.</li>
// //         </ol>

// //         <div className="flex gap-4 items-center flex-col sm:flex-row">
// //           <a
// //             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
// //             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             <Image
// //               className="dark:invert"
// //               src="/vercel.svg"
// //               alt="Vercel logomark"
// //               width={20}
// //               height={20}
// //             />
// //             Deploy now
// //           </a>
// //           <a
// //             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
// //             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //             target="_blank"
// //             rel="noopener noreferrer"
// //           >
// //             Read our docs
// //           </a>
// //         </div>
// //       </main>
// //       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/file.svg"
// //             alt="File icon"
// //             width={16}
// //             height={16}
// //           />
// //           Learn
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/window.svg"
// //             alt="Window icon"
// //             width={16}
// //             height={16}
// //           />
// //           Examples
// //         </a>
// //         <a
// //           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
// //           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
// //           target="_blank"
// //           rel="noopener noreferrer"
// //         >
// //           <Image
// //             aria-hidden
// //             src="/globe.svg"
// //             alt="Globe icon"
// //             width={16}
// //             height={16}
// //           />
// //           Go to nextjs.org →
// //         </a>
// //       </footer>
// //     </div>
// //   );
// // }
// import Link from "next/link"
// import { Button } from "@/components/ui/button"

// export default function LandingPage() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
//       <div className="max-w-3xl text-center">
//         <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
//           <span className="block">ESG Sentinel</span>
//           <span className="block text-green-600">Your AI-driven compass for sustainable investing</span>
//         </h1>
//         <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
//           Empower your investment decisions with instant, sector-specific ESG scores powered by real-time data and
//           predictive analytics.
//         </p>
//         <div className="mt-5 sm:mt-8 sm:flex sm:justify-center">
//           <div className="rounded-md shadow">
//             <Button
//               asChild
//               className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
//             >
//               <Link href="/companies">View companies</Link>
//             </Button>
//           </div>
//           <div className="mt-3 sm:mt-0 sm:ml-3">
//             <Button
//               asChild
//               className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
//             >
//               <Link href="/login">Login to Get Started</Link>
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, Title, Text, Grid, Col, Metric } from "@tremor/react"
import { BarChart, TrendingUp, Shield } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
          <span className="block">ESG Oracle</span>
          <span className="block text-green-600 mt-2">Sustainable Investing Insights</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-black sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Empower your investment decisions with our AI-driven ESG and Stock Performance Dashboard.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Button
              asChild
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
            >
              <Link href="/companies">View Companies</Link>
            </Button>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <Button
              asChild
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10"
            >
              <Link href="/login">Login</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-7xl mx-auto">
          <Title className="text-center mb-10">Key Features</Title>
          <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
            <Col>
              <Card className="h-full">
                <BarChart className="h-12 w-12 mx-auto text-green-600" />
                <Title className="mt-4 text-center">ESG Score Analysis</Title>
                <Text className="text-center mt-2">
                  Comprehensive breakdown of Environmental, Social, and Governance factors.
                </Text>
              </Card>
            </Col>
            <Col>
              <Card className="h-full">
                <TrendingUp className="h-12 w-12 mx-auto text-green-600" />
                <Title className="mt-4 text-center">Stock Performance Tracking</Title>
                <Text className="text-center mt-2">
                  Real-time stock price trends and historical data visualization.
                </Text>
              </Card>
            </Col>
            <Col>
              <Card className="h-full">
                <Shield className="h-12 w-12 mx-auto text-green-600" />
                <Title className="mt-4 text-center">SEC Filing Insights</Title>
                <Text className="text-center mt-2">
                  Extracted key information from SEC reports for informed decision-making.
                </Text>
              </Card>
            </Col>
          </Grid>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 sm:px-6 bg-black lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Title className="text-center mb-10">Benefits for Investors</Title>
          <Grid numItems={1} numItemsSm={2} numItemsLg={3} className="gap-6">
            <Col>
              <Card>
                <Metric>Better Decisions</Metric>
                <Text className="mt-2">Link ESG performance to financial trends for comprehensive analysis.</Text>
              </Card>
            </Col>
            <Col>
              <Card>
                <Metric>Improved Transparency</Metric>
                <Text className="mt-2">Access clear and concise ESG reporting for companies of interest.</Text>
              </Card>
            </Col>
            <Col>
              <Card>
                <Metric>Increased Confidence</Metric>
                <Text className="mt-2">Make sustainable and financially sound investment choices.</Text>
              </Card>
            </Col>
          </Grid>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          <span className="block">Ready to make informed investment decisions?</span>
        </h2>
        <p className="mt-4 text-lg leading-6 text-gray-500">
          Start exploring companies and their ESG performance today.
        </p>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <Button
              asChild
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
            >
              <Link href="/companies">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


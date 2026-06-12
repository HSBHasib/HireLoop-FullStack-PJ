import Banner from "@/components/homePage/Banner/Banner"
import Featured from "@/components/homePage/Featured/Featured"
import Footer from "@/components/homePage/Footer/Footer"
import JobSection from "@/components/homePage/Jobs/Job"
import PricingSection from "@/components/homePage/Pricing/PricingSection"

const Home = () => {
  return(
    <div>
      <Banner />
      <JobSection />
      <Featured />
      <PricingSection />
      <Footer />
    </div>
  )
} 

export default Home

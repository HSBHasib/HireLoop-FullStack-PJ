import Banner from "@/components/homePage/Banner/Banner"
import Featured from "@/components/homePage/Featured/Featured"
import Footer from "@/components/homePage/Footer/Footer"
import JobSection from "@/components/homePage/Jobs/Job"

const Home = () => {
  return(
    <div>
      <Banner />
      <JobSection />
      <Featured />
      <Footer />
    </div>
  )
} 

export default Home

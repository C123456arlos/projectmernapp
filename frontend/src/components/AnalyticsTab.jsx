import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import axios from "../lib/axios"
import { Users, Package, ShoppingCart, DollarSign } from "lucide-react"
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
const AnalyticsTab = () => {
  const [analyticsData, setAnalyticsData] = useState({
    user: 0,
    products: 0,
    totalSales: 0,
    totalRevenue:0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [dailySalesData, setDailySalesData]= useState([])
  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const response = await axios.get('/analytics')
        setAnalyticsData(response.data.analyticsData)
        setDailySalesData(response.data.dailySalesData)
        setIsLoading(false)
      } catch (error) {
        console.error('error fetching analytics data', error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchAnalyticsData()
  }, [])
  if (isLoading) {
    return <div>loading</div>
  }
  console.log(dailySalesData, 'test')
  const data = [{ t: 1, v:2}, { t: 4, v:8}]
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <AnalyticsCard title='total users' value={analyticsData.user} icon={Users} color={'from-emerald-500 to-teal-700'}></AnalyticsCard>
        {/* <AnalyticsCard title='total users' value={analyticsData.users.toLocaleString()} icon={Users} color={'from-emerald-500 to-teal-700'}></AnalyticsCard> */}
        <AnalyticsCard title='total products' value={analyticsData.products} icon={Package} color={'from-emerald-500 to-green-700'}></AnalyticsCard>
        <AnalyticsCard title='total sales' value={analyticsData.totalSales} icon={ShoppingCart} color={'from-emerald-500 to-cyan-700'}></AnalyticsCard>
        <AnalyticsCard title='total revenue' value={analyticsData.totalRevenue} icon={DollarSign} color={'from-emerald-500 to-lime-700'}></AnalyticsCard>
      </div>
      <motion.div className="bg-gray-800/60 rounded-lg p-6 shadow-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}>
        <ResponsiveContainer width='100%' height={400}>
          <LineChart data={dailySalesData} >
        <CartesianGrid strokeDasharray={'3 3'}></CartesianGrid>
          <XAxis dataKey='date' stroke='#d1d5db'></XAxis>
          <YAxis yAxisId={'left'} stroke='#d1d5db'></YAxis>
          <YAxis yAxisId={'right'} orientation='right' stroke='#d1d5db'></YAxis>
            <Tooltip></Tooltip>
            <Legend></Legend>
            <Line yAxisId={'left'} type='monotone' dataKey='sales' stroke={'#10b981'} activeDot={{r:8}} name='sales'></Line>
            <Line yAxisId={'right'} type='monotone' dataKey='revenue' stroke={'#3b82f6'} activeDot={{r:8}} name='revenue'></Line>
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
               
</div>

  )
}
export default AnalyticsTab
const AnalyticsCard = ({ title, value, icon: Icon, color }) => (
  <motion.div className={`bg-gray-800 rounded-lg p-6 shadow-lg overflow-hidden relative ${color}`} initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 20 }} transition={{ duration: 0.5 }}>
    <div className="flex justify-between items-center">
      <div className="z-10">
        <p className="text-emerald-300 text-smm mb-1 font-semibold">{title}</p>
        <h3 className="text-white text-3xl font-bold">{value}</h3>
      </div>
    </div>
    <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-emerald-900 opacity-30"></div>
    <div className="absolute -bottom-4 -right-4 text-emerald-800 opacity-50">
      <Icon className='h-32 w-32'></Icon>
    </div>
  </motion.div>
)


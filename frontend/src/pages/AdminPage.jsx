import { BarChart, PlusCircle, ShoppingBasket } from "lucide-react"
import {motion} from 'framer-motion'
import CreateProductForm from "../components/CreateProductForm"
import ProductList from "../components/ProductList"
import AnalyticsTab from "../components/AnalyticsTab"
import { useEffect, useState } from "react"
import { useProductStore } from "../stores/useProductStore"
const tabs = [
  {id:'create', label:'create product', icon:PlusCircle},
  {id:'products', label:'products', icon:ShoppingBasket},
  {id:'analytics', label:'analytics', icon:BarChart},
]
const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create')
  const { fetchAllProducts } = useProductStore()
  useEffect(() => {
    fetchAllProducts()
  },[fetchAllProducts])
  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.h1 className='text-4xl font-bold mb-8 text-emerald-400 text-center' initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}>admin dashboard</motion.h1>
        <div className="flex justify-center mb-8">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center px-4 py-2 mx-2 rounded-md transition-color duration-200 ${activeTab === tab.id ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}>
              <tab.icon className="mr-2 h-5 w-5"></tab.icon>
              {tab.label}
            </button>
          ))}
        </div>
        {activeTab==='create' &&<CreateProductForm></CreateProductForm>}
        {activeTab==='products' &&<ProductList></ProductList>}
        {activeTab==='analytics' &&<AnalyticsTab></AnalyticsTab>}
      </div>
    </div>
  )
}

export default AdminPage
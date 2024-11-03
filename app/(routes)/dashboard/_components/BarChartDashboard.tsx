import { BudgetItem } from '@/types'
import React from 'react'
import { Bar ,Legend , BarChart , ResponsiveContainer , Tooltip , XAxis , YAxis} from 'recharts'
interface Budget {
    budgetList:BudgetItem[];
}
const BarChartDashboard = ({budgetList}:Budget) => {
  return (
    <div className='border rounded-2xl p-5'>
        <ResponsiveContainer width={'80%'} height={300}  >
            <BarChart data={budgetList} margin={{ top: 7}} > 
                <XAxis dataKey='name'/>
                <YAxis/>
                <Tooltip />
                <Legend />
                <Bar dataKey='totalSpend' stackId='a' fill='#4845d2' />
                <Bar dataKey="amount" stackId="a" fill="#C3C2FF" />
            </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default BarChartDashboard
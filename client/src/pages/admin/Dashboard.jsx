import React, { useEffect } from 'react';
import { assets, dashboard_data } from '../../assets/assets';
import { useState } from 'react';
import BlogTableItem from '../../components/admin/BlogTableItem';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';


const Dashboard = () => {

  const [dashboardData, setDashboardData] = useState({
      blogs: 0,
      comments: 0,
      drafts: 0,
      recentBlogs: []
  })

  const { axios } = useAppContext()

  const fetchDashboard = async ()=> {
    try {
      const {data} = await axios.get('/api/admin/dashboard')
      // console.log(" DASHBOARD API RESPONSE:", data);
      data.success ? setDashboardData(data.dashboardData) : toast.error(data.message)
      // console.log(dashboardData);
      
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=> {
    fetchDashboard()
  },[])

  return (
    <div className='flex-1 p-6 md:p-12 bg-[var(--color-background)] overflow-y-auto'>
      <h2 className="font-editorial text-3xl font-bold text-[var(--color-text-main)] mb-8 tracking-tight">Overview</h2>
      
      <div className='flex flex-wrap gap-6 mb-12'>
        <div className='flex-1 min-w-[240px] flex items-center gap-5 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm shadow-[var(--shadow-editorial-sm)] hover:shadow-[var(--shadow-editorial-md)] transition-shadow cursor-pointer'>
            <div className='w-12 h-12 flex items-center justify-center bg-[var(--color-background)] border border-[var(--color-border)] rounded-full'>
              <img src={assets.dashboard_icon_1} alt="Blogs" className='w-5 opacity-70' />
            </div>
            <div>
              <p className='text-3xl font-editorial font-bold text-[var(--color-text-main)]'>{dashboardData?.blogs}</p>
              <p className='text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold mt-1'>Published</p>
            </div>
        </div>

        <div className='flex-1 min-w-[240px] flex items-center gap-5 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm shadow-[var(--shadow-editorial-sm)] hover:shadow-[var(--shadow-editorial-md)] transition-shadow cursor-pointer'>
            <div className='w-12 h-12 flex items-center justify-center bg-[var(--color-background)] border border-[var(--color-border)] rounded-full'>
              <img src={assets.dashboard_icon_2} alt="Comments" className='w-5 opacity-70' />
            </div>
            <div>
              <p className='text-3xl font-editorial font-bold text-[var(--color-text-main)]'>{dashboardData?.comments}</p>
              <p className='text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold mt-1'>Comments</p>
            </div>
        </div>

        <div className='flex-1 min-w-[240px] flex items-center gap-5 bg-[var(--color-surface)] border border-[var(--color-border)] p-6 rounded-sm shadow-[var(--shadow-editorial-sm)] hover:shadow-[var(--shadow-editorial-md)] transition-shadow cursor-pointer'>
            <div className='w-12 h-12 flex items-center justify-center bg-[var(--color-background)] border border-[var(--color-border)] rounded-full'>
              <img src={assets.dashboard_icon_3} alt="Drafts" className='w-5 opacity-70' />
            </div>
            <div>
              <p className='text-3xl font-editorial font-bold text-[var(--color-text-main)]'>{dashboardData?.drafts}</p>
              <p className='text-xs uppercase tracking-widest text-[var(--color-text-muted)] font-semibold mt-1'>Drafts</p>
            </div>
        </div>
      </div>

      <div className='mb-6 flex items-center gap-3'>
        <div className='w-8 h-8 flex items-center justify-center bg-[var(--color-surface)] border border-[var(--color-border)] rounded-full'>
          <img src={assets.dashboard_icon_4} alt="Latest" className='w-4 opacity-60' />
        </div>
        <h3 className='font-editorial text-xl font-bold text-[var(--color-text-main)]'>Recent Articles</h3>
      </div>
      
      <div className='w-full overflow-x-auto border border-[var(--color-border)] rounded-sm bg-[var(--color-surface)] shadow-[var(--shadow-editorial-sm)]'>
        <table className='w-full text-sm text-left whitespace-nowrap'>
          <thead className='text-xs uppercase tracking-widest text-[var(--color-text-muted)] border-b border-[var(--color-border)] bg-[var(--color-background)]'>
            <tr>
              <th scope='col' className='px-6 py-5 font-semibold'>#</th>
              <th scope='col' className='px-6 py-5 font-semibold'>Title</th>
              <th scope='col' className='px-6 py-5 font-semibold hidden sm:table-cell'>Date</th>
              <th scope='col' className='px-6 py-5 font-semibold hidden sm:table-cell'>Status</th>
              <th scope='col' className='px-6 py-5 font-semibold'>Actions</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[var(--color-border)]'>
            {dashboardData?.recentBlogs.map((blog, index)=> {
              return <BlogTableItem key={blog._id} blog={blog} fetchBlogs={fetchDashboard} index={index + 1}/>
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;

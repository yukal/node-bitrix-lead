import Vue from 'vue'
import Router from 'vue-router'
import PageConstruction from '@/components/Pages/Construction'
import PageLeads from '@/components/Pages/Leads'
import PageLeadItem from '@/components/Pages/LeadItem'
import PageError from '@/components/Pages/Error'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/leads',
      name: 'PageLeads',
      component: PageLeads
    },
    {
      path: '/leads/:id',
      name: 'PageLeadItem',
      component: PageLeadItem
    },
    {
      path: '/',
      name: 'PageDashboard',
      component: PageConstruction
    },
    {
      path: '/settings',
      name: 'PageSettings',
      component: PageConstruction
    },
    {
      path: '/companies',
      name: 'PageCompanies',
      component: PageConstruction
    },
    {
      path: '*',
      name: 'PageError',
      component: PageError,
      meta: {
        title: 'ErrorPage'
      }
    }
  ]
})

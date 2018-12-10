<template>
  <div class="error-page">
    <!-- <h4 class="title">Leads</h4> -->

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h4>Leads</h4>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <b-link :to="'/leads/0'" class="btn btn-sm btn-outline-secondary">Create</b-link>
        </div>

        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          This week
        </button>
      </div>
    </div>

    <b-table striped :fields="fields" :items="items" class="table-sm">
      <template slot="TITLE" slot-scope="data">
        <b-link :to="`leads/${data.item.ID}`">{{data.value}}</b-link>
      </template>

      <template slot="DATE_CREATE" slot-scope="data">{{data.value | date}}</template>

      <template slot="_" slot-scope="row">
        <b-button size="sm" variant="outline-secondary">× Remove</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      apiUrl: 'http://172.70.0.2:8181/lead',
      fields: [
        'ID',
        'TITLE',
        'ADDRESS_COUNTRY',
        'ADDRESS_CITY',
        'CURRENCY_ID',
        'OPPORTUNITY',
        'DATE_CREATE',
        '_'
      ],
      items: []
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    $route: 'fetchData'
  },
  methods: {
    fetchData () {
      this.$http.get(this.apiUrl).then(
        function (response) {
          this.items = response.body.result
        },
        function (error) {
          console.log(error.status, error.statusText)
        }
      )
    }
  }
}
</script>

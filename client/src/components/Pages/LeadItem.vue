<template>
  <div class="error-page">
    <!-- <h4 class="title">Lead <small>(#{{ lead.ID }} {{ lead.TITLE }})</small></h4> -->

    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h4>Lead <small>(#{{ lead.ID }} {{ lead.TITLE }})</small></h4>
      <div class="btn-toolbar mb-2 mb-md-0">
        <div class="btn-group mr-2">
          <button class="btn btn-sm btn-outline-secondary" @click="onCreate">Create</button>
          <button class="btn btn-sm btn-outline-secondary" @click="onDelete">Delete</button>
        </div>

        <button class="btn btn-sm btn-outline-secondary dropdown-toggle">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-calendar"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
          This week
        </button>
      </div>
    </div>

    <b-form @submit="onSubmit" @reset="onReset">
      <b-row>

        <b-col cols="8">
          <b-row>
            <b-col cols="6">
              <b-form-group label="Title:" label-for="lead-title">
                <b-form-input id="lead-title" type="text" v-model="lead.TITLE" required placeholder="Lilu Dallas"></b-form-input>
              </b-form-group>

              <b-form-group label="Name:" label-for="lead-name">
                <b-form-input id="lead-name" type="text" v-model="lead.NAME" placeholder="Lilu"></b-form-input>
              </b-form-group>

              <b-form-group label="Second name:" label-for="lead-sname">
                <b-form-input id="lead-sname" type="text" v-model="lead.SECOND_NAME" placeholder="Multipas"></b-form-input>
              </b-form-group>

              <b-form-group label="Last name:" label-for="lead-lname">
                <b-form-input id="lead-lname" type="text" v-model="lead.LAST_NAME" placeholder="Dallas"></b-form-input>
              </b-form-group>

              <b-form-group label="Post:" label-for="lead-post">
                <b-form-input id="lead-post" type="text" v-model="lead.POST" placeholder="Manager"></b-form-input>
              </b-form-group>

              <b-form-group label="Email:" v-if="typeof lead.EMAIL=='object'">
                <template v-for="eml in lead.EMAIL">
                  <b-form-input type="text" v-model="eml.VALUE" placeholder="lilu@email.com"></b-form-input>
                </template>
              </b-form-group>

              <b-form-group label="Email:" v-else>
                <b-form-input type="text" v-model="lead.EMAIL" placeholder="lilu@email.com"></b-form-input>
              </b-form-group>

              <b-form-group label="Phone:" v-if="typeof lead.PHONE=='object'">
                <template v-for="eml in lead.PHONE">
                  <b-form-input type="text" v-model="eml.VALUE" placeholder="123456789"></b-form-input>
                </template>
              </b-form-group>

              <b-form-group label="Phone:" v-else>
                <b-form-input type="text" v-model="lead.PHONE" placeholder="123456789"></b-form-input>
              </b-form-group>

              <!-- <b-form-group label="Birth date:" label-for="lead-birth">
                <b-form-input id="lead-birth" type="text" v-model="lead.BIRTHDATE" placeholder="Dallas"></b-form-input>
              </b-form-group> -->
            </b-col>

            <b-col cols="6">
              <b-form-group label="Country:" label-for="lead-country">
                <b-form-input id="lead-country" type="text" v-model="lead.ADDRESS_COUNTRY" placeholder="Israel"></b-form-input>
              </b-form-group>

              <b-form-group label="City:" label-for="lead-city">
                <b-form-input id="lead-city" type="text" v-model="lead.ADDRESS_CITY" placeholder="Haifa"></b-form-input>
              </b-form-group>

              <b-form-group label="Region:" label-for="lead-region">
                <b-form-input id="lead-region" type="text" v-model="lead.ADDRESS_REGION" placeholder="Nesher"></b-form-input>
              </b-form-group>

              <b-form-group label="Address:" label-for="lead-address">
                <b-form-input id="lead-address" type="text" v-model="lead.ADDRESS" placeholder="StreetName, 10, 12a"></b-form-input>
              </b-form-group>

              <b-form-group label="Postal code:" label-for="lead-postal-code">
                <b-form-input id="lead-postal-code" type="text" v-model="lead.ADDRESS_POSTAL_CODE" placeholder="31000"></b-form-input>
              </b-form-group>

              <b-form-group label="Currency ID:" label-for="lead-currency-id">
                <b-form-select id="lead-currency-id" :options="currencies" v-model="lead.CURRENCY_ID" placeholder="USD"></b-form-select>
              </b-form-group>

              <b-form-group label="Opportunity:" label-for="lead-opportunity">
                <b-form-input id="lead-opportunity" type="text" v-model="lead.OPPORTUNITY" placeholder="1500"></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>

        <b-col>
          <b-form-group>
            <h6>Created:  <b-badge variant="success">{{ lead.DATE_CREATE | date }}</b-badge></h6>
            <h6>Modified: <b-badge variant="secondary">{{ lead.DATE_MODIFY | date }}</b-badge></h6>
            <h6>Closed: <b-badge variant="secondary">{{ lead.DATE_CLOSED | date }}</b-badge></h6>
          </b-form-group>

          <b-form-group>
            <h6>ID:  <b-badge variant="success">{{ lead.ID }}</b-badge></h6>
            <h6>Contact ID: <b-badge variant="secondary">{{ lead.CONTACT_ID }}</b-badge></h6>
            <h6>Owner ID: <b-badge variant="secondary">{{ lead.CREATED_BY_ID }}</b-badge></h6>
          </b-form-group>
        </b-col>
      </b-row>

      <br>
      <hr>

      <b-form-group>
        <b-button type="button" variant="secondary" @click="onBack">Back</b-button>
        <b-button type="submit" variant="primary">&nbsp; Save &nbsp;</b-button>
        <b-button type="button" variant="danger" @click="onDelete">Remove</b-button>
      </b-form-group>
    </b-form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      apiUrl: 'http://172.70.0.2:8181/lead',
      currencies: ['USD', 'EUR', 'UAH', 'RUB'],
      lead: {}
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
      if (this.$route.params.id < 1)
        return;

      var url = `${this.apiUrl}/${this.$route.params.id}`;

      this.$http.get(url).then(
        function (response) {
          this.lead = response.body.result
        },
        function (error) {
          console.log(error.status, error.statusText)
        }
      )
    },

    onCreate (evt) {
      this.lead = {};
      this.$router.push('/leads/0');
      evt.preventDefault()
    },

    onDelete (evt) {
      var url = `${this.apiUrl}/${this.$route.params.id}`;

      this.$http.delete(url).then(
        function (response) {
          if (response.status == 200)
            this.$router.push({ name: 'PageLeads' });
        },
        function (error) {
          console.log(error.status, error.statusText)
        }
      )

      evt.preventDefault()
    },

    onBack (evt) {
      this.$router.go(-1)
      evt.preventDefault()
    },

    onSubmit (evt) {
      var url = `${this.apiUrl}/${this.$route.params.id}`;
      var data = JSON.stringify(this.lead);

      if (this.$route.params.id > 0) {
        this.Save(url, data);
      } else {
        this.Update(this.apiUrl, data);
      }

      evt.preventDefault()
    },

    Save (url, data) {
      this.$http.patch(url, data).then((response) => {
        this.$notify({
          type: response.status == 200 ? 'success' : 'error',
          title: 'Update',
          message: 'Status: [' + response.status + '] ' + response.statusText
        });
      })
      console.log(url, data);
    },

    Update (url, data) {
      this.$http.post(url, data).then((response) => {
        this.$notify({
          type: response.status == 200 ? 'success' : 'error',
          title: 'Create',
          message: 'Status: [' + response.status + '] ' + response.statusText
        });

        if (response.status == 200)
          this.$router.push({ name: 'PageLeads' });
      })
      console.log(url, data);
    },

    onReset (evt) {
      evt.preventDefault()
    }
  }
}
</script>

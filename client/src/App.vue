<template>
  <div id="app">
    <notifications group="app" position="top center" />
    <main-menu></main-menu>

    <b-container fluid>
      <b-row>

        <aside-menu></aside-menu>

        <main role="main" class="col-md-9 col-lg-10 ml-sm-auto px-4">
          <transition name="fade" mode="out-in">
            <router-view class="view"></router-view>
          </transition>
        </main>

      </b-row>
    </b-container>

  </div>
</template>

<script>
import MainMenu from '@/components/menu/Main'
import AsideMenu from '@/components/menu/Aside'

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: { MainMenu, AsideMenu }
}
</script>

<style>
#app {
  margin-top: 56px;
}
main[role='main'] {
  min-height: calc(100vh - 56px);
}
main .title {
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #dee2e6;
}
</style>

<template>
  <div class="error-page pt-3 pb-2">
    <h4><strong>{{ codeNum }}</strong>. {{ codeMsg }}</h4>
    <h6>{{ description }}</h6>
    <!-- {{ $data }} -->
  </div>
</template>

<script>
export default {
  name: 'ErrorPage',
  data () {
    return {
      codeNum: 404,
      codeMsg: 'Page not found',
      // codeMsg: 'Internal Server Error',
      description: 'Along multiline text of description'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.error-page {
  display: flex;
  height: 100%;
  flex-flow: column wrap;
  /* justify-content: center;
  align-items: center; */
}
.error-page h6 {
  color: #555;
}
</style>

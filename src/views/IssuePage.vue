<template>
  <div>
    <h2>Issue</h2>
    <p>Here will be issue data</p>
    <!-- <router-link to="/">issue List</router-link> -->
    <p>{{issue}}</p>
  </div>
</template>

<script>
  import Vue from "vue";

  export default Vue.extend({
    name: 'IssuePage',
    props:['issue']
  })

</script>

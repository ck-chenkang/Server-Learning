<template>
  <div>
    <h1>下面的数据是从后端获取来的</h1>
    <h2>{{ msg }}</h2>
  </div>
</template>

<script>
var _self;

export default {
  data () {
    return {
      msg : ''
    }
  },
  methods:{
  getData(){
    this.$axios.get("/").then(
      (response) => {
        this.msg = response.data;
        // console.log(response);
      }
    ).catch(
      (err) => {
        console.log(err);
      }
    );
  }
  },
  created(){
    _self = this;
  },
  mounted(){
    _self.getData();
  }
}
</script>

<style>
</style>

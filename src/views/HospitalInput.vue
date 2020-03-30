<template>
<div>
  <h1>My Hospital Needs Facemaks!</h1>
  <router-link to="/hospital-list" class="link link-back">Back to List of Hospitals</router-link>
  <form class="hospital-input" id="hospital-input" @submit.prevent="addHospital()">
    <div>
      <label for="name">What is your hospital's name?</label>
      <input type="text" name="name" v-model="newHospital.name" required>
    </div>
    <div>
      <label for="city">What city and state are you located?</label>
      <input type="text" name="city" v-model="newHospital.city" required>
    </div>
    <div>
      <label for="address">What address should our heros mail your facemasks to?</label>
      <input type="text" name="address" v-model="newHospital.address" required>
    </div>
    <div>
      <label for="facemaskNeed">How many facemasks do you need?</label>
      <input type="text" name="facemaskNeed" v-model="newHospital.facemaskNeed" required>
    </div>
    <button action="submit">Add your hospital</button>
  </form>
</div>
</template>

<script>
export default {
  data () {
    return {
      newHospital: {
        name: '',
        city: '',
        address: '',
        facemaskNeed: ''
      }
    }
  },

  methods: {
    addHospital () {
      this.$store.dispatch('hospitals/setHospital', this.newHospital)
        .then(() => {
          this.$router.push('/hospital-list')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.hospital-input {
  max-width: 500px;
  margin: $space-l auto $space-s;

  > div {
    text-align: left;
    margin-bottom: $space-s;

    label, input {
      display: block;
    }

    label {
      margin-bottom: 10px;
    }

    input {
      width: 100%;
    }
  }
}
</style>

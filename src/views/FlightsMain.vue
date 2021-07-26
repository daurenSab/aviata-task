<template>
  <div class="flights__wrapper">
    <FilterSidebar></FilterSidebar>
    <div class="flights">
      <Flight :flight="flight" v-for="flight in flights" :key="flight.id"/>
    </div>
  </div>
</template>

<script>
import Flight from "@/components/Flight";
import FilterSidebar from "@/components/FlightFilterSidebar";
import {mapGetters} from 'vuex'

export default {
  name: 'Home',
  components: {
    Flight,
    FilterSidebar
  },
  computed: {
    ...mapGetters(['flights'])
  }
}
</script>
<style lang="scss" scoped>
.flights__wrapper {
  display: flex;
  justify-content: center;
  background: #D7D7D7;
  min-width: 100vw;
  min-height: calc(100vh - 44px);
  width: 100%;
  height: 100%;
  padding-top: 44px;
}

.flights {
  max-width: 880px;
  width: 100%;
}
</style>

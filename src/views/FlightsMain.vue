<template>
  <div class="flights">
    <div class="container">
      <FilterSidebar></FilterSidebar>
      <div class="flights__wrapper">
        <transition-group name="list-complete">
          <Flight :flight="flight" v-for="flight in flights" :key="flight.id" class="list-complete-item"/>
        </transition-group>
      </div>
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
.flights {
  display: flex;
  justify-content: center;
  background: #D7D7D7;
  width: 100%;
  height: 100%;
  padding-top: 44px;
}

.container {
  max-width: 1140px;
  width: 100%;
  padding: 20px;
  display: flex;
  justify-content: space-between;
}

.flights__wrapper {
  max-width: 880px;
  width: 100%;
  padding-left: 12px;
}

.list-complete-item {
  transition: all 0.5s ease-out;
  margin-right: 10px;
  max-width: 880px;
}

.list-complete-enter-from,
.list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}
</style>

<template>
  <div class="filter">
    <Filter title="Опции тарифа" @filterToggled="filteredByTariffs($event)" class="mb-12"
            :options="tariffFilters"></Filter>
    <Filter title="Авиакомпании" @filterToggled="filteredByAirlines($event)" :hasAllOption="true"
            :options="airlineFilters"></Filter>
    <div class="filter__reset" @click="resetAllFilters">Сбросить все фильтры</div>
  </div>
</template>
<script>
import Filter from "@/components/Filter";
import {mapGetters, mapMutations} from 'vuex'

export default {
  components: {
    Filter
  },
  computed: {
    ...mapGetters(['flights', 'airlineFilters', 'tariffFilters'])
  },
  methods: {
    ...mapMutations(['filterFlights', 'updateAirlineFilters', 'updateTariffFilters', 'resetAllFilters']),
    filteredByAirlines(options) {
      this.updateAirlineFilters(options)
      this.filterFlights()
    },
    filteredByTariffs(options) {
      this.updateTariffFilters(options)
      this.filterFlights()
    },
  }
}
</script>
<style lang="scss" scoped>
.filter {
    max-width: 240px;
    width: 100%;
    position: sticky;
    top: 20px;
    height: fit-content;

  &__reset {
    font-size: 12px;
    line-height: 16px;
    color: #7284E4;
    opacity: 0.5;
    border-bottom: 1px dashed #7284E4;
    cursor: pointer;
    width: fit-content;
    margin-top: 12px;
  }
}

.mb-12 {
  margin-bottom: 12px;
}
</style>

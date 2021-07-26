<template>
  <div class="filter">
    <div class="filter__title">{{ title }}</div>
    <ul class="filter__options-list">
      <li v-if="hasAllOption">
        <Checkbox text="Все" :checked="allChecked" @change="toggleAll"></Checkbox>
      </li>
      <li class="filter__option" v-for="(option, idx) in filterOptions" :key="idx">
        <Checkbox :text="option.text" :checked="option.isChecked" @change="filterToggled(idx)"></Checkbox>
      </li>
    </ul>
  </div>
</template>
<script>
import Checkbox from "@/components/Checkbox";

export default {
  components: {
    Checkbox
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    options: {
      type: Array,
      required: true
    },
    hasAllOption: {
      type: Boolean,
      default: false
    },
  },
  data: function () {
    return {
      filterOptions: [...this.options]
    }
  },
  watch: {
    options() {
      this.filterOptions = [...this.options]
    }
  },
  computed: {
    allChecked() {
      return this.filterOptions.every(option => option.isChecked)
    }
  },
  methods: {
    toggleAll() {
      const allChecked = this.allChecked
      this.filterOptions.forEach(option => option.isChecked = !allChecked)
      this.$emit('filterToggled', this.filterOptions)
    },
    filterToggled(idx) {
      this.filterOptions[idx].isChecked = !this.filterOptions[idx].isChecked
      this.$emit('filterToggled', this.filterOptions)
    }
  }
}
</script>
<style lang="scss" scoped>
.filter {
  background: #F5F5F5;
  border-radius: 4px;

  &__title {
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    color: #202123;
    text-align: left;
    padding-left: 12px;
    padding-top: 12px;
  }

  &__options-list {
    list-style-type: none;
    text-align: left;
    padding: 12px 0;
    margin: 0;
    max-height: 216px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 5px;

      &-track {
        background: #f1f1f1;
      }

      &-thumb {
        background: #E1E1E1;
        border-radius: 2px;

        &:hover {
          background: #B9B9B9;
        }
      }
    }

    & li {
      height: 32px;
      cursor: pointer;
      display: flex;
      align-items: center;

      &:hover {
        background: #EBEBEB;
      }

      & label {
        cursor: pointer;
      }
    }
  }
}
</style>

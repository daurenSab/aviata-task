<template>
  <div class="flight__wrapper">
    <div class="flight__info-zone">
      <div class="flight__info-zone--main">
        <div class="d-flex align-items-center">
          <div class="flight__airline" v-for="(segment, idx) in segments" :key="idx">
            <img width="20" :src="`https://aviata.kz/static/airline-logos/80x80/${segment.carrier}.png`"
                 alt="logo" :title="segment.carrier_name">
            <div v-if="segments.length === 1">{{ segment.carrier_name }}</div>
          </div>
        </div>

        <div>
          <div class="flight__date">
            {{ depTimeAndDate.date }}
          </div>
          <div class="flight__time">
            {{ depTimeAndDate.time }}
          </div>
        </div>

        <div class="fly-duration-info">
          <div class="d-flex justify-content-between align-items-center">
            <div class="airport-name">{{ destCodes.from }}</div>
            <div class="fly-duration">{{ timeDifference }}</div>
            <div class="airport-name">{{ destCodes.to }}</div>
          </div>

          <div class="timeline">
            <div class="timeline__point--rounded" v-for="n in 3" :key="n"></div>
          </div>

          <div class="transfer" v-if="metaLayovers.length">
            <div v-for="(meta, idx) in metaLayovers" :key="idx">{{meta}}</div>
          </div>
        </div>

        <div>
          <div class="flight__date">
            {{ arrivalTimeAndDate.date }}
            <div class="flight__date-diff" v-if="diffInDays">+{{ diffInDays }}</div>
          </div>
          <div class="flight__time">
            {{ arrivalTimeAndDate.time }}
          </div>
        </div>
      </div>

      <div class="d-flex align-items-center">
        <a href="#" class="flight__link">Детали перелета</a>
        <a href="#" class="flight__link">Условия тарифа</a>
        <div class="d-flex align-items-center" v-if="flight.refundable">
          <img src="../assets/irretrievable.svg" width="16" alt="irretrievable">
          <div class="ticket--irretrievable">невозвратный</div>
        </div>
      </div>
    </div>

    <div class="flight__buy-zone">
      <div class="flight__price">{{ flight.price }} ₸</div>
      <div class="flight__choose-btn">Выбрать</div>
      <div class="flight__price-text">Цена за всех пассажиров</div>
      <div class="flight__baggage">
        <div class="flight__baggage--name">
          {{
            baggageWeight ? `Багаж - ${baggageWeight} кг` : 'Нет багажа'
          }}
        </div>
        <div class="flight__baggage--add" v-if="!flight.itineraries[0][0].segments[0].baggage_options[0].value">
          + Добавить багаж
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    flight: {
      type: Object,
      required: true
    }
  },
  computed: {
    segments() {
      const carrierNames = []
      return this.flight.itineraries[0][0].segments.filter(segment => {
        const unique = !carrierNames.includes(segment.carrier_name)
        unique && carrierNames.push(segment.carrier_name)
        return unique
      })
    },
    metaLayovers() {
      if (!this.flight.itineraries[0][0].segments.length) return null

      const segments = [...this.flight.itineraries[0][0].segments]
      segments.shift()
      return segments.map(segment => {
        const date1 = segment.dep_time_iso
        const date2 = segment.arr_time_iso

        const timeDiff = this.getTimeDifference(date1, date2)

        return `через ${segment.airport_origin}, ${timeDiff}`
      })
    },
    baggageWeight() {
      return this.flight.itineraries[0][0].segments[0].baggage_options[0].value
    },
    diffInDays() {
      const date1 = new Date(this.flight.itineraries[0][0].dep_date);
      const date2 = new Date(this.flight.itineraries[0][0].arr_date);

      return date2.getDate() - date1.getDate()
    },
    timeDifference() {
      const date1 = new Date(this.flight.itineraries[0][0].dep_date);
      const date2 = new Date(this.flight.itineraries[0][0].arr_date);

      return this.getTimeDifference(date1, date2)
    },
    depTimeAndDate() {
      return {
        date: this.flight.itineraries[0][0].segments[0].dep_time.slice(0, -5).toLowerCase(),
        time: this.flight.itineraries[0][0].segments[0].dep_time.slice(-5),
      }
    },
    arrivalTimeAndDate() {
      const segments = this.flight.itineraries[0][0].segments
      return {
        date: segments[segments.length - 1].arr_time.slice(0, -5).toLowerCase(),
        time: segments[segments.length - 1].arr_time.slice(-5),
      }
    },
    destCodes() {
      const segments = this.flight.itineraries[0][0].segments
      return {
        from: segments[0].origin_code,
        to: segments[segments.length - 1].dest_code,
      }
    }
  },
  methods: {
    getTimeDifference(d1, d2) {
      const date1 = new Date(d1);
      const date2 = new Date(d2);
      const diffInTime = date2.getTime() - date1.getTime();
      const diffInHours = parseInt(diffInTime / 1000 / 60 / 60)
      const diffInMinutes = diffInTime / 1000 / 60 - diffInHours * 60

      const diffInHoursText = diffInHours ? `${diffInHours} ч ` : ''
      const diffInMinutesText = diffInMinutes ? `${diffInMinutes} м` : ''

      return `${diffInHoursText}${diffInMinutesText}`
    }
  }
}
</script>
<style lang="scss" scoped>
.d-flex {
  display: flex;
}

.justify-content-between {
  justify-content: space-between;
}

.align-items-center {
  align-items: center;
}

.flight {
  &__wrapper {
    background: #FFFFFF;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.15);
    border-radius: 4px;
    height: 168px;
    width: 100%;
    display: flex;
    margin: 0 0 12px 20px;
    justify-content: space-between;
  }

  &__link {
    opacity: 0.5;
    border-bottom: 1px dashed #7284E4;
    font-size: 12px;
    line-height: 16px;
    color: #7284E4;
    padding-bottom: 2px;
    margin-right: 24px;
  }

  &__buy-zone {
    background: #F5F5F5;
    border-radius: 0 4px 4px 0;
    padding: 12px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 240px;
    width: 100%;
  }

  &__price {
    font-family: Arial;
    font-size: 24px;
    line-height: 28px;
    text-align: center;
    color: #202123;
  }

  &__choose-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 200px;
    width: 100%;
    height: 50px;
    background: #55BB06;
    border-radius: 4px;
    font-family: Open Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 25px;
    text-align: center;
    color: #FFFFFF;
    margin-top: 12px;
    cursor: pointer;
    user-select: none;
  }

  &__price-text {
    font-size: 12px;
    line-height: 16px;
    text-align: center;
    color: #707276;
    margin-top: 8px;
  }

  &__baggage {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin-top: 16px;

    &--name {
      font-family: Open Sans;
      font-size: 12px;
      line-height: 16px;
      align-items: center;
      text-align: center;
      color: #202123;
    }

    &--add {
      font-family: Open Sans;
      font-style: normal;
      font-weight: 600;
      font-size: 12px;
      line-height: 16px;
      text-align: center;
      color: #5763B3;
      background: #EAF0FA;
      border-radius: 2px;
      width: 128px;
      height: 24px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  &__date {
    font-size: 12px;
    line-height: 16px;
    color: #202123;
    display: flex;

    &-diff {
      font-weight: 600;
      font-size: 10px;
      line-height: 14px;
      color: rgba(255, 55, 36, 0.8);
      margin-left: 4px;
    }
  }

  &__time {
    font-weight: 600;
    font-size: 24px;
    line-height: 33px;
    color: #202123;
  }

  &__info-zone {
    padding: 40px 40px 16px 40px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    &--main {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  &__airline {
    font-weight: 600;
    font-size: 14px;
    line-height: 19px;
    display: flex;
    align-items: center;
    color: #202123;

    img {
      margin-right: 12px;
    }
  }
}

.airport-name {
  font-size: 10px;
  line-height: 12px;
  color: #B9B9B9;
}

.fly-duration {
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #202123;
}

.transfer {
  font-size: 12px;
  line-height: 16px;
  color: #FF9900;
  margin-top: 4px;
}

.timeline {
  margin-top: 4px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #B9B9B9;
}

.timeline__point--rounded {
  background: #FFFFFF;
  border: 1px solid #B9B9B9;
  border-radius: 50%;
  box-sizing: border-box;
  position: relative;
  top: 3px;
  width: 5px;
  height: 5px;
}

.fly-duration-info {
  max-width: 166px;
  width: 100%;
}

.ticket--irretrievable {
  font-size: 12px;
  line-height: 14px;
  color: #707276;
  margin-left: 8px;
}
</style>

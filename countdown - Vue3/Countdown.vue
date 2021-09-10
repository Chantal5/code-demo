<template>
  <div class="countdown">
    <div class="countdown__block __weeks">
      <span id="weeks" class="countdown__amount">{{ state.weeks }}</span>
      <span class="countdown__caption">Weken</span>
    </div>

    <div class="countdown__block __days">
      <span class="countdown__amount">{{ state.days }}</span>
      <span class="countdown__caption">Dagen</span>
    </div>

    <div class="countdown__block __hours">
      <span class="countdown__amount">{{ state.hours }}</span>
      <span class="countdown__caption">Uren</span>
    </div>

    <div class="countdown__block __minutes">
      <span class="countdown__amount">{{ state.minutes }}</span>
      <span class="countdown__caption">Minuten</span>
    </div>

    <div class="countdown__block __seconds">
      <span class="countdown__amount">{{ state.seconds }}</span>
      <span class="countdown__caption">Seconden</span>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import './countdown.scss'

export default {
  props: {
    startTime: Date,
  },
  setup(props) {
    const state = reactive({
      weeks: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    })

    setInterval(function () {
      const now = new Date().getTime();
      const distance = props.startTime - now; 

      const weeks = Math.floor(distance / (1000 * 60 * 60 * 24 * 7));
      const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      state.weeks = weeks;
      state.days = days;
      state.hours = hours;
      state.minutes = minutes;
      state.seconds = seconds;
    }, 1000);

    return {
      state
    };
  }
};
</script>
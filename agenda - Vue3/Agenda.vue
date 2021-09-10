<template>
  <section id="agenda" class="agenda">
    <template v-for="(item, index) in setBackground" :key="index">
      <div class="agenda__img" :style="{ backgroundImage: 'url(' + item.photo + ')' }"></div>
    </template>

    <div class="agenda__content" v-if="eventsList.length">
      <template v-for="(item, index) in eventsList" :key="index">
        <div class="event">
          <h2 class="event__name">{{ item.name }}</h2>
          <p class="event__location">{{ item.location }}</p>
          <p v-if="item.isCurrent" class="event__now">Nu bezig!</p>
          <p v-if="!item.isCurrent" class="event__date">{{ item.day }} {{ item.month }} {{ item.year }}</p>
          <Countdown :startTime="item.input" v-if="!item.isCurrent" />
        </div>
      </template>
    </div>

    <div class="agenda__empty" v-else>
      <h2 class="event__name">Geen evenementen in de planning</h2>
    </div>

    <div class="wave">
      <Wave />
    </div>
  </section>
</template>

<script>
import { computed, ref } from 'vue'
import { SortOrder } from '@kentico/kontent-delivery'
import { Client } from "../../client"

import Countdown from "../countdown/Countdown"
import Wave from '../Wave.vue'

import './agenda.scss'

export default {
  setup() {
    const events = ref([])
    const background = ref([])

    const now = new Date().toISOString()

    const monthNames = [
        "januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"
    ];

    Client.items()
      .type('background_image')
      .equalsFilter("system.id", "22796f2f-e1a4-4464-a039-a2e5d9b7f8ec")
      .toObservable()
      .subscribe(response => background.value = response.items)

    const setBackground = computed(() => background.value.map(img => ({ 
      photo: img.image.value[0].url
    })))
  
    Client.items()
      .type('event')
      .greaterThanOrEqualFilter('elements.end', now)
      .orderParameter('elements.start', SortOrder.asc)
      .limitParameter(1)
      .toObservable()
      .subscribe(response => events.value = response.items)

    const eventsList = computed(() => events.value.map(event => ({ 
      input: event.start.value,
      name: event.name.value, 
      location: event.location.value, 
      start: event.start.value.toISOString(),
      end: event.end.value.toISOString(),
      day: event.start.value.getDate(),
      month: monthNames[event.start.value.getMonth()],
      year: event.start.value.getFullYear(),
      isCurrent: event.start.value.toISOString() < now && event.end.value.toISOString() > now
    })))
  
    return {
      now,
      eventsList,
      setBackground,
    }
  },
  components: {
    Countdown,
    Wave
  },
}
</script>
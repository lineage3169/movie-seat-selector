<template>
  <div class="ticket-component">
    <div class="movie-info">
    </div>
    <div class="order-info">
      <h3>訂單內容</h3>
      <div v-for="(ticket, index) in tickets" :key="index" class="ticket-item">
        <span>{{ ticket.type }} x{{ ticket.quantity }}</span>
        <span>{{ ticket.price * ticket.quantity }}</span>
      </div>
      <div class="total-price">
        {{ `Total ${totalPrice}`}}
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  tickets: {
    type: Array,
    required: true,
    default: () => {
      return  []
    }
  }
})

const totalPrice = computed(() => {
  if (!props?.tickets?.length) return 0
  return props.tickets.reduce((total, ticket) => {
    return total + (ticket.price * ticket.quantity);
  }, 0);
})

</script>
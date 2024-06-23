<template>
  <main>
    <div class="seat-selector">
      <h1 class="title">請選擇觀看電影的座位</h1>
      <div class="legend">
        <div class="legend-item">
          <span class="seat"></span> 您的座位
        </div>
        <div class="legend-item">
          <span class="seat"></span> 未售出
        </div>
        <div class="legend-item">
          <span class="seat seat--sold"></span> 已售出
        </div>
      </div>
      <div class="screen">螢幕</div>
      <div class="seats-container">
        <div
          v-for="(seat, index) in seats"
          :key="index"
          class="seat"
          :class="{
            'seat--selected': seat.isSelected,
            'seat--sold': seat.isSold
          }"
          @click="handleClick(index)"
        >
        </div>
      </div>
    </div>
  </main>
</template>
<script setup>
import { ref } from "vue";

const rows = 10
const seatsPerRow = 18
 // 模擬已售出的id
const soldSeatIds = [88, 89, 104, 105, 106, 107, 108, 109, 116, 117, 118, 119, 120]
// 初始化
const initSeats = () => {
  let availableSeatId = 1 // 可用座位的計數器
  return Array.from({ length: rows * seatsPerRow }, (seat, index) => {
    const isUnavailable = (index % seatsPerRow === 3 || index % seatsPerRow === 14)
    const seatData = {
      isSelected: false, // 被選取
      isSold: false, // 已售出
      id: null,
      // unavailable 是走道元素不可被點選
      status: isUnavailable ? 'unavailable' : 'available'
    }
    if (!isUnavailable) {
      seatData.id = availableSeatId++
      if (soldSeatIds.includes(seatData.id))
        seatData.isSold = true
    }
    return seatData
  })
}
const seats = ref(initSeats())

const handleClick = (index) => {
  const seat = seats.value[index]
  const isUnavailable = seat.status === 'unavailable'
  if (isUnavailable) return
  if (seat.isSold) return
  if (seat.isSelected) {
    seat.isSelected = false
    return
  }
  seats.value = initSeats()
  seats.value[index].isSelected = true
}

</script>
<style lang="scss" scoped>
.seat-selector {
  width: 100%;
  max-width: 472px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .title {
    font-size: 20px;
    color: #15964e;
    margin-bottom: 48px;
  }

  .legend {
    display: flex;
    justify-content: center;
  }

  .legend-item {
    display: flex;
    align-items: center;
    margin-right: 16px;
    &:first-child .seat{
      background-color: #15964e;
      border-color: #15964e;
    }
    &:last-child {
      margin-right: 0;
    }
    .seat {
      margin-right: 4px;
      cursor: auto;
    }
  }

  .screen {
    width: 100%;
    box-sizing: border-box;
    margin: 32px 0;
    border: 2px solid #DDDDDD;
    text-align: center;
    padding: 6px 0;
  }

  .seats-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(18, minmax(0, 1fr));
    gap: 8px;
    .seat--sold {
      cursor: not-allowed;
    }
  }

  .seat {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    box-sizing: border-box;
    border: 2px solid #DDDDDD;
    cursor: pointer;
    &:nth-child(18n + 4), &:nth-child(18n + 15) {
      opacity: 0;
      cursor: auto;
    }
    &--selected {
      background-color: #15964e;
      border-color: #15964e;
    }
    &--sold {
      background-color: #DDDDDD;
    }
  }
}
</style>

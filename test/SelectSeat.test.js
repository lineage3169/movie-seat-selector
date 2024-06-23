import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import App from '@/App.vue';

describe('電影選擇器', () => {
  it('初始化時顯示正確的座位狀態', () => {
    const wrapper = mount(App)
    
    // 獲取所有的座位
    const seatContainer = wrapper.find('.seats-container')
    const seatsElements = seatContainer.findAll('.seat')
    const seatData = wrapper.vm.seats

    // 遍歷所有座位，檢查它們的狀態
    seatData.forEach((seat, index) => {
      if (seat.status === 'unavailable') {
        // 檢查走道座位是否隱藏
        expect(seatsElements[index]).not.toBe('Visible')
      }
      else if (seat.isSold) {
        // 检查已售出的座位是否显示为已售出
        expect(seatsElements[index].classes()).toContain('seat--sold')
      }
      else {
        // 檢查其他座位是否顯示為可用
        expect(seatsElements[index].classes()).not.toContain('seat--sold')
      }
    })
  })
})
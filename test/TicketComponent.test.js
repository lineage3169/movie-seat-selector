import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import TicketComponent from '@/components/TicketComponent.vue'

describe('TicketComponent.vue', () => {
  it('應該顯示正確的訂單信息和總價', () => {
    const tickets = [
      { type: '優惠單人套票', price: 660, quantity: 1 },
      { type: '單人全票', price: 340, quantity: 0 }
    ]

    const wrapper = mount(TicketComponent, {
      props: { tickets }
    })

    expect(wrapper.text()).toContain('優惠單人套票 x1')
    expect(wrapper.text()).toContain('660')
    expect(wrapper.text()).toContain('Total 660')
  })

  it('應該正確計算總價', async () => {
    const tickets = [
      { type: '優惠單人套票', price: 660, quantity: 1 },
      { type: '單人全票', price: 340, quantity: 2 }
    ]

    const wrapper = mount(TicketComponent, {
      props: { tickets }
    })

    expect(wrapper.text()).toContain('Total 1340')
  })

  it('所有票數量為 0 時總價應為 0', async () => {
    const tickets = [
      { type: '優惠單人套票', price: 660, quantity: 0 },
      { type: '單人全票', price: 340, quantity: 0 }
    ]

    const wrapper = mount(TicketComponent, {
      props: { tickets }
    })

    expect(wrapper.text()).toContain('Total 0')
  })
})
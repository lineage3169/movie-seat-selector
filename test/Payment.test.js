import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import Payment from '@/components/Payment.vue'

describe('電子信箱驗證測試', () => {
  const invalidEmails = [
    'plainaddress',
    '@missingusername.com',
    'username@.com.my',
    'username@.com',
    'username@missingdotcom',
    'username@missingtld.',
    'username@domain.c',
    'username@domain..com',
    'username@domain.com.',
    'username@.domain.com'
  ]

  it('無效電子信箱應顯示錯誤訊息', async () => {
    const wrapper = mount(Payment)

    for (const email of invalidEmails) {
      const input = wrapper.find('input[type="email"]')
      await input.setValue(email)
      await input.trigger('input')
      const errorElement = wrapper.find('.error')
      console.log(email)
      expect(errorElement.exists()).toBe(true)
      expect(errorElement.text()).toBe('請輸入有效的電子信箱地址')
    }
  })

  it('有效電子信箱不應顯示錯誤訊息', async () => {
    const wrapper = mount(Payment)

    const input = wrapper.find('input[type="email"]')
    await input.setValue('valid.email@example.com')
    await input.trigger('input')

    expect(wrapper.text()).not.toContain('請輸入有效的電子信箱地址')
  })
})
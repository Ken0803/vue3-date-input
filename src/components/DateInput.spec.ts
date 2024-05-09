import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import DateInput from './DateInput.vue';

vi.stubGlobal('navigator', { language: 'en-US' }); // Can change browser locale

describe('DateInput', () => {
  it('should display the correct format for en-US locale', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: '2023-05-01' }
    });
    expect(wrapper.find('input').element.placeholder).toBe('MM/DD/YYYY');
  });

  it('updates the model value when input is valid', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: '2023-05-01' }
    });
    const input = wrapper.find('input');
    await input.setValue('04/30/2023');
    expect(wrapper.emitted()['update:modelValue'][0]).toEqual(['2023-04-30']);
  });

  it('does not update model value on invalid input', async () => {
    const wrapper = mount(DateInput, {
      props: { modelValue: '2023-05-01' }
    });
    const input = wrapper.find('input');
    await input.setValue('13/40/2023');
    expect(wrapper.emitted()['update:modelValue']).toBeUndefined();
  });
});
import { expect } from 'chai'
import { mount,shallowMount } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import index from '../../src/router/views/index.vue'
import classdetail from '../../src/router/views/classdetail.vue'
import classes from '../../src/router/views/classes.vue'


/*
describe('HelloWorld.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HelloWorld, {
      propsData: { msg }
    })
    expect(wrapper.text()).to.include(msg)
  })
})
*/
describe('index.vue', () => {
  const wrapper = mount(index);
  it('has the element when no login', () => {
    expect(wrapper.html()).contain('<div>您尚未登录，主页将不会显示任何信息。</div>')
  })
})


describe('classdetail.vue', () => {
  const $route = {
    query: { class_id: 1 }
  }
  const wrapper = shallowMount(classdetail, {mocks:{$route}});
  it('has necessary html element', () => {
    expect(wrapper.html()).contain('</span>')
  })
})



describe('classes.vue', () => {
  const wrapper = shallowMount(classes);
  it('has necessary html element', () => {
    expect(wrapper.html()).contain('</classlist-stub>')
  })
})



import { expect } from 'chai'
import { mount,shallowMount } from '@vue/test-utils'
//import HelloWorld from '@/components/HelloWorld.vue'
import index from '../../src/router/views/index.vue'
import classdetail from '../../src/router/views/classdetail.vue'
import classes from '../../src/router/views/classes.vue'
import coding from '../../src/router/views/coding.vue'
import contest from '../../src/router/views/contest.vue'
import control from '../../src/router/views/control.vue'
import grade from '../../src/router/views/grade.vue'
import gradeshow from '../../src/router/views/gradeshow.vue'
import questions from '../../src/router/views/questions.vue'


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
  const wrapper = shallowMount(index);
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

describe('coding.vue', () => {
  const $route = {
    query: { contest_id: 12, question_id: 1000 }
  }
  const wrapper = shallowMount(coding, {mocks:{$route}});
  it('contest_id is right', () => {
    expect(wrapper.vm.contest_id).equal(12)
  })
})

describe('contest.vue', () => {
  const wrapper = shallowMount(contest);
  it('has necessary html element', () => {
    expect(wrapper.html()).contain('</examlist-stub>')
  })
})

describe('control.vue', () => {
  const wrapper = shallowMount(control);
  it('has necessary html element', () => {
    expect(wrapper.html()).contain('</settings-stub>')
  })
})

describe('grade.vue', () => {
  const wrapper = shallowMount(grade);
  it('has necessary html element', () => {
    expect(wrapper.html()).contain('</gradelist-stub>')
  })
})

describe('gradeshow.vue', () => {
  const wrapper = shallowMount(gradeshow);
  it('the circle is loaded', () => {
    expect(wrapper.html()).contain('</icircle>')
  })
})

describe('questions.vue', () => {
  const $route = {
    query: { exam_id: 12 }
  }
  const wrapper = shallowMount(questions, {mocks:{$route}});
  it('contest_id is right', () => {
    expect(wrapper.vm.contest_id).equal(12)
  })
  it('the question list is loaded', () => {
    expect(wrapper.html()).contain('</questionlist-stub>')
  })
})



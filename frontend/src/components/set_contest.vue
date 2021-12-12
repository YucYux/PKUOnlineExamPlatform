/* eslint-disable */
<template>
    <div>
      <Card style="width:100%" dis-hover>
        <Icon type="md-control"></Icon>
        <span style="font-size:18px">考试管理</span>
        <Button type="primary" slot="extra" @click="add_exam">新增考试</Button>
      </Card>
      <Modal
        fullscreen
        ok-text="保存"
        v-model="modal"
        title="编辑考试"
        @on-ok="ok"
        @on-cancel="cancel">
        <p style="text-align:center;margin:5px 0px 5px 0px">
          <span>考试名称:</span>
          <Input
            v-model="cur_examname"
            placeholder="Enter something ..."
            clearable
            style="width: 300px; margin:0px 0px 0px 20px; background:#d7dde4;"
            :border="true"
          />
        </p>
        <p style="text-align:center;margin:5px 0px 5px 0px">
          <span>考试信息:</span>
          <Input
            type = "textarea"
            :autosize="{minRows: 3,maxRows: 3}"
            v-model="cur_examinfo"
            placeholder="Enter something ..."
            clearable
            style="width: 300px; margin:0px 0px 0px 20px; background:#d7dde4;"
            :border="true"
          />
        </p>
        <p style="text-align:center;margin:5px 0px 5px 0px">
          <span>考试日期:</span>
          <DatePicker v-model="cur_examdate" format="yyyy年MM月dd日" :options="options1" type="date" placeholder="Select date" style="width: 300px;margin-left:30px"></DatePicker>
        </p>
        <p style="text-align:center;margin:5px 0px 5px 0px">
          <span>考试时间:</span>
          <TimePicker v-model="cur_examtime" type="time" placeholder="Select time" style="width: 300px;margin-left:30px"></TimePicker>
        </p>
        <p style="text-align:center;margin:5px 0px 5px 0px">
            <div style="text-align:center">
              <span>考试成员</span>
              <Checkbox v-model ="all_choose" @on-change="choose_all_stu" >全选</Checkbox>
            </div>
            <p style="text-align:center">
              <CheckboxGroup>
                <Checkbox v-for="(item,index) in class_members" :key="index" v-model ="item['choose']" >{{item['name']}}</Checkbox>
              </CheckboxGroup>
            </p>
            <p style="text-align:center">
              <span>选择试题</span>
              <Checkbox v-model ="check_all_choose">查看已选择题目</Checkbox>
              <Input v-model="search_content" style="text-align:center" search enter-button on-search="search_ques" placeholder="Enter something..." />
              <Select multiple v-model="model1" style="width:100%">
                <Option v-for="item in labels" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </p>
        </p>
        <div v-if="check_all_choose===false">
            <Scroll>
                <Card dis-hover :padding=5 v-for="(item, index) in questions" :key="index" style="width:100%;height:40px;background:#d7dde4">
                    ------{{item.name}}------
                    标签:
                    <span v-for="(item, index) in questions[index].label" :key="index">--{{item}}--</span>
                    <Button type="primary" style="padding:2px;left:83%;position:fixed;height:25px" @click="check_ques_content(index)">查看题目内容</Button>
                    <Button :type="questions[index].choose_button_type" style="padding:2px;left:90%;position:fixed;height:25px;" @click="change_button_type(index)">{{questions[index].choose_button_text}}</Button>
                </Card>
            </Scroll>
        </div>
        <div v-else>
            <Scroll height="100%">
                <Card dis-hover :padding=5 v-for="(item, index) in questions" :key="index" v-if="item.ischoosed===true" style="width:100%;height:40px;background:#d7dde4">
                    ------{{item.name}}------
                    标签:
                    <span v-for="(item, index) in questions[index].label" :key="index">--{{item}}--</span>
                    <Button type="primary" style="padding:2px;left:83%;position:fixed;height:25px" @click="check_ques_content(index)">查看题目内容</Button>
                </Card>
            </Scroll>
        </div>
      </Modal>
      <Scroll height="90%" style="z-index = -1">
        <exam @delete_exam="del_exam" @set_exam="set_exam" @exam_member="check_member" style="z-index = -1" v-for="(item, index) in examlist" :key="index" :idx="index"
        :contest_name="examlist[index]['name']" :contest_info="examlist[index]['info']" :contest_date="examlist[index]['date']" :contest_time="examlist[index]['time']" :exam_id="examlist[index]['examid']"></exam>
      </Scroll>
    </div>
</template>

<script>
import exam from './set_contest_element.vue'
export default {
  data: function () {
    return {
      examlist: [],
      modal: false,
      cur_index: -1,
      cur_examname: '',
      cur_examinfo: '',
      cur_examdate: '',
      cur_examtime: '',
      search_content: '',
      all_choose: false,
      check_all_choose: false,
      class_members: [{name: 'alice', id: 1, choose: false}, {name: 'bob', id: 2, choose: false}, {name: 'carol', id: 3, choose: false}],
      options1: {
        disabledDate (date) {
          return date && date.valueOf() < Date.now() - 86400000
        }
      },
      labels: [
        {
          value: '排序',
          label: '排序'
        },
        {
          value: '文件IO',
          label: '文件IO'
        },
        {
          value: '递归',
          label: '递归'
        },
        {
          value: '二叉树',
          label: '二叉树'
        }
      ],
      questions: [
        {
          id: 1,
          name: '题目一',
          content: '题目内容一',
          label: ['排序', '文件IO'],
          ischoosed: false,
          choose_button_type: 'primary',
          choose_button_text: '--选择--'
        },
        {
          id: 2,
          name: '题目二',
          content: '题目内容二',
          label: ['二叉树', '文件IO'],
          ischoosed: false,
          choose_button_type: 'primary',
          choose_button_text: '--选择--'
        }
      ]
    }
  },
  computed: {
  },
  methods: {
    add_exam () {
      var exam = {
        examid: -1,
        name: '尚未编辑',
        info: '尚未编辑',
        date: '尚未编辑',
        time: '尚未编辑',
        members: [],
        all_choosed: false
      }
      // 从后端获取唯一的examid
      exam.all_choosed = this.all_choose
      this.examlist.push(exam)
    },
    search_ques () {

    },
    del_exam (index) {
      this.$delete(this.examlist, index)
    },
    set_exam (index) {
      this.cur_index = index
      if (this.examlist[index]['name'] !== '尚未编辑') {
        this.cur_examname = this.examlist[index]['name']
      }
      if (this.examlist[index]['info'] !== '尚未编辑') {
        this.cur_examinfo = this.examlist[index]['info']
      }
      if (this.examlist[index]['date'] !== '尚未编辑') {
        this.cur_examdate = this.examlist[index]['date']
      }
      if (this.examlist[index]['time'] !== '尚未编辑') {
        this.cur_examtime = this.examlist[index]['time']
      }
      for (var i = 0; i < this.class_members.length; ++i) {
        var s = this.class_members[i].name
        if (this.examlist[index]['members'].indexOf(s) !== -1) {
          this.class_members[i].choose = true
        }
      }
      this.all_choose = this.examlist[index]['all_choosed']
      this.modal = true
    },
    check_member (index) {
      var c = this.examlist[index].members.join(' ')
      var config = {
        content: c
      }
      this.$Modal.info(config)
    },
    choose_all_stu () {
      if (this.all_choose) {
        for (var i = 0; i < this.class_members.length; ++i) {
          this.class_members[i]['choose'] = true
        }
      } else {
        for (var j = 0; j < this.class_members.length; ++j) {
          this.class_members[j]['choose'] = false
        }
      }
    },
    change_button_type (index) {
      this.questions[index].ischoosed = !this.questions[index].ischoosed
      if (this.questions[index].ischoosed === false) {
        this.questions[index].choose_button_type = 'primary'
        this.questions[index].choose_button_text = '--选择--'
      } else {
        this.questions[index].choose_button_type = 'error'
        this.questions[index].choose_button_text = '-取消选择-'
      }
    },
    ok () {
      if (this.cur_examname !== '') {
        this.examlist[this.cur_index]['name'] = this.cur_examname
      } else {
        this.examlist[this.cur_index]['name'] = '尚未编辑'
      }
      if (this.cur_examinfo !== '') {
        this.examlist[this.cur_index]['info'] = this.cur_examinfo
      } else {
        this.examlist[this.cur_index]['info'] = '尚未编辑'
      }
      if (this.cur_examdate !== '') {
        this.examlist[this.cur_index]['date'] = this.cur_examdate.toLocaleDateString()
      } else {
        this.examlist[this.cur_index]['date'] = '尚未编辑'
      }
      if (this.cur_examtime !== '') {
        this.examlist[this.cur_index]['time'] = this.cur_examtime
      } else {
        this.examlist[this.cur_index]['time'] = '尚未编辑'
      }
      // 更新后端数据
      this.cur_examname = this.cur_examinfo = ''
      this.cur_examdate = this.cur_examtime = ''
      this.examlist[this.cur_index]['all_choosed'] = this.all_choose
      this.examlist[this.cur_index]['members'] = []
      for (var i = 0; i < this.class_members.length; ++i) {
        if (this.class_members[i]['choose'] === true) {
          this.examlist[this.cur_index]['members'].push(this.class_members[i]['name'])
        }
        this.class_members[i]['choose'] = false
      }
      this.all_choose = false
    },
    cancel () {
      this.$Message.info('取消编辑')
      this.cur_examname = this.cur_examinfo = ''
      this.cur_examdate = this.cur_examtime = ''
      this.all_choose = false
      for (var i = 0; i < this.class_members.length; ++i) {
        this.class_members[i]['choose'] = false
      }
    },
    check_ques_content (index) {
      var c = this.questions[index].content
      var config = {
        content: c
      }
      this.$Modal.info(config)
    }
  },
  components: {
    exam
  }
}
</script>

/* eslint-disable */

<template>
    <Carousel  autoplay = "false" autoplay-speed = "5000" v-model="value" loop height = "350px" style = "padding:80px 0px 60px 0px; background:#d7dde4">
      <CarouselItem>
        <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
          <Card :bordered="true" style="background:#f5f7f9">
            <p slot="title"><Icon type="md-paper-plane"></Icon>{{announcements[0].title}}</p>
            <p style="height: 240px">{{announcements[0].content}}</p>
          </Card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
          <Card :bordered="true" style="background:#f5f7f9">
            <p slot="title"><Icon type="md-paper-plane"></Icon>{{announcements[1].title}}</p>
            <p style="height: 240px">{{announcements[1].content}}</p>
          </Card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
          <Card :bordered="true" style="background:#f5f7f9">
            <p slot="title"><Icon type="md-paper-plane"></Icon>{{announcements[2].title}}</p>
            <p style="height: 240px">{{announcements[2].content}}</p>
          </Card>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
          <Card :bordered="true" style="background:#f5f7f9">
            <p slot="title"><Icon type="md-paper-plane"></Icon>{{announcements[3].title}}</p>
            <p style="height: 240px">{{announcements[3].content}}</p>
          </Card>
        </div>
      </CarouselItem>
    </Carousel>
</template>
<script>
import store from '../store'
export default {
    data () {
        return {
            value: 0,
        }
    },
    computed: {
      announcements: function() {
        let temp = store.getters.getAnnouncements;
        while(temp.length < 4) {
          temp.push({title: "", content: ""});
        }
        return temp
      },
    }
}
</script>
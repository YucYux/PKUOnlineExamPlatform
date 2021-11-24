/* eslint-disable */

<template>
    <Carousel  autoplay = "false" autoplay-speed = "5000" v-model="value" loop height = "350px" style = "padding:80px 0px 60px 0px; background:#d7dde4">
        <CarouselItem>
          <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
            <Card :bordered="true" style="background:#f5f7f9">
              <p slot="title"><Icon type="md-paper-plane"></Icon>公告一</p>
              <p style="height: 240px">{{content[0]}}</p>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
            <Card :bordered="true" style="background:#f5f7f9">
              <p slot="title"><Icon type="md-paper-plane"></Icon>公告二</p>
              <p style="height: 240px">{{content[1]}}</p>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
            <Card :bordered="true" style="background:#f5f7f9">
              <p slot="title"><Icon type="md-paper-plane"></Icon>公告三</p>
              <p style="height: 240px">{{content[2]}}</p>
            </Card>
          </div>
        </CarouselItem>
        <CarouselItem>
          <div style="background:#d7dde4;padding: 10px 300px 30px 300px">
            <Card :bordered="true" style="background:#f5f7f9">
              <p slot="title"><Icon type="md-paper-plane"></Icon>公告四</p>
              <p style="height: 240px">{{content[3]}}</p>
            </Card>
          </div>
        </CarouselItem>
    </Carousel>
</template>
<script>
    export default {
        data () {
            return {
                value: 0,
                content: ['content 1', 'content 2', 'content 3', 'content 4']
            }
        }
    }
</script>
<template>
  <div class="pullnew">
    <div class="head">
      <div class="back">
        <span class="arrow"></span>
      </div>
      <div class="rule-button">
        活动说明
      </div>
    </div>
    <div class="title"></div>
    <div class="pullnew-title">
      <div class="share-button"></div>
    </div>
    <div class="content">
      <div class="left-top-icon"></div>
      <div class="right-top-icon"></div>
      <div class="left-bottom-icon"></div>
      <div class="right-bottom-icon"></div>
      <div class="content-title">首次邀请好友即奖励10元现金</div>
      <div class="content-desc">之后每邀请1位奖励2元，如果您邀请了7位好友，那么第7位奖励您10元</div>
      <div class="course-bg">
        <div v-for="(item,key,index) in pullNewStatic.invitedUsers" :key="key" :class="item.isGrey?'course grey icon'+(index+1):'course yellow icon'+(index+1)">
          <span class="course-text">{{item.amount/100}}</span>元
        </div>
      </div>
      <div class="course-desc">
        <div v-for="(value,key,index) in pullNewStatic.invitedUsers" :key="index" :class="index==0 ? 'course-desc-text'+(index+1):'course-desc-text'">{{key}}<span
            class="course-ren">人</span></div>
      </div>
      <div class="share-title">
        <span class="share-text">分享快捷通道</span>
      </div>
      <div class="share">
        <div class="timeline"></div>
        <div class="weixin"></div>
        <div class="weibo"></div>
        <div class="save-img"></div>
      </div>
      <div class="share-tips">此活动需在最新版本客户端参与</div>
      <div class="balance">
        <div class="remain-money">奖金已到账 {{pullNewStatic.awardTotalAmt/100}}元</div>
        <div class="drawing"></div>
      </div>
    </div>
    <div class="bottom">
      <div class="friends-list">
        <div class="remind-self" v-if="loginUsers.length>0">
          <img :src="fileUrl+loginUsers[0].inviteeUser.avatar" class="headphoto">
          <div class="info">
            <div class="name">{{loginUsers[0].inviteeUser.fullname}}</div>
            <div class="name">{{formateDate(loginUsers[0].inviteeUser.createTime)}}</div>
          </div>
          <div class="amount" v-if="loginUsers[0].loginAmount">你今日获得 +{{loginUsers[0].loginAmount/100}}元</div>
          <div class="amount" v-else>你今日获得 0元</div>
        </div>
        <div class="line"></div>
        <div v-if="pullNewStatic.inviteUserTotalCount > 0">
          <div class="remind-title" v-if="pullNewStatic.awardEnd">
            恭喜你，奖金全部解冻了，再接再厉去邀请哦~
          </div>
          <div v-else>
            <div class="remind-title" v-if="pullNewStatic.inviteUserTotalCount==pullNewStatic.remindCount">
              已经提醒全部好友登录了，再去邀请几个朋友一起赚钱吧!
            </div>
            <div class="remind-title" v-else>
              您有{{pullNewStatic.todayNotLoginUserCount}}位好友今天未登录，提醒他们登录 每位好友登录为您解冻0.2元
            </div>
          </div>
        </div>
        <div class="remind-title" v-else>
          您还没有好友哦，快去邀请好友赚钱吧！
        </div>
        <mt-loadmore class="loadmore" v-if="!pullNewStatic.awardEnd&&loginUsers.length> 0" :bottom-method="loadBottom"
          :auto-fill="false" :bottom-all-loaded="allLoaded" :bottomPullText="bottomPullText" :bottomLoadingText="bottomLoadingText"
          :bottomDistance="bottomDistance" ref="loadmore">
          <div class="remind-content">
            <div class="friend" v-for="(value,key) in loginUsers" :key="key" v-if="key!=0">
              <div class="top">
                <img :src="fileUrl+value.inviteeUser.avatar" class="headphoto">
                <div class="info">
                  <div class="name">{{value.inviteeUser.fullname}}</div>
                  <div class="name">{{formateDate(value.inviteeUser.createTime)}}</div>
                </div>
                <div class="amount" v-if="value.loginAmount">+{{value.loginAmount/100}}</div>
                <div v-else :class="value.reminded ? 'reminded':'remind-login'"></div>
              </div>
              <div v-if="value.awardedCount==0&&typeof(value.step)!='undefined'">
                <div class="arrow">
                  <span class="course-span">邀请进度</span>
                  <span class="arrow-right"></span>
                </div>
                <div class="middle" :id="'m'+key">
                  <div :class="value.step.step1 ? 'dot': 'dot-grey'"></div>
                  <div class="line"></div>
                  <div :class="value.step.step2 ||value.step.step3 ? 'dot': 'dot-grey'"></div>
                  <div class="line"></div>
                  <div :class="value.step.step3 ? 'dot': 'dot-grey'"></div>
                </div>
                <div class="course-bottom" :id="'b'+key">
                  <span :class="value.step.step1 ? 'desc1 desc-active': 'desc1'">进入首页</span>
                  <span :class="value.step.step2 ||value.step.step3 ? 'desc2 desc-active': 'desc2'">查看1篇文章</span>
                  <span :class="value.step.step3? 'desc3 desc-active': 'desc3'">查看2篇文章</span>
                </div>
              </div>
            </div>
          </div>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>
<script>
  import Vue from "vue"
  import {
    Toast
  } from 'mint-ui';
  import Router from '@/router'
  export default {
    name: "index",
    components: {},
    data() {
      return {
        pullNewStatic: {
          awardTotalAmt: 0,
          invitedUsers: {
            "1": {
              amount: 1000,
              isGrey: true
            },
            "2": {
              amount: 200,
              isGrey: true
            },
            "3": {
              amount: 200,
              isGrey: true
            },
            "4": {
              amount: 200,
              isGrey: true
            },
            "5": {
              amount: 200,
              isGrey: true
            },
            "6": {
              amount: 200,
              isGrey: true
            },
            "7": {
              amount: 1000,
              isGrey: true
            }
          }

        },
        bottomDistance: 50,
        bottomPullText: '上拉加载更多',
        bottomLoadingText: '加载中',
        redbagVisiable: false,
        allLoaded: false,
        allLoaded1: false,
        inviteUsers: [],
        loginUsers: [],
        pageNum: 1,
        pageSize: 10,
        totalPageNum: 0,
        isLogin: false,
        tabActive: 'tabLeft',
        fileUrl: ''
      }
    },
    async mounted() {
      Toast
    },
    computed: {

    },
    methods: {

    }
  }

</script>
<style lang="less" scoped>
  .pullnew {
    background: url("~images/bg.png") no-repeat center;
    background-size: cover;
    padding-top: 120px;
    text-align: center;
    height: 100%;

    .head {
      .back {
        color: #ffffff;
        width: 120px;
        margin-bottom: 30px;

        .arrow:after {
          content: '';
          display: inline-block;
          width: 24px;
          height: 24px;
          border-top: 3px solid #ffffff;
          border-right: 3px solid #ffffff;
          transform: rotate(225deg);
          -webkit-transform: rotate(225deg);
        }
      }
    }

    .rule-button {
      background: url("~images/rule-button.png") no-repeat center;
      width: 176px;
      height: 70px;
      background-size: cover;
      padding: 10px 0 0 27px;
      font-size: 30px;
      color: #ffffff;
      float: right;
      margin-top: -70px;
    }

    .title {
      background: url("~images/title.png") no-repeat center;
      width: 464px;
      height: 83px;
      margin: 0 auto;
      background-size: cover;
    }

    .pullnew-title {
      background: url("~images/house.png") no-repeat center;
      background-size: cover;
      width: 650px;
      height: 205px;
      margin: 24px auto 0 auto;

      .share-button {
        background: url("~images/share-button.png") no-repeat center;
        width: 341px;
        height: 109px;
        margin: 0 auto;
        background-size: cover;
      }
    }

    .content {
      position: relative;
      height: 673px;
      border: 6px solid #000000;
      background: #ffffff;
      border-radius: 10px;
      text-align: center;
      margin: -40px 17px 17px 21px;

      .left-top-icon {
        background: url("~images/icon1.png") no-repeat center;
        background-size: cover;
        width: 50px;
        height: 70px;
        position: absolute;
        left: 28px;
        top: 25px;
      }

      .right-top-icon {
        background: url("~images/icon2.png") no-repeat center;
        background-size: cover;
        width: 50px;
        height: 70px;
        position: absolute;
        right: 28px;
        top: 25px;
      }

      .left-bottom-icon {
        background: url("~images/icon3.png") no-repeat center;
        background-size: cover;
        width: 50px;
        height: 70px;
        position: absolute;
        left: 28px;
        bottom: 9px;
      }

      .right-bottom-icon {
        background: url("~images/icon4.png") no-repeat center;
        background-size: cover;
        width: 50px;
        height: 70px;
        position: absolute;
        right: 28px;
        bottom: 9px;
      }

      .content-title {
        font-size: 36px;
        color: #222222;
        margin: 30px 0 30px 0;
      }

      .content-desc {
        font-size: 28px;
        color: #454545;
        margin: 0 30px 25px 30px;
      }

      .course-bg {
        background: url("~images/course-bg.png") no-repeat center;
        background-size: cover;
        width: 668px;
        height: 82px;
        margin: 0 auto;
        display: flex;
        font-size: 16px;
        flex-direction: row;

        .course {
          width: 64px;
          height: 64px;
          line-height: 64px;
          border-radius: 64px;
          text-align: center;
        }

        .icon1 {
          margin: 9px 35px 9px 9px;
        }

        .icon2 {
          margin: 9px 35px 9px 0;
        }

        .icon3 {
          margin: 9px 35px 9px 0;
        }

        .icon4 {
          margin: 9px 35px 9px 0;
        }

        .icon5 {
          margin: 9px 35px 9px 0;
        }

        .icon6 {
          margin: 9px 35px 9px 0;
        }

        .icon7 {
          margin: 9px 8px 9px 0;
        }

        .yellow {
          background-color: #fedc21;
        }

        .grey {
          background-color: #dcdcdc;
        }

        .course-text {
          color: #222222;
          font-size: 20px;
        }
      }

      .course-desc {
        display: flex;
        flex-direction: row;
        justify-content: center;
        color: #454545;
        font-size: 40px;
        margin: 18px 21px 40px 21px;
        text-align: center;

        >div {
          width: 80px;
          margin-left: 20px;
        }

        .course-desc-text1 {
          width: 80px;
          margin-left: 0;
        }

        .course-ren {
          font-size: 20px
        }
      }

      .share-title {
        margin: 40px 0 36px 0;
        height: 1px;
        border-top: 1px solid #ddd;
        text-align: center;
        font-size: 28px;
        color: #1f1b1b;

        .share-text {
          position: relative;
          top: -18px;
          background: #fff;
          padding: 0 20px;
        }
      }

      .share {
        margin-top: 23px;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .timeline {
          background: url("~images/timeline.png") no-repeat center;
          background-size: cover;
          margin-right: 84px;
          width: 62px;
          height: 62px;
        }

        .weixin {
          background: url("~images/weixin.png") no-repeat center;
          background-size: cover;
          margin-right: 81px;
          width: 81px;
          height: 62px;
        }

        .weibo {
          background: url("~images/weibo.png") no-repeat center;
          background-size: cover;
          margin-right: 77px;
          width: 80px;
          height: 62px;
        }

        .save-img {
          background: url("~images/save-img.png") no-repeat center;
          background-size: cover;
          width: 62px;
          height: 62px;
        }
      }

      .share-tips {
        margin-top: 20px;
        font-size: 20px;
        color: #747474;
      }

      .balance {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-top: 20px;

        .remain-money {
          color: #212121;
          font-size: 32px;
          margin: 15px 20px 0 0;
        }

        .drawing {
          background: url("~images/drawing.png") no-repeat center;
          background-size: cover;
          width: 197px;
          height: 78px;
        }
      }
    }

    .bottom {
      background-color: #025182;
      padding-bottom: 48px;

      .friends-list {
        flex-shrink: 1;
        background: #1570A9;
        margin: 0 17px 0 21px;
        border: 6px solid #000000;
        border-radius: 0 0 10px 10px;

        .remind-self {
          color: #ACDFFF;
          margin-top: 20px;
          display: flex;
          flex-direction: row;

          .headphoto {
            width: 87px;
            height: 87px;
            margin-left: 23px;
          }

          .info {
            width: 308px;
            display: flex;
            flex-direction: column;
            margin-left: 20px;

            .name {
              font-size: 28px;
              margin-right: 20px;
            }
          }

          .amount {
            width: 350px;
            height: 96px;
            text-align: center;
            font-size:28px;
            margin-top: 15px;
          }
        }

        .line {
          margin: 10px 43px 20px 39px;
        }

        .remind-title {
          color: #ACDFFF;
          width: 700px;
          border-bottom: 6px solid #000000;
          padding: 0px 0px 27px 0px;
          background-color: #1570A9;
          text-align: center;
          font-size: 28px;
          line-height: 50px;
        }

        .loadmore {
          background-color: #DC214C;
          padding-bottom: 83px;

          .remind-content {
            .friend {
              position: relative;
              margin-top: 41px;
              color: #ffffff;

              .top {
                display: flex;
                flex-direction: row;

                .headphoto {
                  width: 87px;
                  height: 87px;
                  margin-left: 23px;
                }

                .info {
                  width: 300px;
                  display: flex;
                  flex-direction: column;
                  margin-left: 20px;

                  .name {
                    font-size: 28px;
                    margin-right: 20px;
                  }
                }

                .amount {
                  width: 225px;
                  height: 96px;
                  text-align: center;
                  font-size: 32px;
                  margin-top: 15px;
                }

                .reminded {
                  position: absolute;
                  width: 225px;
                  height: 96px;
                  right: 18px;
                  background: url("~images/reminded.png") no-repeat center;
                  background-size: cover;
                }

                .remind-login {
                  position: absolute;
                  width: 225px;
                  height: 96px;
                  right: 18px;
                  background: url("~images/remind-login.png") no-repeat center;
                  background-size: cover;
                }
              }

              .middle {
                display: none;
                flex-direction: row;
                margin: 17px 102px 17px 102px;

                .dot {
                  background: url(~images/dot1.png);
                  background-size: cover;
                  width: 33px;
                  height: 33px;
                }

                .dot-grey {
                  background: url(~images/dot2.png);
                  background-size: cover;
                  width: 33px;
                  height: 33px;
                }

                .line {
                  margin: 12px 2px 12px 2px;
                  width: 209px;
                  height: 2px;
                  border: 2px dashed #313131;
                  width: 200px;
                }
              }

              .course-bottom {
                display: none;
                font-size: 28px;
                color: #FFC4D1;

                .desc-active {
                  color: #ffffff;
                }

                .desc1 {
                  margin-left: 50px;
                  margin-right: 100px;
                }

                .desc2 {
                  margin-right: 76px;
                }

                .desc3 {
                  margin-right: 23px;
                }
              }

              .arrow {
                text-align: left;
                margin-top: 10px;

                .course-span {
                  font-size: 28px;
                  color: #FDE9EE;
                  margin: 10px 10px 0 31px;
                }

                .arrow-right:after {
                  content: '';
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  border-top: 2px solid #ffffff;
                  border-right: 2px solid #ffffff;
                  transform: rotate(45deg);
                  -webkit-transform: rotate(45deg);
                }

                .arrow-down:after {
                  content: '';
                  display: inline-block;
                  width: 14px;
                  height: 14px;
                  border-top: 2px solid #ffffff;
                  border-right: 2px solid #ffffff;
                  transform: rotate(135deg);
                  -webkit-transform: rotate(135deg);
                }
              }
            }

            .new-friend {
              background-color: #DC214C;
              padding-top: 30px;

              .top {
                font-size: 26px;
                color: #fde9ee;
                display: flex;
                flex-direction: row;

                .headphoto {
                  width: 60px;
                  height: 60px;
                  border-radius: 60px;
                  margin-left: 20px;
                }

                .nickname {
                  text-align: left;
                  margin-left: 19px;
                  width: 424px;
                }
              }
            }
          }
        }
      }
    }
  }

</style>

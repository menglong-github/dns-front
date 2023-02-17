<template>
  <div class="container">
    <el-row>
      <el-col :span="8" class="left-area">
        <el-row class="header">
          <el-col :span="24">
            <el-form style="display: flex; justify-content: space-around; align-items: center !important;">
              <el-form-item>
                <el-input placeholder="Domain Name" v-model="input3" class="input-with-select">
                  <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="paimary" style="float: right">Add Domain</el-button>
              </el-form-item>
              <el-form-item>
                <el-button type="paimary" style="float: right">Logout</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row class="domain-list">
          <el-scrollbar class="scrollbar">
            <el-card class="box-card" v-for="(domainName, index) in domainNameList">
              <div slot="header" class="clearfix">
                <span>{{domainName.domainName}}</span>
                <el-button style="float: right; padding: 3px 0" type="text" @click="clickEditOrSave(domainName)">{{(currentEditDomainName && (currentEditDomainName.domainId == domainName.domainId)) ? 'Save' : 'Edit'}}</el-button>
              </div>

              <el-form>
                <el-form-item label="DNSSEC:">
                  <el-switch
                    v-model="domainName.dnssecEnable"
                    active-color="#13ce66"
                    inactive-color="#ff4949">
                  </el-switch>
                </el-form-item>
                <el-form-item label="Digest:" v-if="domainName.dnssecEnable">
                  <span style="word-break: break-all; white-space: normal">{{domainName.dnssecDsDigestValue}}</span>
                </el-form-item>
                <el-form-item label="Key Tag:" v-if="domainName.dnssecEnable">
                  <span style="word-break: break-all; white-space: normal">{{domainName.dnssecDsKeyTag}}</span>
                </el-form-item>
                <el-form-item label="Digest Type:" v-if="domainName.dnssecEnable">
                  <span style="word-break: break-all; white-space: normal">SHA256(2)</span>
                </el-form-item>
                <el-form-item label="Algorithm:" v-if="domainName.dnssecEnable">
                  <span style="word-break: break-all; white-space: normal">ECDSA Curve P-256 with SHA-256(13)</span>
                </el-form-item>
              </el-form>
            </el-card>
          </el-scrollbar>
        </el-row>
        <el-row class="page">
          <el-pagination
            small
            layout="prev, pager, next"
            :total="5000">
          </el-pagination>
        </el-row>
      </el-col>
      <el-col :span="16" class="right-area">
        <el-scrollbar class="scrollbar">
          <prism-editor
            class="editor"
            v-model="zoneFile"
            aria-disabled
            :highlight="highlighter"
            line-numbers
            :readonly="false"
            :tabSize="4"
          ></prism-editor>
        </el-scrollbar>

      </el-col>
    </el-row>
  </div>
</template>

<script>

import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import { listDomainName } from '@/api/web/domainName'

export default {
  components: {
    PrismEditor
  },
  data () {
    return {
      zoneFile: ' ',
      domainNameList: [],
      currentEditDomainName: null
    };
  },
  created() {

    listDomainName().then(res => {
      console.log(res)
      this.domainNameList = res.rows;
      console.log(this.domainNameList)
    }).catch(err => {
      console.log(err)
    });

    this.zoneFile = "$TTL 3600\n" +
      "@   IN SOA a.root-servers.world. info@root-servers.world. (\n" +
      "    0\n" +
      "    0\n" +
      "    0\n" +
      "    0\n" +
      "    0\n" +
      "    )\n" +
      "\n" +
      "@   IN NS a.root-servers.world.\n" +
      "@   IN NS b.root-servers.world.\n" +
      "@   IN NS c.root-servers.world.\n" +
      "\n" +
      "a IN A 117.50.175.99\n" +
      "\n" +
      "b IN A 101.34.125.234\n" +
      "\n" +
      "c IN A 120.48.25.13\n" +
      "\n" +
      "@ IN MX 5 mxn.mxhichina.com.\n" +
      "\n" +
      "@ IN MX 10 mxw.mxhichina.com.";
    this.zoneFile += this.zoneFile;
    this.zoneFile += this.zoneFile;
  },
  methods: {
    clickEditOrSave(domainName) {
      if (this.currentEditDomainName) {
        if (this.currentEditDomainName.domainId == domainName.domainId) {
          this.currentEditDomainName = null;
        } else {
          alert("请先保存");
        }
      } else {
        this.currentEditDomainName = domainName;
      }

    },
    highlighter(code) {
      return highlight(code, languages.js); //returns html
    }
  }
}
</script>

<style lang="scss" scoped>

.container{
  width: 100vw;
  height: 100vh;
  .left-area{
    height: 100vh;
    .header{
      width: 100%;
      height: 10vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .domain-list{
      width: 100%;
      height: 85vh;
      .scrollbar{
        height: 100%;
        ::v-deep .el-scrollbar__wrap{
          overflow-x: hidden;
        }
      }
    }
    .page{
      width: 100%;
      height: 5vh;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .right-area{
    height: 100vh;
    .scrollbar{
      height: 100%;
      ::v-deep .el-scrollbar__wrap{
        overflow-x: hidden;
      }
      .editor {
        background-color: rgba(51, 51, 51, 0.9);
        color: #ccc;
        font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
        font-size: 14px;
        line-height: 1.5;
        min-height: 100vh;
        padding-top: 20px;
        padding-bottom: 20px;
        ::v-deep .prism-editor__textarea{
          outline: none !important;
        }
        overflow-x: hidden;
      }
    }
  }
}


</style>
